document.getElementById('translateBtn').addEventListener('click', async () => {
    const text = document.getElementById('inputText').value;
    const source = document.getElementById('sourceLang').value;
    const target = document.getElementById('targetLang').value;
    const outputDiv = document.getElementById('outputText');
    const translateBtn = document.getElementById('translateBtn');

    if (!text.trim()) {
        alert("Please enter some text.");
        return;
    }

    outputDiv.innerText = "Translating...";
    translateBtn.disabled = true;

    // Using MyMemory API (Free, no key required)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.responseData) {
            outputDiv.innerText = data.responseData.translatedText;
        } else {
            outputDiv.innerText = "Error: Translation failed.";
        }
    } catch (error) {
        console.error("Error:", error);
        outputDiv.innerText = "Error: Could not connect to translation service.";
    } finally {
        translateBtn.disabled = false;
    }
});