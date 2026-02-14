from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import tensorflow as tf
import io

# -----------------------------
# Load Model Once at Startup
# -----------------------------
model = tf.keras.models.load_model(
    "cats_vs_dogs_model.h5",
    compile=False
)


# Create FastAPI instance
app = FastAPI(title="Cats vs Dogs Classifier API")


# -----------------------------
# Health Check Route
# -----------------------------
@app.get("/")
def home():
    return {"message": "Cats vs Dogs API is running"}


# -----------------------------
# Prediction Route
# -----------------------------
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        # Preprocess image
        image = image.resize((150, 150))
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        # Make prediction
        prediction = model.predict(image_array)[0][0]

        label = "Dog" if prediction > 0.5 else "Cat"
        confidence = float(prediction) if prediction > 0.5 else float(1 - prediction)

        return JSONResponse(
            content={
                "prediction": label,
                "confidence": round(confidence * 100, 2)
            }
        )

    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )
