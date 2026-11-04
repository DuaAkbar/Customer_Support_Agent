# ✦ Customer Support Agent

<p align="center">
  An AI-powered customer support assistant for **Saffron & Sage Home Kitchen**, designed to answer customer enquiries, retrieve business information, capture leads, and connect customers with human support.
</p>

## ✧ Customizable for Any Business

Although this project currently uses **Saffron & Sage Home Kitchen** as its example business, the agent is designed to be adaptable to different types of businesses.

Businesses can customize the agent by:

- Replacing the existing knowledge base Markdown files with their own business information, FAQs, services, products, and policies.
- Updating the system prompt to reflect their business identity, communication style, and customer support requirements.
- Modifying or extending the available tools to support their specific workflows, such as lead collection, appointment enquiries, order requests, or human handoff.

With these adjustments, the same RAG-powered architecture can serve as an AI customer support assistant for restaurants, retail businesses, service providers, and other industries.

**The goal is to provide a reusable foundation for building business-specific AI customer support agents without having to build the entire system from scratch.**

## ✧ Overview

Customer Support Agent is a full-stack AI application built to simulate a real-world customer support experience for a home catering business in Karachi.

Powered by Google's Gemini API and LangChain, the agent uses Retrieval-Augmented Generation (RAG) to provide accurate, context-aware answers based on the business knowledge base.

Beyond answering questions, it can collect customer enquiries, capture lead information, and escalate specific requests to human support when necessary.

## ✧ Key Features

- **RAG-based Responses:** Retrieves relevant business information from a custom knowledge base before generating answers.
- **AI-Powered Conversations:** Uses Google's Gemini API through LangChain.
- **Knowledge Retrieval:** MongoDB Atlas Vector Search enables semantic retrieval of relevant information.
- **Lead Capture:** Collects customer details, event information, and catering requirements.
- **Human Handoff:** Escalates custom quotations, allergy-related enquiries, and requests requiring human assistance.
- **Conversation History:** Maintains chat sessions and retrieves previous conversations.
- **Email Notifications:** Uses Nodemailer to notify Chef Noor about customer enquiries and escalations.
- **Language Adaptation:** Supports English and Roman Urdu based on the customer's message.
- **Frontend Chat Interface:** Provides an interactive chat experience with message history and typing indicators.

## ✧ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| AI Model | Google Gemini API |
| AI Framework | LangChain |
| Retrieval | RAG, Vector Search |
| Database | MongoDB Atlas |
| Vector Store | MongoDB Atlas Vector Search |
| Embeddings | Google Generative AI Embeddings |
| Email | Nodemailer |
| Monitoring | LangSmith |
| API Testing | Postman |

## ✧ How It Works

The application follows a retrieval-augmented conversational workflow:

```text
       Customer
           |
           v
     React Frontend
           |
           v
    Express Backend
           |
           v
     LangChain Agent
           |
           v
      Gemini API
           |
           v
   search_knowledge
           |
           v
 MongoDB Atlas Vector Search
           |
           v
   Relevant Knowledge
           |
           v
    AI-Generated Answer
           |
           v
       Customer
```

For enquiries requiring additional assistance, the agent can use dedicated tools to capture leads or escalate the conversation to human support.

## ✧ Project Structure

```text
Customer_Support_Agent/
│
├── backend/
│   ├── knowledge/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── README.md
└── .gitignore
```

*The structure above is a simplified overview.*

## ✧ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/DuaAkbar/Customer_Support_Agent.git
```

### 2. Navigate to the project

```bash
cd Customer_Support_Agent
```

### 3. Install dependencies

For the backend:

```bash
cd backend
npm install
```

For the frontend:

```bash
cd ../frontend
npm install
```

### 4. Configure environment variables

Create the required `.env` files for the backend and frontend.

Add your API credentials, database connection string, and application configuration according to the environment variables used in the source code.

**Important:** Never commit API keys, database credentials, or other sensitive environment variables.

### 5. Run the application

Start the backend and frontend in separate terminals using the development scripts defined in their respective `package.json` files.

## ✧ Project Goals

This project explores the practical application of AI agents in customer support, particularly:

- Building context-aware conversational systems.
- Implementing RAG pipelines for business-specific knowledge.
- Integrating LLMs with external tools.
- Managing conversational history and session-based interactions.
- Automating customer lead collection and human escalation.

## ✧ Developer

**Dua Akbar**

Software Engineering | Full-Stack Development | AI Applications

[GitHub](https://github.com/DuaAkbar)