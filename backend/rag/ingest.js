import fs from "fs/promises";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import "dotenv/config";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import dns from "node:dns";

async function ingest() {
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const folderPath = "./knowledge"; //folder dir
  const filesInThisFolder = await fs.readdir(folderPath); // Saving the file names inside this folder in an array

  const mdFiles = filesInThisFolder
    .filter((files) => files.endsWith(".md"))
    .slice(0, 4);// Filtering markdown files and selecting the first four

  let rawTexts = [];
  let metadatas = [];

  for (const filename of mdFiles) {
    const filePath = `${folderPath}/${filename}`; //saving the filepath of those md files

    const ReadFileContent = await fs.readFile(filePath, "utf-8"); // reading the content in those md files

    console.log(`file : ${filename}, characters : ${ReadFileContent.length}`);

    rawTexts.push(ReadFileContent); // Storing the content of each file
    metadatas.push({ source: filename }); // Storing the filename as metadata for each file
    
  }
 // Splitting the file contents into smaller document chunks
  const documents = await splitter.createDocuments(rawTexts, metadatas);
 
 // Printing the total number of chunks created
  console.log(documents.length);

  // Setting DNS servers to resolve the MongoDB Atlas SRV records
  dns.setServers(["1.1.1.1", "8.8.8.8"]);

  // Creating a MongoDB client using the connection string
  const client = new MongoClient(process.env.CONNECTION_STRING);

  // Connecting to MongoDB Atlas
  await client.connect();

  const database = client.db(process.env.MONGODB_DB_NAME);
  const collection = database.collection(process.env.MONGODB_COLLECTION_NAME);

  //creating gemini embedding model
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GEMINI_API_KEY,
  });

  // Generating an embedding for the first chunk to test its number of values
  const vector = await embeddings.embedQuery(documents[0].pageContent);

  // Print the number of values in the vector
  console.log("Vector length :", vector.length);

// Configuring the MongoDB Atlas vector store
  const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection: collection,
    indexName: "vector_index",
    textKey: "text",
    embeddingKey: "embedding",
  });

  // Generating embeddings for the documents and storing them in MongoDB
  await vectorStore.addDocuments(documents);
  console.log("Document uploaded successfully!");
  
}

ingest();
