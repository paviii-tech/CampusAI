from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import os

app = FastAPI()

load_dotenv()
print(os.getenv("GEMINI_API_KEY"))

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.0-flash")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
announcements=[]
complaints=[]
lost_items=[]
reminders=[]
heroes=[]



class Announcement(BaseModel):
    title: str
    content: str

# 👇 Add Reminder Model HERE
class Reminder(BaseModel):
    title: str
    date: str
    time: str
    #
class Complaint(BaseModel):
    student_name: str
    department: str
    complaint: str

class Hero(BaseModel):
    name:str
    department:str
    achievement:str

# ---------------- APIs ----------------

@app.get("/")
def home():
    return {
        "message": "Campus AI Backend is Running 🚀"
    }
@app.get("/announcements")
def get_announcements():
    return announcements

@app.post("/announcement")
def create_announcement(data: Announcement):
    announcements.append(data)
    return {"status": "success"}

# 👇 Add Reminder API HERE
@app.post("/reminder")
def create_reminder(data: Reminder):
    reminders.append(data)
    return {
        "status": "Reminder Created"
    }     
@app.get("/reminders")
def get_reminders():
    return reminders

@app.post("/complaint")
def create_complaint(data: Complaint):
    complaints.append(data)
    return {
        "status": "Complaint Submitted"
    }
@app.get("/complaints")
def get_complaints():
    return complaints

class LostFound(BaseModel):
    item_name: str
    description: str
    location: str
    owner: str

@app.post("/lostfound")
def create_lostfound(data: LostFound):
    lost_items.append(data)
    return {
        "status": "Item Reported Successfully"
    }                                               
@app.get("/lostfound")
def get_lostfound():
    return lost_items

@app.post("/hero")
def create_hero(data: Hero):
    heroes.append(data)
    return {
        "status": "Hero Added Successfully"
    }

@app.get("/heroes")
def get_heroes():
    return heroes

from pydantic import BaseModel

class NoticeRequest(BaseModel):
    topic: str

@app.post("/generate_notice")
def generate_notice(request: NoticeRequest):
    response = model.generate_content(
        f"Write a professional college announcement about: {request.topic}"
    )

    return {
        "notice": response.text
    }