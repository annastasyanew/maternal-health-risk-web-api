document.getElementById("predictionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const data = {
        Age: parseFloat(document.getElementById("Age").value),
        Systolic_BP: parseFloat(document.getElementById("Systolic_BP").value),
        BS: parseFloat(document.getElementById("BS").value),
        Body_Temp: parseFloat(document.getElementById("Body_Temp").value),
        BMI: parseFloat(document.getElementById("BMI").value),
        Heart_Rate: parseFloat(document.getElementById("Heart_Rate").value)
    };

    // Explanations for each risk level
    const explanations = {
        "Low Risk": "✅ Status kesehatan ibu dalam kondisi baik. Tidak ada indikasi risiko signifikan terhadap kesehatan ibu. Tetap jaga pola hidup sehat dan lakukan pemeriksaan rutin ke tenaga kesehatan profesional.",
        "Low": "✅ Status kesehatan ibu dalam kondisi baik. Tidak ada indikasi risiko signifikan terhadap kesehatan ibu. Tetap jaga pola hidup sehat dan lakukan pemeriksaan rutin ke tenaga kesehatan profesional.",
        "Medium Risk": "⚠️ Ada beberapa faktor yang perlu diperhatikan. Ibu disarankan untuk lebih memperhatikan kesehatan dan melakukan pemeriksaan lebih intensif dengan tenaga kesehatan profesional. Ikuti saran medis dengan baik.",
        "Medium": "⚠️ Ada beberapa faktor yang perlu diperhatikan. Ibu disarankan untuk lebih memperhatikan kesehatan dan melakukan pemeriksaan lebih intensif dengan tenaga kesehatan profesional. Ikuti saran medis dengan baik.",
        "High Risk": "🚨 Tingkat risiko tinggi terdeteksi. Ibu memerlukan perhatian medis khusus dan pemantauan ketat. Segera konsultasikan dengan tenaga kesehatan profesional untuk penanganan lebih lanjut dan rencana perawatan yang tepat.",
        "High": "🚨 Tingkat risiko tinggi terdeteksi. Ibu memerlukan perhatian medis khusus dan pemantauan ketat. Segera konsultasikan dengan tenaga kesehatan profesional untuk penanganan lebih lanjut dan rencana perawatan yang tepat."
    };

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        const resultText = document.getElementById("resultText");
        const probabilityText = document.getElementById("probabilityText");
        const explanationBox = document.getElementById("explanationBox");
        const explanationText = document.getElementById("explanationText");

        if (result.status === "success") {
            resultText.innerHTML = "Tingkat Risiko: <strong>" + result.result + "</strong>";
            probabilityText.innerHTML = "Probabilitas: <strong>" + (result.probability * 100).toFixed(2) + "%</strong>";
            
            // Show explanation
            explanationText.innerHTML = explanations[result.result] || "Hasil tidak dikenali.";
            explanationBox.style.display = "block";
        } else {
            resultText.innerHTML = "Terjadi error: " + result.message;
            probabilityText.innerHTML = "";
            explanationBox.style.display = "none";
        }
    })
    .catch(error => {
        document.getElementById("resultText").innerHTML = "Gagal menghubungi API.";
        document.getElementById("probabilityText").innerHTML = "";
        document.getElementById("explanationBox").style.display = "none";
        console.error("Error:", error);
    });
});
