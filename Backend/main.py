from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.messages import HumanMessage
from index import chatbot, get_all_threads
import pypdf

app = FastAPI()

# allow React to talk
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- THREADS ----------------
@app.get("/threads")
def threads():
    return {"threads": get_all_threads()}


# ---------------- CHAT ----------------
@app.post("/chat")
async def chat(thread_id: str, message: str, pdf_context: str = ""):
    CONFIG = {"configurable": {"thread_id": thread_id}}

    try:
        print(f"\n[DEBUG] Received message: '{message}' for thread: {thread_id}")
        
        # If PDF context is provided, prepend it to the message
        if pdf_context:
            full_message = f"""Here is some context information from an uploaded PDF:

{pdf_context}

Based on this PDF content, please answer the following question:
{message}"""
            print(f"[DEBUG] Using PDF context in message")
        else:
            full_message = message
        
        result = chatbot.invoke(
            {"messages": [HumanMessage(content=full_message)]},
            config=CONFIG,
        )
        print(f"[DEBUG] Chatbot response received: {result}")
        response = result["messages"][-1].content
        print(f"[DEBUG] Extracted response: {response}")
        return {"response": response}
    except Exception as e:
        import traceback
        error_msg = traceback.format_exc()
        print(f"[ERROR] Exception occurred: {error_msg}")
        return {"response": f"Backend Error: {str(e)}"}


# ---------------- PDF ----------------
@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    pdf_reader = pypdf.PdfReader(file.file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() + "\n"

    return {"text": text}
