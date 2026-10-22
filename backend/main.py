from fastapi import FastAPI, File, UploadFile, Query
from fastapi.middleware.cors import CORSMiddleware
from model import predict_disease

app = FastAPI(title="Plant Disease Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Plant Disease Prediction API is running"}

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    lang: str = Query(default="en")
):
    image_bytes = await file.read()
    result = await predict_disease(image_bytes, language=lang)
    return result
