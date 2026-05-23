# 🏥 Maternal Health Risk Prediction Web API

Aplikasi untuk memprediksi **risiko kesehatan ibu** menggunakan model **Machine Learning Random Forest** yang diintegrasikan dengan **REST API Flask** dan aplikasi web berbasis **HTML, CSS, dan JavaScript**.

**Mata Kuliah**: Pemrograman Berbasis Platform  
**Model**: Random Forest (dilatih di Google Colab)  
**Dataset**: Maternal Health Risk Dataset

---

## 📌 Deskripsi Project

Project ini mengintegrasikan **Machine Learning**, **REST API Flask**, dan **Web Interface** untuk prediksi risiko kesehatan ibu:

- **Model ML**: Dilatih di Google Colab dan disimpan dalam format `.pkl`
- **Backend API**: Flask REST API untuk memproses prediksi
- **Frontend**: Web interface HTML/CSS/JavaScript untuk input data dan tampil hasil

**Alur Data**: Input User (7 fitur kesehatan) → API Flask → ML Model → Hasil Prediksi (Risiko Level)

---

## 🔄 Alur Sistem

```text
Google Colab
↓
Training Model Random Forest
↓
Export Model ke file .pkl
↓
REST API Flask membaca model
↓
Web HTML CSS JavaScript mengirim input ke API
↓
API mengembalikan hasil prediksi
↓
Web menampilkan hasil prediksi risiko kesehatan ibu
```

---

## 📁 Struktur Folder Project

```text
Breast_Cancer_web_api/
│
├── api/
│   ├── app.py
│   └── requirements.txt
│
├── model/
│   ├── maternal_model.pkl
│   ├── label_encoder.pkl
│   └── feature_columns.pkl
│
├── web/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md
```

---

## 📖 Deskripsi File & Folder

| File/Folder | Keterangan |
|---|---|
| `api/app.py` | Flask REST API utama |
| `api/requirements.txt` | Dependencies Python |
| `model/maternal_model.pkl` | Model Random Forest hasil training |
| `model/label_encoder.pkl` | Encoder untuk mengubah output numerik ke label risiko |
| `model/feature_columns.pkl` | Daftar fitur input yang digunakan model |
| `web/index.html` | Form input data kesehatan ibu |
| `web/style.css` | Styling web interface |
| `web/script.js` | Koneksi web ke API |
| `.gitignore` | File untuk mengabaikan file tertentu di GitHub |
| `README.md` | Dokumentasi project |

---

## 📊 Dataset: Maternal Health Risk

**Sumber**: Maternal Health Risk Dataset

### Karakteristik Dataset:
- **Total Sampel**: Ratusan data ibu hamil
- **Target**: Risiko kesehatan (Low Risk, Medium Risk, High Risk)
- **Fitur Input**: 7 variabel kesehatan

### 7 Fitur Input:

| # | Fitur | Keterangan |
|---|---|---|
| 1 | Age | Usia ibu (tahun) |
| 2 | Systolic_BP | Tekanan darah sistolik (mmHg) |
| 3 | Diastolic_BP | Tekanan darah diastolik (mmHg) |
| 4 | Blood_Sugar | Kadar gula darah (mmol/L) |
| 5 | Body_Temp | Suhu tubuh (°F) |
| 6 | BMI | Indeks Massa Tubuh |
| 7 | Heart_Rate | Detak jantung (bpm) |

---

## 🎯 Objektif Project

1. Memahami dataset risiko kesehatan ibu
2. Membangun classification model menggunakan Random Forest
3. Evaluasi model dan hyperparameter tuning
4. Mengintegrasikan model ke REST API
5. Membuat web interface untuk prediksi interaktif

---

## 🚀 Setup & Installation

### Prasyarat
- Python 3.7+
- pip atau conda

### 1. Persiapan Environment

```bash
# Masuk ke folder project
cd Breast_Cancer_web_api
cd api

# Buat virtual environment
python -m venv venv

# Aktifkan (Windows)
venv\Scripts\activate

# Atau (macOS/Linux)
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

**requirements.txt**:
```
flask
flask-cors
pandas
numpy
scikit-learn
joblib
```

### 3. Jalankan API Flask

```bash
cd api
python app.py
```

API akan berjalan di: `http://127.0.0.1:5000`

Verifikasi dengan membuka di browser:
```
http://127.0.0.1:5000/
```

### 4. Jalankan Web Server

Buka terminal baru:

```bash
cd web
python -m http.server 5500
```

Akses web di: `http://localhost:5500`

---

## 📤 API Input/Output

### Endpoint: `/predict` (POST)

**Input: 7 Fitur Kesehatan Ibu (JSON)**

```json
{
  "Age": 25,
  "Systolic_BP": 120,
  "Blood_Sugar": 7.2,
  "Body_Temp": 98.0,
  "BMI": 24.5,
  "Heart_Rate": 78
}
```

**Output: Hasil Prediksi (JSON)**

```json
{
  "status": "success",
  "prediction": 1,
  "result": "Low Risk",
  "probability": 0.86
}
```

---

## 🧪 Testing dengan Postman/Thunder Client

### Setup:

**Method**: POST  
**URL**: `http://127.0.0.1:5000/predict`  
**Header**: `Content-Type: application/json`

### Body JSON:

```json
{
  "Age": 25,
  "Systolic_BP": 120,
  "Diastolic_BP": 80,
  "Blood_Sugar": 7.2,
  "Body_Temp": 98.0,
  "BMI": 24.5,
  "Heart_Rate": 78
}
```

---

## 🚨 Troubleshooting

### Error: `ModuleNotFoundError: No module named 'flask'`

Solusi:
```bash
pip install -r requirements.txt
```

### Error: `FileNotFoundError: maternal_model.pkl`

Pastikan file model ada di folder:
```
Breast_Cancer_web_api/model/
```

Struktur yang benar:
```text
Breast_Cancer_web_api/
├── api/
├── model/
│   ├── maternal_model.pkl
│   ├── label_encoder.pkl
│   └── feature_columns.pkl
└── web/
```

### Error: Fitur tidak ditemukan

Nama field di `script.js` harus sama dengan fitur di API.

Cek daftar fitur:
```
http://127.0.0.1:5000/
```

### Error: Web gagal menghubungi API

Pastikan:
1. Flask API sudah dijalankan
2. API berjalan di `http://127.0.0.1:5000`
3. CORS diaktifkan di `app.py`

---

## 📝 Catatan Penting

⚠️ **Disclaimer**: Aplikasi ini dibuat untuk tujuan pembelajaran dan praktikum. Hasil prediksi **tidak boleh digunakan sebagai diagnosis medis**. Keputusan medis harus dilakukan oleh tenaga kesehatan profesional.

---

## 📚 Ringkasan Setup

### Terminal 1 — Jalankan API

```bash
cd api
venv\Scripts\Activate
python app.py
```

### Terminal 2 — Jalankan Web

```bash
cd web
python -m http.server 5500
```

Buka: `http://localhost:5500`

---

## ✅ Status Project

- ✅ Model Random Forest dibuat di Google Colab
- ✅ Model disimpan dalam format .pkl
- ✅ File model dipindahkan ke folder model/
- ✅ REST API Flask dibuat
- ✅ Web interface HTML/CSS/JS dibuat
- ✅ Project siap untuk diuji dan didokumentasikan

---

**Last Updated**: May 23, 2026
