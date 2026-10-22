import google.generativeai as genai
import json
from PIL import Image
import io
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
gemini_model = genai.GenerativeModel("gemini-2.5-flash")

def get_prompt(language: str) -> str:
    lang_instruction = {
        "ta": "Respond with all description, action, usage, notes, tips, and symptom text fields in Tamil language only.",
        "hi": "Respond with all description, action, usage, notes, tips, and symptom text fields in Hindi language only.",
        "te": "Respond with all description, action, usage, notes, tips, and symptom text fields in Telugu language only.",
        "kn": "Respond with all description, action, usage, notes, tips, and symptom text fields in Kannada language only.",
        "ml": "Respond with all description, action, usage, notes, tips, and symptom text fields in Malayalam language only.",
        "en": "Respond with all text fields in English."
    }.get(language, "Respond with all text fields in English.")

    return f"""
You are an expert agricultural scientist and plant pathologist.
Analyze this plant leaf image and respond ONLY in valid JSON 
with this exact structure, no extra text, no markdown:

{{
  "disease_name": "exact disease name or Healthy",
  "plant_type": "type of plant (e.g. Tomato, Rice, Wheat)",
  "confidence_score": 85,
  "severity": "Mild" or "Moderate" or "Severe" or "Healthy",
  "description": "2-3 sentence description of the disease",
  "symptoms": ["symptom 1", "symptom 2", "symptom 3"],
  "treatment_timeline": [
    {{ "day": 1, "action": "action text", "product": "product name or None", "notes": "helpful tip" }},
    {{ "day": 3, "action": "action text", "product": "product name", "notes": "helpful tip" }},
    {{ "day": 7, "action": "action text", "product": "product name", "notes": "helpful tip" }},
    {{ "day": 14, "action": "recheck and assess", "product": "None", "notes": "helpful tip" }}
  ],
  "organic_options": [
    {{ "name": "medicine name", "usage": "how to prepare and use", "when": "best time to apply", "dose_per_acre": 500, "unit": "ml" }},
    {{ "name": "medicine name", "usage": "how to prepare and use", "when": "best time to apply", "dose_per_acre": 300, "unit": "grams" }}
  ],
  "chemical_options": [
    {{ "name": "medicine name", "usage": "how to use safely", "when": "best time to apply", "dose_per_acre": 250, "unit": "grams" }},
    {{ "name": "medicine name", "usage": "how to use safely", "when": "best time to apply", "dose_per_acre": 200, "unit": "ml" }}
  ],
  "prevention_tips": ["tip 1", "tip 2", "tip 3"]
}}

{lang_instruction}

If the uploaded image is not a plant leaf, return exactly:
{{ "error": "Not a plant image. Please upload a clear leaf photo." }}
"""

async def predict_disease(image_bytes: bytes, language: str = "en") -> dict:
    try:
        image = Image.open(io.BytesIO(image_bytes))
        prompt = get_prompt(language)
        response = gemini_model.generate_content([prompt, image])
        raw_text = response.text.strip()

        # Strip markdown code fences if present
        if raw_text.startswith("```"):
            parts = raw_text.split("```")
            if len(parts) > 1:
                raw_text = parts[1]
                if raw_text.startswith("json"):
                    raw_text = raw_text[4:]
        
        raw_text = raw_text.strip()
        result = json.loads(raw_text)
        return result

    except json.JSONDecodeError:
        return {"error": "Failed to parse AI response. Please try again."}
    except Exception as e:
        return {"error": str(e)}
