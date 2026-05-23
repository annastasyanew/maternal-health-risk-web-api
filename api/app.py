from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)

# Path folder utama project
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Path file model
MODEL_PATH = os.path.join(BASE_DIR, "model", "maternal_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "model", "label_encoder.pkl")
FEATURES_PATH = os.path.join(BASE_DIR, "model", "feature_columns.pkl")

# Load model, encoder, dan daftar fitur
model = joblib.load(MODEL_PATH)
label_encoder = joblib.load(ENCODER_PATH)
feature_columns = joblib.load(FEATURES_PATH)

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "success",
        "message": "API Prediksi Risiko Kesehatan Ibu berjalan",
        "endpoint": "/predict",
        "method": "POST",
        "features": feature_columns
    })

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if data is None:
            return jsonify({
                "status": "error",
                "message": "Data JSON tidak ditemukan"
            }), 400

        # Cek apakah semua fitur tersedia
        missing_features = []

        for feature in feature_columns:
            if feature not in data:
                missing_features.append(feature)

        if len(missing_features) > 0:
            return jsonify({
                "status": "error",
                "message": "Ada fitur yang belum dikirim",
                "missing_features": missing_features
            }), 400

        # Ambil data sesuai urutan fitur saat training
        input_data = {}

        for feature in feature_columns:
            input_data[feature] = data[feature]

        input_df = pd.DataFrame([input_data])

        # Prediksi
        prediction = model.predict(input_df)
        prediction_proba = model.predict_proba(input_df)

        predicted_label = label_encoder.inverse_transform(prediction)[0]
        probability = prediction_proba.max()

        return jsonify({
            "status": "success",
            "prediction": int(prediction[0]),
            "result": predicted_label,
            "probability": round(float(probability), 4)
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)
