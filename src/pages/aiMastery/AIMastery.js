import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import "./AIMastery.css";

// Series starts April 18, 2026
const SERIES_START = new Date("2026-04-18T00:00:00");

const tutorials = [
  {
    day: 1,
    date: "April 18, 2026",
    title: "AI Agents 101 — Architecture & Mental Models",
    subtitle:
      "Understand what an AI agent is before writing a single line of code",
    duration: "45 min",
    difficulty: "Beginner",
    tags: ["Agents", "Architecture", "ReAct", "LLM"],
    description:
      "An AI agent is not just a chatbot. It is an LLM coupled with a loop: perceive → reason → act → observe → repeat. In this session we break down every component of a modern agent and map out the three dominant architectures used in production today.",
    concepts: [
      "Perception–Reasoning–Action cycle",
      "ReAct (Reason + Act) pattern",
      "Chain-of-Thought vs Tree-of-Thought",
      "Tool use vs function calling",
      "Agent memory taxonomy",
    ],
    diagram: `
┌─────────────────────────────────────────────────────┐
│                   AI AGENT LOOP                     │
│                                                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐      │
│  │  Perceive │───▶│  Reason  │───▶│   Act    │      │
│  │(Observe) │    │  (LLM)   │    │ (Tools)  │      │
│  └──────────┘    └──────────┘    └──────────┘      │
│        ▲                                │           │
│        └────────────────────────────────┘           │
│                  Feedback Loop                      │
│                                                     │
│  Components:                                        │
│  ├── LLM Core      (GPT-4o / Claude 3.5)           │
│  ├── Memory        (short-term + long-term)         │
│  ├── Tools         (search, code, APIs)             │
│  └── Orchestrator  (loop controller)                │
└─────────────────────────────────────────────────────┘`,
    code: `# The simplest possible agent loop in Python
import anthropic

client = anthropic.Anthropic()

def agent_loop(user_task: str, max_steps: int = 5) -> str:
    messages = [{"role": "user", "content": user_task}]

    for step in range(max_steps):
        # Reason: ask the LLM what to do next
        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            system="You are a helpful agent. Think step by step.",
            messages=messages
        )

        assistant_reply = response.content[0].text
        messages.append({"role": "assistant", "content": assistant_reply})

        # Act: if LLM signals it is done, stop
        if response.stop_reason == "end_turn":
            return assistant_reply

        # Observe: add observation back to context
        observation = execute_action(assistant_reply)
        messages.append({"role": "user", "content": observation})

    return messages[-1]["content"]

result = agent_loop("What is 15% of 847, then square that result?")
print(result)`,
    codeLang: "python",
    resources: [
      "Anthropic Agent Cookbook",
      "ReAct: Synergizing Reasoning and Acting (Yao et al., 2023)",
    ],
  },
  {
    day: 2,
    date: "April 19, 2026",
    title: "Environment Setup & Your First LLM API Call",
    subtitle: "From zero to a working local agent development environment",
    duration: "30 min",
    difficulty: "Beginner",
    tags: ["Setup", "Python", "OpenAI", "Anthropic SDK"],
    description:
      "A fast, reproducible dev environment is the foundation of every agent project. We set up virtual environments, install the right SDKs, configure API keys securely, and make our first structured LLM call — then inspect the full response object.",
    concepts: [
      "Python venv / uv for dependency isolation",
      "OpenAI SDK vs Anthropic SDK",
      "Tokens, context windows, and pricing",
      "System prompts and few-shot examples",
      "Streaming responses",
    ],
    diagram: `
┌─────────────────────────────────────────────────────┐
│                DEVELOPMENT STACK                    │
│                                                     │
│  Your Machine                                       │
│  ┌───────────────────────────────────┐              │
│  │  Python 3.11+  │  venv / uv       │              │
│  │  ─────────────────────────────── │              │
│  │  anthropic SDK   openai SDK       │              │
│  │  langchain       python-dotenv    │              │
│  └──────────────┬────────────────────┘              │
│                 │  HTTPS + API Key                  │
│  ┌──────────────▼────────────────────┐              │
│  │         LLM Providers             │              │
│  │  Anthropic API │  OpenAI API      │              │
│  │  claude-opus-4-6 │ gpt-4o        │              │
│  └───────────────────────────────────┘              │
└─────────────────────────────────────────────────────┘`,
    code: `# 1. Create project and virtual environment
# uv init my-agent && cd my-agent
# uv add anthropic openai python-dotenv

# .env  (NEVER commit this file)
# ANTHROPIC_API_KEY=sk-ant-...
# OPENAI_API_KEY=sk-...

import os
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

client = Anthropic()  # reads ANTHROPIC_API_KEY automatically

# Your first structured API call
response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=512,
    system="You are a senior software engineer. Be concise.",
    messages=[
        {"role": "user", "content": "Explain Python decorators in 3 bullet points."}
    ]
)

# Inspect the response object
print(f"Model:        {response.model}")
print(f"Stop reason:  {response.stop_reason}")
print(f"Input tokens: {response.usage.input_tokens}")
print(f"Output tokens:{response.usage.output_tokens}")
print(f"\\nResponse:\\n{response.content[0].text}")`,
    codeLang: "python",
    resources: [
      "Anthropic Python SDK Docs",
      "Model Context Protocol (MCP) Overview",
    ],
  },
  {
    day: 3,
    date: "April 20, 2026",
    title: "Building a ReAct Agent from Scratch",
    subtitle:
      "No frameworks — pure Python. Understand the loop before you abstract it.",
    duration: "60 min",
    difficulty: "Intermediate",
    tags: ["ReAct", "Tool Use", "Agent Loop", "Python"],
    description:
      "The ReAct pattern (Reason + Act) is the backbone of most production agents. We build one from scratch — no LangChain, no AutoGen — so you understand every line before you ever touch a framework. Our agent gets a calculator tool and a web-search stub.",
    concepts: [
      "Thought → Action → Observation loop",
      "Parsing structured output from LLMs",
      "Tool registry pattern",
      "Stopping conditions and guardrails",
      "Prompt engineering for tool use",
    ],
    diagram: `
┌─────────────────────────────────────────────────────┐
│                 ReAct LOOP                          │
│                                                     │
│  User Query                                         │
│      │                                              │
│      ▼                                              │
│  ┌───────────┐                                      │
│  │  Thought  │  "I need to calculate 15% of 847"   │
│  └─────┬─────┘                                      │
│        │                                            │
│        ▼                                            │
│  ┌───────────┐                                      │
│  │  Action   │  calculator(expr="847 * 0.15")       │
│  └─────┬─────┘                                      │
│        │                                            │
│        ▼                                            │
│  ┌────────────┐                                     │
│  │ Observation│  "Result: 127.05"                   │
│  └─────┬──────┘                                     │
│        │                                            │
│  [loop until done or max_steps]                     │
│        │                                            │
│        ▼                                            │
│  ┌────────────┐                                     │
│  │  Answer    │  Final response to user             │
│  └────────────┘                                     │
└─────────────────────────────────────────────────────┘`,
    code: `import re, math
import anthropic

client = anthropic.Anthropic()

# ── Tool registry ────────────────────────────────────
def calculator(expr: str) -> str:
    """Safely evaluate a math expression."""
    try:
        # whitelist: digits, operators, parens, spaces, math fns
        allowed = set("0123456789+-*/.() ")
        safe_expr = "".join(c for c in expr if c in allowed)
        return str(eval(safe_expr, {"__builtins__": {}}, vars(math)))
    except Exception as e:
        return f"Error: {e}"

TOOLS = {"calculator": calculator}

SYSTEM = """You are a helpful assistant with access to tools.
To use a tool, output EXACTLY this format (nothing else on that line):
  Action: tool_name(arg="value")

After seeing an Observation, continue reasoning.
When you have the final answer, output:
  Answer: <your final answer>
"""

# ── ReAct loop ───────────────────────────────────────
def react_agent(query: str, max_steps: int = 6) -> str:
    messages = [{"role": "user", "content": query}]

    for step in range(max_steps):
        resp = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=512,
            system=SYSTEM,
            messages=messages
        )
        text = resp.content[0].text.strip()
        messages.append({"role": "assistant", "content": text})
        print(f"[step {step+1}] {text[:120]}")

        # Check for final answer
        if "Answer:" in text:
            return text.split("Answer:")[-1].strip()

        # Parse and execute tool call
        match = re.search(r'Action: ([A-Za-z0-9_]+)[(](.+)[)]', text)
        if match:
            tool_name, args_raw = match.group(1), match.group(2)
            # extract first quoted value  (simple parser)
            arg_val = re.search(r'"([^"]+)"', args_raw)
            result = TOOLS[tool_name](arg_val.group(1)) if arg_val else "parse error"
            observation = f"Observation: {result}"
            print(f"         → {observation}")
            messages.append({"role": "user", "content": observation})

    return "Max steps reached without answer."

# Run it
answer = react_agent("What is sqrt(144) + (15% of 847)?")
print(f"\\nFinal: {answer}")`,
    codeLang: "python",
    resources: ["ReAct paper (arXiv:2210.03629)", "Prompt Engineering Guide"],
  },
  {
    day: 4,
    date: "April 21, 2026",
    title: "Tool Use & Function Calling — Production Patterns",
    subtitle:
      "Structured tool definitions, parallel calls, and robust error recovery",
    duration: "50 min",
    difficulty: "Intermediate",
    tags: ["Function Calling", "Tool Use", "JSON Schema", "Error Handling"],
    description:
      "Modern LLM APIs have native tool-use support that is far more reliable than parsing free-text. We define tools using JSON Schema, handle parallel tool calls, implement retry logic, and build a small research assistant that uses multiple tools simultaneously.",
    concepts: [
      "Anthropic tool_use content blocks",
      "JSON Schema for tool definitions",
      "Parallel vs sequential tool calls",
      "tool_result feedback loop",
      "Graceful degradation on tool failure",
    ],
    diagram: `
┌─────────────────────────────────────────────────────┐
│             NATIVE TOOL USE PROTOCOL                │
│                                                     │
│  User: "Research quantum computing startups"        │
│         │                                           │
│         ▼                                           │
│  ┌─────────────────────────────────────────┐        │
│  │  LLM decides to call tools in parallel  │        │
│  │  ┌────────────┐  ┌────────────────┐    │        │
│  │  │web_search()│  │get_news_feed() │    │        │
│  │  └─────┬──────┘  └───────┬────────┘    │        │
│  └─────────┼────────────────┼─────────────┘        │
│            │  tool_result   │  tool_result          │
│            └───────┬────────┘                       │
│                    ▼                                │
│  ┌─────────────────────────────────────────┐        │
│  │  LLM synthesizes results into answer    │        │
│  └─────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘`,
    code: `import anthropic, json

client = anthropic.Anthropic()

# ── Tool definitions (JSON Schema) ───────────────────
tools = [
    {
        "name": "web_search",
        "description": "Search the web for current information on a topic.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query"},
                "max_results": {"type": "integer", "default": 5}
            },
            "required": ["query"]
        }
    },
    {
        "name": "calculator",
        "description": "Evaluate a mathematical expression.",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {"type": "string", "description": "Math expression to evaluate"}
            },
            "required": ["expression"]
        }
    }
]

# ── Tool executor ─────────────────────────────────────
def execute_tool(name: str, inputs: dict) -> str:
    if name == "web_search":
        return f"[stub] Top results for '{inputs['query']}': ..."
    elif name == "calculator":
        import math
        try:
            return str(eval(inputs["expression"], {"__builtins__": {}}, vars(math)))
        except Exception as e:
            return f"Error: {e}"
    return "Unknown tool"

# ── Agentic loop with native tool use ────────────────
def tool_agent(query: str) -> str:
    messages = [{"role": "user", "content": query}]

    while True:
        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            tools=tools,
            messages=messages
        )

        # Append assistant turn
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "end_turn":
            return next(
                b.text for b in response.content if hasattr(b, "text")
            )

        if response.stop_reason == "tool_use":
            # Process ALL tool calls (may be parallel)
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = execute_tool(block.name, block.input)
                    print(f"  Tool: {block.name}({block.input}) → {result[:60]}")
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result
                    })
            messages.append({"role": "user", "content": tool_results})

answer = tool_agent("What is the market cap of Anthropic divided by 1 million?")
print(f"\\nAnswer: {answer}")`,
    codeLang: "python",
    resources: [
      "Anthropic Tool Use Documentation",
      "OpenAI Function Calling Guide",
    ],
  },
  {
    day: 5,
    date: "April 22, 2026",
    title: "Memory Systems — Short-Term, Long-Term & Semantic",
    subtitle: "Give your agent the ability to remember across sessions",
    duration: "55 min",
    difficulty: "Intermediate",
    tags: ["Memory", "Vector DB", "Embeddings", "ChromaDB"],
    description:
      "Memory is what separates a stateless chatbot from a true agent. We implement all three memory types: in-context (conversation history), episodic (structured past interactions), and semantic (vector search over a knowledge base) using ChromaDB.",
    concepts: [
      "In-context window as working memory",
      "Episodic memory with structured storage",
      "Semantic memory with vector embeddings",
      "Retrieval-augmented context injection",
      "Memory consolidation strategies",
    ],
    diagram: `
┌─────────────────────────────────────────────────────┐
│                AGENT MEMORY TAXONOMY                │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  SHORT-TERM (In-Context)                    │    │
│  │  messages[] — current conversation window   │    │
│  │  Max: model context limit (200k tokens)     │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  EPISODIC (Structured)                      │    │
│  │  SQLite / Redis — past sessions, user prefs │    │
│  │  Loaded on session start, summarized        │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  SEMANTIC (Vector Search)                   │    │
│  │  ChromaDB / Pinecone — docs, knowledge base │    │
│  │  Query by similarity → inject into context  │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘`,
    code: `import chromadb
import anthropic
from typing import Optional

client = anthropic.Anthropic()

# ── Semantic Memory with ChromaDB ─────────────────────
chroma = chromadb.Client()
collection = chroma.get_or_create_collection("agent_memory")

def remember(content: str, metadata: dict = None, doc_id: str = None):
    """Store a memory in the vector database."""
    # Get embedding from Anthropic (or use sentence-transformers locally)
    embedding = get_embedding(content)
    collection.add(
        documents=[content],
        embeddings=[embedding],
        metadatas=[metadata or {}],
        ids=[doc_id or str(hash(content))]
    )

def recall(query: str, n_results: int = 3) -> list[str]:
    """Retrieve semantically similar memories."""
    embedding = get_embedding(query)
    results = collection.query(
        query_embeddings=[embedding],
        n_results=n_results
    )
    return results["documents"][0]  # list of relevant memories

def get_embedding(text: str) -> list[float]:
    """Use Voyage AI (Anthropic's recommended embedder) or similar."""
    # Placeholder — use voyageai, openai, or sentence-transformers
    import hashlib
    # Return a deterministic fake embedding for this demo
    seed = int(hashlib.md5(text.encode()).hexdigest(), 16) % (2**31)
    import random; random.seed(seed)
    return [random.gauss(0, 1) for _ in range(1536)]

# ── Memory-augmented agent ────────────────────────────
class MemoryAgent:
    def __init__(self):
        self.conversation: list[dict] = []

    def chat(self, user_message: str) -> str:
        # 1. Retrieve relevant long-term memories
        memories = recall(user_message, n_results=2)
        memory_ctx = "\\n".join(f"- {m}" for m in memories)

        system = f"""You are a helpful assistant with memory.
Relevant past context:
{memory_ctx}

Use this context naturally when relevant."""

        self.conversation.append({"role": "user", "content": user_message})

        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=512,
            system=system,
            messages=self.conversation
        )

        reply = response.content[0].text
        self.conversation.append({"role": "assistant", "content": reply})

        # 2. Store this interaction in long-term memory
        remember(
            content=f"User asked: {user_message}. Agent replied: {reply[:200]}",
            metadata={"type": "conversation"}
        )
        return reply

agent = MemoryAgent()
print(agent.chat("My name is Tariq and I work at JP Morgan Chase."))
print(agent.chat("What do you know about me?"))  # agent recalls!`,
    codeLang: "python",
    resources: [
      "ChromaDB Docs",
      "Anthropic Memory Patterns",
      "Voyage AI Embeddings",
    ],
  },
  {
    day: 6,
    date: "April 23, 2026",
    title: "RAG — Retrieval-Augmented Generation",
    subtitle: "Ground your agent in real documents — eliminate hallucinations",
    duration: "60 min",
    difficulty: "Intermediate",
    tags: ["RAG", "Embeddings", "ChromaDB", "Document Ingestion"],
    description:
      "RAG is the most widely deployed pattern in enterprise AI. We build a full pipeline: ingest PDFs and web pages, chunk intelligently, embed with VoyageAI, store in ChromaDB, then query using semantic search to inject only the most relevant context into the LLM prompt.",
    concepts: [
      "Chunking strategies (semantic vs fixed-size)",
      "Embedding models and dimensionality",
      "Top-K retrieval and re-ranking",
      "Context stuffing vs selective injection",
      "Hybrid search (keyword + vector)",
    ],
    diagram: `
┌─────────────────────────────────────────────────────┐
│                  RAG PIPELINE                       │
│                                                     │
│  INGESTION (offline)                                │
│  ┌────────┐  ┌────────┐  ┌─────────┐  ┌────────┐  │
│  │  PDFs  │  │  Web   │  │  APIs   │  │  Code  │  │
│  └────┬───┘  └────┬───┘  └────┬────┘  └────┬───┘  │
│       └───────────┴───────────┴────────────┘       │
│                       │                            │
│                    Chunker                          │
│                       │                            │
│                    Embedder                         │
│                       │                            │
│               ┌───────▼───────┐                    │
│               │   Vector DB   │                    │
│               │  (ChromaDB)   │                    │
│               └───────┬───────┘                    │
│                       │                            │
│  QUERY (online)       │                            │
│  User query ──▶ Embed ▶ Top-K Search ──▶ LLM      │
│                                     context         │
└─────────────────────────────────────────────────────┘`,
    code: `import chromadb
import anthropic
from pathlib import Path

client = anthropic.Anthropic()
chroma = chromadb.PersistentClient(path="./rag_db")
docs_collection = chroma.get_or_create_collection("documents")

# ── 1. Document ingestion ─────────────────────────────
def chunk_text(text: str, chunk_size: int = 512, overlap: int = 64) -> list[str]:
    """Split text into overlapping chunks."""
    words = text.split()
    chunks, i = [], 0
    while i < len(words):
        chunk = " ".join(words[i : i + chunk_size])
        chunks.append(chunk)
        i += chunk_size - overlap
    return chunks

def ingest_document(text: str, source: str):
    """Chunk, embed, and store a document."""
    chunks = chunk_text(text)
    for idx, chunk in enumerate(chunks):
        doc_id = f"{source}::{idx}"
        # In production use voyageai.Client().embed()
        embedding = fake_embed(chunk)  # replace with real embedder
        docs_collection.add(
            documents=[chunk],
            embeddings=[embedding],
            metadatas=[{"source": source, "chunk": idx}],
            ids=[doc_id]
        )
    print(f"Ingested {len(chunks)} chunks from {source}")

def fake_embed(text: str) -> list[float]:
    import hashlib, random
    seed = int(hashlib.md5(text.encode()).hexdigest(), 16) % (2**31)
    random.seed(seed); return [random.gauss(0,1) for _ in range(1536)]

# ── 2. Retrieval ──────────────────────────────────────
def retrieve(query: str, n: int = 4) -> list[dict]:
    results = docs_collection.query(
        query_embeddings=[fake_embed(query)],
        n_results=n,
        include=["documents", "metadatas", "distances"]
    )
    return [
        {"text": doc, "source": meta["source"], "score": 1 - dist}
        for doc, meta, dist in zip(
            results["documents"][0],
            results["metadatas"][0],
            results["distances"][0]
        )
    ]

# ── 3. RAG-augmented query ────────────────────────────
def rag_query(question: str) -> str:
    chunks = retrieve(question, n=4)
    context = "\\n\\n---\\n\\n".join(
        f"[Source: {c['source']}]\\n{c['text']}" for c in chunks
    )
    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1024,
        system=f"""Answer using ONLY the provided context.
If the answer is not in the context, say so.

CONTEXT:
{context}""",
        messages=[{"role": "user", "content": question}]
    )
    return response.content[0].text

# Demo
sample_doc = """
Anthropic was founded in 2021 by Dario Amodei, Daniela Amodei, and others.
The company focuses on AI safety research and develops the Claude family of models.
Claude is trained using Constitutional AI (CAI), a technique that uses AI feedback
to align the model with human values without requiring extensive human labeling.
"""
ingest_document(sample_doc, source="anthropic_overview")
print(rag_query("Who founded Anthropic and what is Constitutional AI?"))`,
    codeLang: "python",
    resources: [
      "LangChain RAG Tutorial",
      "ChromaDB Documentation",
      "VoyageAI Embeddings",
    ],
  },
  {
    day: 7,
    date: "April 24, 2026",
    title: "Multi-Agent Systems — Orchestration & Specialization",
    subtitle:
      "Divide and conquer complex tasks with a network of specialized agents",
    duration: "65 min",
    difficulty: "Advanced",
    tags: ["Multi-Agent", "Orchestrator", "CrewAI", "Agent Networks"],
    description:
      "No single agent can do everything well. The solution: an orchestrator agent that decomposes tasks and delegates to specialist agents — a researcher, a coder, a critic. We build this pattern from scratch and then look at how CrewAI and AutoGen abstract it.",
    concepts: [
      "Orchestrator–worker agent pattern",
      "Task decomposition and delegation",
      "Agent-to-agent communication protocols",
      "Shared state and message passing",
      "CrewAI roles and process flows",
    ],
    diagram: `
┌─────────────────────────────────────────────────────┐
│            MULTI-AGENT ORCHESTRATION                │
│                                                     │
│         User Request: "Research + summarize AI      │
│                        trends and write a report"   │
│                   │                                 │
│                   ▼                                 │
│  ┌────────────────────────────────────┐             │
│  │        ORCHESTRATOR AGENT          │             │
│  │  (decomposes + routes subtasks)    │             │
│  └────┬───────────┬───────────┬───────┘             │
│       │           │           │                     │
│       ▼           ▼           ▼                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│  │Research │ │ Writer  │ │  Critic │               │
│  │ Agent   │ │  Agent  │ │  Agent  │               │
│  │(search) │ │(drafts) │ │(review) │               │
│  └────┬────┘ └────┬────┘ └────┬────┘               │
│       └───────────┴───────────┘                     │
│                   │                                 │
│            Final Report                             │
└─────────────────────────────────────────────────────┘`,
    code: `import anthropic
from dataclasses import dataclass, field
from typing import Callable

client = anthropic.Anthropic()

# ── Agent definition ──────────────────────────────────
@dataclass
class Agent:
    name: str
    role: str
    tools: list[dict] = field(default_factory=list)
    tool_fns: dict[str, Callable] = field(default_factory=dict)

    def run(self, task: str, context: str = "") -> str:
        system = f"""You are {self.name}, a specialist agent.
Role: {self.role}
{"Additional context:\\n" + context if context else ""}
Complete the assigned task thoroughly and return structured output."""

        response = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=1024,
            tools=self.tools or anthropic.NOT_GIVEN,
            system=system,
            messages=[{"role": "user", "content": task}]
        )
        return response.content[-1].text if hasattr(response.content[-1], "text") \\
               else str(response.content[-1])

# ── Specialist agents ─────────────────────────────────
researcher = Agent(
    name="ResearchAgent",
    role="Search and synthesize information from multiple sources. "
         "Return bullet-point findings with citations."
)

writer = Agent(
    name="WriterAgent",
    role="Transform research findings into polished, structured prose. "
         "Use clear headings, professional tone, and concrete examples."
)

critic = Agent(
    name="CriticAgent",
    role="Review content for accuracy, clarity, and completeness. "
         "Provide specific improvement suggestions or approve with 'APPROVED'."
)

# ── Orchestrator ──────────────────────────────────────
def orchestrator(user_request: str) -> str:
    print(f"Orchestrating: {user_request}\\n")

    # Step 1: Research
    print("[1/3] Research Agent working...")
    research = researcher.run(f"Research this topic thoroughly: {user_request}")
    print(f"Research complete: {len(research)} chars\\n")

    # Step 2: Write
    print("[2/3] Writer Agent working...")
    draft = writer.run(
        task=f"Write a comprehensive report on: {user_request}",
        context=f"Research findings:\\n{research}"
    )
    print(f"Draft complete: {len(draft)} chars\\n")

    # Step 3: Review loop (max 2 iterations)
    for attempt in range(2):
        print(f"[3/3] Critic Agent reviewing (attempt {attempt+1})...")
        review = critic.run(
            task="Review this report and either approve it or list specific issues.",
            context=draft
        )
        if "APPROVED" in review.upper():
            print("Critic approved the draft!\\n")
            break
        print(f"Critic feedback: {review[:200]}...")
        draft = writer.run(
            task="Revise the report based on critic feedback.",
            context=f"Current draft:\\n{draft}\\n\\nCritic feedback:\\n{review}"
        )

    return draft

report = orchestrator("The state of AI agents in 2026 and key frameworks to know")
print("\\n=== FINAL REPORT ===")
print(report[:500] + "...")`,
    codeLang: "python",
    resources: [
      "CrewAI Documentation",
      "AutoGen Paper (Wu et al.)",
      "Anthropic Multi-Agent Patterns",
    ],
  },
  {
    day: 8,
    date: "April 25, 2026",
    title: "Planning & Task Decomposition",
    subtitle: "Give your agent a brain — hierarchical planning and execution",
    duration: "50 min",
    difficulty: "Advanced",
    tags: ["Planning", "Task Decomposition", "Chain of Thought", "LATS"],
    description:
      "Complex tasks require planning before acting. We implement the Plan-Execute pattern and Language Agent Tree Search (LATS) — where the agent generates a plan, executes each step, replans on failure, and searches the solution space like a tree.",
    concepts: [
      "Plan-Execute-Replan pattern",
      "Hierarchical task networks (HTN)",
      "Language Agent Tree Search (LATS)",
      "Self-reflection and error recovery",
      "HuggingGPT-style task graphs",
    ],
    diagram: `
┌─────────────────────────────────────────────────────┐
│              PLAN-EXECUTE PATTERN                   │
│                                                     │
│  User Goal                                          │
│      │                                              │
│      ▼                                              │
│  ┌─────────────────────────────┐                    │
│  │  PLANNER                    │                    │
│  │  Generate step-by-step plan │                    │
│  │  [step1, step2, step3, ...] │                    │
│  └──────────────┬──────────────┘                    │
│                 │                                   │
│                 ▼                                   │
│  ┌──────────────────────────────────────────────┐   │
│  │  EXECUTOR                                    │   │
│  │  for each step:                              │   │
│  │    result = execute(step)                    │   │
│  │    if failed: → REPLANNER                    │   │
│  │    else: continue                            │   │
│  └──────────────────────────────────────────────┘   │
│                 │                                   │
│                 ▼                                   │
│  ┌─────────────────────────────┐                    │
│  │  REPLANNER (on failure)     │                    │
│  │  Revise remaining plan      │                    │
│  │  given what we know so far  │                    │
│  └─────────────────────────────┘                    │
└─────────────────────────────────────────────────────┘`,
    code: `import anthropic, json

client = anthropic.Anthropic()

def llm(prompt: str, system: str = "") -> str:
    r = client.messages.create(
        model="claude-opus-4-6", max_tokens=1024,
        system=system or "You are a precise AI assistant.",
        messages=[{"role": "user", "content": prompt}]
    )
    return r.content[0].text

# ── Step 1: Planner ───────────────────────────────────
def create_plan(goal: str) -> list[str]:
    plan_json = llm(
        prompt=f"""Create a step-by-step plan to achieve this goal.
Return ONLY a JSON array of strings. No markdown, no explanation.
Goal: {goal}""",
        system="You are a planning agent. Output valid JSON only."
    )
    # Extract JSON array (handles LLM wrapping output in prose)
    start = plan_json.find("[")
    end   = plan_json.rfind("]") + 1
    return json.loads(plan_json[start:end])

# ── Step 2: Executor ──────────────────────────────────
def execute_step(step: str, completed: list[str]) -> dict:
    context = "\\n".join(f"✓ {s}" for s in completed) if completed else "None"
    result = llm(
        prompt=f"""Execute this step and report the result.

Completed steps:
{context}

Current step: {step}

Provide a concrete result/output for this step."""
    )
    success = not any(w in result.lower() for w in ["cannot", "unable", "error", "fail"])
    return {"step": step, "result": result, "success": success}

# ── Step 3: Replanner ─────────────────────────────────
def replan(goal: str, completed: list[str], failed_step: str, remaining: list[str]) -> list[str]:
    context = "\\n".join(f"✓ {s}" for s in completed)
    new_plan_json = llm(
        prompt=f"""Goal: {goal}

Completed: {context}
Failed step: {failed_step}
Original remaining steps: {json.dumps(remaining)}

The failed step could not be completed. Revise the remaining plan.
Return ONLY a JSON array of the NEW remaining steps.""",
        system="You are a replanning agent. Output valid JSON only."
    )
    start = new_plan_json.find("[")
    end   = new_plan_json.rfind("]") + 1
    return json.loads(new_plan_json[start:end])

# ── Full Plan-Execute loop ────────────────────────────
def plan_execute(goal: str) -> str:
    print(f"Goal: {goal}\\n")

    plan = create_plan(goal)
    print(f"Initial plan ({len(plan)} steps):")
    for i, s in enumerate(plan, 1): print(f"  {i}. {s}")
    print()

    completed_results = []
    i = 0
    while i < len(plan):
        step = plan[i]
        print(f"[{i+1}/{len(plan)}] Executing: {step}")
        outcome = execute_step(step, [r["step"] for r in completed_results])

        if outcome["success"]:
            completed_results.append(outcome)
            print(f"  ✓ {outcome['result'][:80]}\\n")
            i += 1
        else:
            print(f"  ✗ Failed. Replanning...\\n")
            remaining = plan[i+1:]
            plan = plan[:i] + replan(goal, [r["step"] for r in completed_results], step, remaining)

    # Synthesize final answer
    summary = llm(
        prompt=f"Summarize the results of completing this goal: {goal}\\n\\n"
               + "\\n".join(f"Step: {r['step']}\\nResult: {r['result']}" for r in completed_results)
    )
    return summary

result = plan_execute("Write and test a Python function to parse JSON from a URL")
print("\\nFinal result:", result[:300])`,
    codeLang: "python",
    resources: [
      "LATS Paper (Zhou et al., 2023)",
      "LangGraph Plan-Execute Tutorial",
    ],
  },
  {
    day: 9,
    date: "April 26, 2026",
    title: "Evaluating & Testing AI Agents",
    subtitle:
      "You can't improve what you can't measure — build a rigorous eval harness",
    duration: "55 min",
    difficulty: "Advanced",
    tags: ["Evaluation", "Testing", "LLM-as-Judge", "RAGAS", "Benchmarks"],
    description:
      "Agent failures in production are expensive. We build an evaluation harness with three layers: unit tests for individual tools, integration tests for agent loops, and LLM-as-Judge for qualitative output quality. We also explore RAGAS for RAG pipeline evaluation.",
    concepts: [
      "Trajectory evaluation vs outcome evaluation",
      "LLM-as-Judge pattern",
      "RAGAS: faithfulness, answer relevancy, context precision",
      "Golden dataset construction",
      "Regression testing with pytest",
    ],
    diagram: `
┌─────────────────────────────────────────────────────┐
│              AGENT EVALUATION LAYERS                │
│                                                     │
│  Layer 1: Unit Tests                                │
│  ┌─────────────────────────────────────────┐        │
│  │  pytest — test each tool in isolation   │        │
│  │  Input: known args → assert Output      │        │
│  └─────────────────────────────────────────┘        │
│                                                     │
│  Layer 2: Integration / Trajectory Tests            │
│  ┌─────────────────────────────────────────┐        │
│  │  Golden Q&A pairs → run agent → check   │        │
│  │  trajectory (tool calls) + final answer │        │
│  └─────────────────────────────────────────┘        │
│                                                     │
│  Layer 3: LLM-as-Judge                              │
│  ┌─────────────────────────────────────────┐        │
│  │  Scorer LLM rates quality (1-5) on:     │        │
│  │  • Accuracy  • Helpfulness  • Safety    │        │
│  └─────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────┘`,
    code: `import anthropic, pytest, json
from dataclasses import dataclass

client = anthropic.Anthropic()

# ── Golden test dataset ───────────────────────────────
GOLDEN_DATASET = [
    {
        "question": "What is 2 to the power of 10?",
        "expected_answer": "1024",
        "must_use_tool": "calculator",
    },
    {
        "question": "What is the capital of France?",
        "expected_answer": "Paris",
        "must_use_tool": None,
    },
]

# ── LLM-as-Judge ──────────────────────────────────────
def llm_judge(question: str, expected: str, actual: str) -> dict:
    """Score the agent's answer using another LLM as judge."""
    prompt = f"""You are an impartial evaluator. Score the agent's answer.

Question: {question}
Expected answer: {expected}
Agent's answer: {actual}

Rate on these dimensions (1-5 each):
1. Accuracy: Does it contain the correct information?
2. Completeness: Is it thorough?
3. Conciseness: Is it appropriately brief?

Return ONLY JSON: {{"accuracy": int, "completeness": int, "conciseness": int, "notes": str}}"""

    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=256,
        system="You are a precise evaluator. Output valid JSON only.",
        messages=[{"role": "user", "content": prompt}]
    )
    raw = response.content[0].text.strip()
    start = raw.find("{"); end = raw.rfind("}") + 1
    return json.loads(raw[start:end])

# ── Agent runner (simplified) ─────────────────────────
def run_agent(question: str) -> tuple[str, list[str]]:
    """Returns (answer, list_of_tools_used)."""
    tools_used = []
    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=512,
        messages=[{"role": "user", "content": question}]
    )
    return response.content[0].text, tools_used

# ── Evaluation harness ────────────────────────────────
@dataclass
class EvalResult:
    question: str
    passed: bool
    scores: dict
    actual_answer: str

def evaluate_agent(dataset: list[dict]) -> list[EvalResult]:
    results = []
    for case in dataset:
        print(f"Testing: {case['question'][:60]}...")
        answer, tools_used = run_agent(case["question"])

        # Check tool usage requirement
        tool_ok = (case["must_use_tool"] is None or
                   case["must_use_tool"] in tools_used)

        # LLM-as-Judge scoring
        scores = llm_judge(case["question"], case["expected_answer"], answer)
        passed = tool_ok and scores["accuracy"] >= 4

        results.append(EvalResult(
            question=case["question"],
            passed=passed,
            scores=scores,
            actual_answer=answer
        ))
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  {status} | accuracy={scores['accuracy']}/5")

    pass_rate = sum(1 for r in results if r.passed) / len(results)
    print(f"\\nOverall pass rate: {pass_rate:.0%} ({sum(r.passed for r in results)}/{len(results)})")
    return results

# Run evaluation
results = evaluate_agent(GOLDEN_DATASET)

# ── pytest integration ────────────────────────────────
# Run with: pytest test_agent.py -v
class TestAgentUnit:
    def test_calculator_tool(self):
        """Tool unit test — no LLM involved."""
        import math
        expr = "sqrt(144)"
        result = eval(expr, {"__builtins__": {}}, vars(math))
        assert result == 12.0

    def test_agent_simple_math(self):
        """Integration test against golden dataset."""
        answer, _ = run_agent("What is 12 squared?")
        assert "144" in answer`,
    codeLang: "python",
    resources: [
      "RAGAS Evaluation Framework",
      "DeepEval for LLM Testing",
      "OpenAI Evals",
    ],
  },
  {
    day: 10,
    date: "April 27, 2026",
    title: "Production Deployment — Serve, Monitor & Scale",
    subtitle:
      "Ship your agent to production with FastAPI, Docker, and observability",
    duration: "70 min",
    difficulty: "Advanced",
    tags: ["Production", "FastAPI", "Docker", "LangSmith", "Observability"],
    description:
      "The final day. We wrap our agent in a FastAPI service, containerize it with Docker, add streaming responses, implement rate limiting, wire up LangSmith for tracing every agent step, and discuss cost optimization strategies for high-volume deployments.",
    concepts: [
      "FastAPI async streaming with Server-Sent Events",
      "Docker multi-stage builds for small images",
      "LangSmith tracing and debugging",
      "Rate limiting and request queuing",
      "Cost optimization: caching, prompt compression",
    ],
    diagram: `
┌─────────────────────────────────────────────────────┐
│              PRODUCTION ARCHITECTURE                │
│                                                     │
│  Client (Browser / Mobile / CLI)                    │
│       │  HTTP POST /agent/chat                      │
│       ▼                                             │
│  ┌─────────────────────────────────────────┐        │
│  │  FastAPI (uvicorn, async, rate-limited) │        │
│  │  ├── /agent/chat  (streaming SSE)       │        │
│  │  ├── /agent/run   (sync)                │        │
│  │  └── /health      (healthcheck)         │        │
│  └──────────────────┬──────────────────────┘        │
│          Docker     │                               │
│  ┌──────────────────▼──────────────────────┐        │
│  │  Agent Service                          │        │
│  │  ├── LLM (claude-opus-4-6 / cached)    │        │
│  │  ├── Tools (registered)                 │        │
│  │  └── LangSmith Tracer                   │        │
│  └─────────────────────────────────────────┘        │
│                    │                                │
│          Observability & Storage                    │
│  LangSmith │ CloudWatch │ Redis Cache │ VectorDB    │
└─────────────────────────────────────────────────────┘`,
    code: `# main.py — Production Agent API
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import anthropic, asyncio, time, json

app = FastAPI(title="AI Agent API", version="1.0.0")
client = anthropic.Anthropic()

# ── Request / Response models ─────────────────────────
class ChatRequest(BaseModel):
    message: str
    session_id: str = "default"
    stream: bool = False

class ChatResponse(BaseModel):
    response: str
    tokens_used: int
    latency_ms: float

# ── Simple rate limiter ───────────────────────────────
request_counts: dict[str, list[float]] = {}

def check_rate_limit(session_id: str, max_rpm: int = 10) -> bool:
    now = time.time()
    times = request_counts.get(session_id, [])
    times = [t for t in times if now - t < 60]   # last 60s
    if len(times) >= max_rpm:
        return False
    request_counts[session_id] = times + [now]
    return True

# ── Sync endpoint ─────────────────────────────────────
@app.post("/agent/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    if not check_rate_limit(req.session_id):
        raise HTTPException(429, "Rate limit exceeded. Max 10 req/min.")

    start = time.time()
    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1024,
        messages=[{"role": "user", "content": req.message}]
    )
    return ChatResponse(
        response=response.content[0].text,
        tokens_used=response.usage.input_tokens + response.usage.output_tokens,
        latency_ms=(time.time() - start) * 1000
    )

# ── Streaming endpoint ────────────────────────────────
@app.post("/agent/stream")
async def stream_chat(req: ChatRequest):
    if not check_rate_limit(req.session_id):
        raise HTTPException(429, "Rate limit exceeded.")

    async def generate():
        with client.messages.stream(
            model="claude-opus-4-6",
            max_tokens=1024,
            messages=[{"role": "user", "content": req.message}]
        ) as stream:
            for text in stream.text_stream:
                yield f"data: {json.dumps({'token': text})}\\n\\n"
                await asyncio.sleep(0)  # yield control
            yield "data: [DONE]\\n\\n"

    return StreamingResponse(generate(), media_type="text/event-stream")

@app.get("/health")
def health(): return {"status": "ok"}

# ── Dockerfile (save as Dockerfile) ──────────────────
DOCKERFILE = """
FROM python:3.11-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
"""

# Run locally:
# uvicorn main:app --reload
# Test:
# curl -X POST http://localhost:8000/agent/chat \\
#      -H "Content-Type: application/json" \\
#      -d '{"message": "Hello, agent!", "session_id": "test-1"}'`,
    codeLang: "python",
    resources: [
      "FastAPI Documentation",
      "LangSmith Observability",
      "Anthropic Production Best Practices",
    ],
  },
];

// ── Utility ────────────────────────────────────────────
function getDayStatus(dayNumber) {
  const now = new Date();
  const unlockDate = new Date(SERIES_START);
  unlockDate.setDate(unlockDate.getDate() + dayNumber - 1);

  if (now >= unlockDate) return "available";
  return "locked";
}

function getDaysUntil(dayNumber) {
  const now = new Date();
  const unlockDate = new Date(SERIES_START);
  unlockDate.setDate(unlockDate.getDate() + dayNumber - 1);
  const diff = Math.ceil((unlockDate - now) / (1000 * 60 * 60 * 24));
  return diff;
}

// ── Sub-components ────────────────────────────────────
function DiagramBlock({ content }) {
  return (
    <div className="am-diagram">
      <div className="am-diagram__header">
        <span className="am-diagram__dot am-diagram__dot--red" />
        <span className="am-diagram__dot am-diagram__dot--yellow" />
        <span className="am-diagram__dot am-diagram__dot--green" />
        <span className="am-diagram__label">Architecture Diagram</span>
      </div>
      <pre className="am-diagram__content">{content}</pre>
    </div>
  );
}

function CodeBlock({ code, lang }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="am-code">
      <div className="am-code__header">
        <div className="am-code__dots">
          <span className="am-diagram__dot am-diagram__dot--red" />
          <span className="am-diagram__dot am-diagram__dot--yellow" />
          <span className="am-diagram__dot am-diagram__dot--green" />
        </div>
        <span className="am-code__lang">{lang}</span>
        <button className="am-code__copy" onClick={handleCopy}>
          {copied ? (
            <>
              <i className="fas fa-check" /> Copied!
            </>
          ) : (
            <>
              <i className="fas fa-copy" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="am-code__content">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function DifficultyBadge({ level }) {
  const cls =
    {
      Beginner: "am-badge--green",
      Intermediate: "am-badge--yellow",
      Advanced: "am-badge--red",
    }[level] || "am-badge--blue";

  return <span className={`am-badge ${cls}`}>{level}</span>;
}

function TutorialCard({ tutorial, isExpanded, onToggle }) {
  const status = getDayStatus(tutorial.day);
  const daysUntil = status === "locked" ? getDaysUntil(tutorial.day) : 0;

  // Check if this is "today's" tutorial (the latest available one)
  const allAvailable = tutorials.filter(
    (t) => getDayStatus(t.day) === "available"
  );
  const latestDay =
    allAvailable.length > 0 ? Math.max(...allAvailable.map((t) => t.day)) : 0;
  const isFeatured = tutorial.day === latestDay;

  return (
    <div
      className={`am-card ${isFeatured ? "am-card--featured" : ""} ${
        status === "locked" ? "am-card--locked" : ""
      }`}
    >
      {isFeatured && (
        <div className="am-card__live-banner">
          <i className="fas fa-broadcast-tower" />
          LIVE TODAY
        </div>
      )}

      <div
        className="am-card__header"
        onClick={status !== "locked" ? onToggle : undefined}
      >
        <div className="am-card__day-badge">DAY {tutorial.day}</div>

        <div className="am-card__meta">
          <div className="am-card__title-row">
            <h3 className="am-card__title">{tutorial.title}</h3>
            {status === "locked" ? (
              <div className="am-card__lock">
                <i className="fas fa-lock" />
                <span>in {daysUntil}d</span>
              </div>
            ) : (
              <i
                className={`fas fa-chevron-${
                  isExpanded ? "up" : "down"
                } am-card__chevron`}
              />
            )}
          </div>
          <p className="am-card__subtitle">{tutorial.subtitle}</p>

          <div className="am-card__pills">
            <DifficultyBadge level={tutorial.difficulty} />
            <span className="am-badge am-badge--ghost">
              <i className="fas fa-clock" /> {tutorial.duration}
            </span>
            <span className="am-badge am-badge--ghost">
              <i className="fas fa-calendar" /> {tutorial.date}
            </span>
          </div>

          <div className="am-card__tags">
            {tutorial.tags.map((t) => (
              <span key={t} className="am-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {isExpanded && status !== "locked" && (
        <div className="am-card__body">
          <p className="am-card__description">{tutorial.description}</p>

          <div className="am-card__concepts">
            <h4 className="am-section-label">
              <i className="fas fa-lightbulb" /> Key Concepts
            </h4>
            <ul className="am-concepts-list">
              {tutorial.concepts.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="am-card__diagram">
            <h4 className="am-section-label">
              <i className="fas fa-project-diagram" /> Architecture
            </h4>
            <DiagramBlock content={tutorial.diagram} />
          </div>

          <div className="am-card__code">
            <h4 className="am-section-label">
              <i className="fas fa-code" /> Sample Code
            </h4>
            <CodeBlock code={tutorial.code} lang={tutorial.codeLang} />
          </div>

          <div className="am-card__resources">
            <h4 className="am-section-label">
              <i className="fas fa-book-open" /> Further Reading
            </h4>
            <ul className="am-resources-list">
              {tutorial.resources.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {status === "locked" && (
        <div className="am-card__locked-body">
          <i className="fas fa-lock am-lock-icon" />
          <p>
            Unlocks in{" "}
            <strong>
              {daysUntil} day{daysUntil !== 1 ? "s" : ""}
            </strong>{" "}
            on {tutorial.date}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────
export default function AIMastery() {
  const [expandedDay, setExpandedDay] = useState(null);
  const [filter, setFilter] = useState("all");

  const availableCount = tutorials.filter(
    (t) => getDayStatus(t.day) === "available"
  ).length;

  // Auto-expand the latest available tutorial
  useEffect(() => {
    const allAvailable = tutorials.filter(
      (t) => getDayStatus(t.day) === "available"
    );
    if (allAvailable.length > 0) {
      const latest = Math.max(...allAvailable.map((t) => t.day));
      setExpandedDay(latest);
    }
  }, []);

  const filteredTutorials = tutorials.filter((t) => {
    if (filter === "available") return getDayStatus(t.day) === "available";
    if (filter === "locked") return getDayStatus(t.day) === "locked";
    return true;
  });

  const toggleDay = (day) => {
    setExpandedDay((prev) => (prev === day ? null : day));
  };

  return (
    <div className="am-page">
      <Header />

      <main className="am-main">
        {/* ── Hero ── */}
        <div className="am-hero">
          <div className="am-hero__bg" aria-hidden="true">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="am-hero__particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          <div className="am-hero__content">
            <div className="am-hero__badge">
              <i className="fas fa-robot" />
              <span>10-Day Series · Updated Daily</span>
            </div>

            <h1 className="am-hero__title">
              Build AI Agents
              <span className="am-hero__title--accent">
                {" "}
                from Zero to Mastery
              </span>
            </h1>

            <p className="am-hero__subtitle">
              A hands-on, developer-first curriculum. Real code. Real
              architectures. No fluff. One tutorial drops every day for 10 days.
            </p>

            <div className="am-hero__stats">
              <div className="am-stat">
                <span className="am-stat__num">{availableCount}</span>
                <span className="am-stat__label">Live Now</span>
              </div>
              <div className="am-stat">
                <span className="am-stat__num">10</span>
                <span className="am-stat__label">Total Days</span>
              </div>
              <div className="am-stat">
                <span className="am-stat__num">Python</span>
                <span className="am-stat__label">Language</span>
              </div>
              <div className="am-stat">
                <span className="am-stat__num">Free</span>
                <span className="am-stat__label">Always</span>
              </div>
            </div>

            <div className="am-hero__stack">
              {[
                "Claude API",
                "OpenAI",
                "LangChain",
                "ChromaDB",
                "FastAPI",
                "Docker",
                "CrewAI",
              ].map((t) => (
                <span key={t} className="am-tech-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Progress Bar ── */}
        <div className="am-progress-section">
          <div className="am-progress-scroll">
            <div className="am-progress-track">
              {tutorials.map((t) => {
                const status = getDayStatus(t.day);
                const allAvailable = tutorials.filter(
                  (x) => getDayStatus(x.day) === "available"
                );
                const latestDay =
                  allAvailable.length > 0
                    ? Math.max(...allAvailable.map((x) => x.day))
                    : 0;
                return (
                  <div
                    key={t.day}
                    className={`am-progress-node ${
                      status === "available" ? "am-progress-node--done" : ""
                    } ${t.day === latestDay ? "am-progress-node--today" : ""}`}
                    onClick={() =>
                      status === "available" && setExpandedDay(t.day)
                    }
                    title={`Day ${t.day}: ${t.title}`}
                  >
                    <div className="am-progress-node__circle">
                      {status === "available" && t.day < latestDay ? (
                        <i className="fas fa-check" />
                      ) : t.day === latestDay ? (
                        <i className="fas fa-play" />
                      ) : (
                        <i className="fas fa-lock" />
                      )}
                    </div>
                    <span className="am-progress-node__label">D{t.day}</span>
                  </div>
                );
              })}
              <div className="am-progress-line">
                <div
                  className="am-progress-line__fill"
                  style={{
                    width: `${(availableCount / tutorials.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className="am-filters">
          {[
            { key: "all", label: "All Tutorials", icon: "fa-list" },
            {
              key: "available",
              label: `Available (${availableCount})`,
              icon: "fa-unlock",
            },
            {
              key: "locked",
              label: `Coming Soon (${10 - availableCount})`,
              icon: "fa-lock",
            },
          ].map((f) => (
            <button
              key={f.key}
              className={`am-filter-btn ${
                filter === f.key ? "am-filter-btn--active" : ""
              }`}
              onClick={() => setFilter(f.key)}
            >
              <i className={`fas ${f.icon}`} />
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Tutorial list ── */}
        <div className="am-tutorials">
          {filteredTutorials.map((t) => (
            <TutorialCard
              key={t.day}
              tutorial={t}
              isExpanded={expandedDay === t.day}
              onToggle={() => toggleDay(t.day)}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="am-cta">
          <div className="am-cta__card">
            <i className="fas fa-bell am-cta__icon" />
            <h2>New tutorial every day</h2>
            <p>
              Bookmark this page and come back daily. Each tutorial builds on
              the last — by Day 10 you will have a fully production-deployed AI
              agent.
            </p>
            <div className="am-cta__links">
              <a
                href="https://github.com/techcybernetics"
                target="_blank"
                rel="noopener noreferrer"
                className="am-cta__btn am-cta__btn--primary"
              >
                <i className="fab fa-github" /> Follow on GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/tariq-iqbal-a0370912/"
                target="_blank"
                rel="noopener noreferrer"
                className="am-cta__btn am-cta__btn--secondary"
              >
                <i className="fab fa-linkedin" /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <TopButton />
    </div>
  );
}
