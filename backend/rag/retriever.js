import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { MongoClient } from "mongodb";
import dns from "node:dns";
import "dotenv/config";

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
// Configuring the MongoDB Atlas vector store
const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
  collection: collection,
  indexName: "vector_index",
  textKey: "text",
  embeddingKey: "embedding",
});

export async function searchKnowledge(question, k = 4) {
  const resultsWithScores = await vectorStore.similaritySearchWithScore(
    question,
    k,
  );
  
  return resultsWithScores;
}
