import os
from typing import TypedDict, Annotated
from dotenv import load_dotenv
from langgraph.graph import StateGraph, START, END
from langchain_core.messages import HumanMessage, BaseMessage
from langchain_groq import ChatGroq
from langgraph.checkpoint.sqlite import SqliteSaver
from langgraph.graph.message import add_messages
import sqlite3


# -------------------------
# Load environment variables
# -------------------------
load_dotenv()

# -------------------------
# Define state
# -------------------------
class ChatState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]

# -------------------------
# Initialize Groq LLM
# -------------------------
llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0.7
)

# -------------------------
# Chat node
# -------------------------
conn=sqlite3.connect(database='chatbot.db',check_same_thread=False)
checkpointer = SqliteSaver(conn=conn)

def chat_node(state: ChatState):
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": [response]}

# -------------------------
# Build graph
# -------------------------
graph = StateGraph(ChatState)

graph.add_node("chat_node", chat_node)
graph.add_edge(START, "chat_node")
graph.add_edge("chat_node", END)

chatbot = graph.compile(checkpointer=checkpointer)
def get_all_threads():
    all_thread=set()
    for checkpoint in checkpointer.list(None) :
        all_thread.add(checkpoint.config["configurable"]["thread_id"])
    return list(all_thread)

# -------------------------
# CLI ONLY (important!)
# -------------------------
if __name__ == "__main__":
    thread_id = "1"
    while True:
        user_message = input("Type your message: ")
        if user_message.strip().lower() in ["exit", "quit"]:
            break

        config = {"configurable": {"thread_id": thread_id}}
        response = chatbot.invoke(
            {"messages": [HumanMessage(content=user_message)]},
            config=config
        )
        print("Bot:", response["messages"][-1].content)
