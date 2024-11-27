let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice"); // Assuming this element exists for displaying status
let textInput = document.querySelector("#textInput");
let submitButton = document.querySelector("#submitButton");

// Speech synthesis voice selection
let voices = [];

function getVoices() {
    voices = window.speechSynthesis.getVoices();
}

window.speechSynthesis.onvoiceschanged = getVoices;  // Ensure voices are loaded

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";

    // Select a robotic or synthetic voice similar to Jarvis
    let jarvisVoice = voices.find(voice => 
        voice.name.includes("Google UK English Male") || voice.name.includes("Microsoft David Desktop - English (United States)")
    );
    
    text_speak.voice = jarvisVoice || voices[0]; // Fallback to default voice if no match is found
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon");
    } else {
        speak("Good Evening");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

// Speech recognition setup
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = speechRecognition ? new speechRecognition() : null;

if (recognition) {
    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript);
    };

    btn.addEventListener("click", () => {
        recognition.start();
        btn.style.display = "none";
        voice.style.display = "block"; // Assuming this is a status element showing that speech is recognized
    });
} else {
    console.warn("Speech Recognition is not supported in this browser.");
}

// Handle text input submission
submitButton.addEventListener("click", () => {
    const userText = textInput.value.trim();
    if (userText) {
        content.innerText = userText;
        takeCommand(userText);
        textInput.value = ''; // Clear the input field after submission
    } else {
        speak("Please enter some text.");
    }
});

async function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none"; // Hide the voice recognition status

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello, How can I assist you today?");
    } else if (message.includes("Who are you")) {
        speak("I am your virtual assistant, just like Jarvis.");
    } else if (message.includes("What is your name")) {
        speak("I am Jarvis, your personal assistant.");
    } else {
        let searchQuery = message.replace("Nrx", "").trim();
        if (searchQuery) {
            speak(`Let me find information about ${searchQuery} for you.`);
            fetchWikipediaData(searchQuery);
        } else {
            speak("Sorry, I didn't quite catch that.");
        }
    }
}

async function fetchWikipediaData(query) {
    try {
        console.log("Searching Wikipedia for:", query);

        // Construct the API URL and encode the query to handle special characters
        const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=&explaintext=&titles=${encodeURIComponent(query)}&redirects=true`;

        // Add a timeout to avoid hanging forever
        const fetchPromise = fetch(url).then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status}`);
            }
            return response.json();
        });

        const data = await Promise.race([fetchPromise, new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), 5000))]);

        console.log("Wikipedia API response:", data);

        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];

        // Handle page not found (ID -1) or invalid result
        if (pageId === "-1") {
            console.warn("No page found for the query:", query);
            speak("Sorry, I couldn't find any information on that topic. Please double-check the spelling or try a different term.");
            return;
        }

        // Check for redirects: If there is a redirect, follow it
        if (data.query.redirects) {
            const redirectTitle = data.query.redirects[0].to;
            console.log("Redirecting to:", redirectTitle);
            fetchWikipediaData(redirectTitle); // Recursive call with the redirected title
            return; // Exit current function to prevent duplicate calls
        }

        // Handle valid page and extract
        const page = pages[pageId];
        const extract = page.extract;

        // Handle cases where there is no extract or summary available
        if (!extract) {
            console.warn("Extract is empty for page:", query);
            speak("Sorry, I couldn't retrieve detailed information from Wikipedia.");
        } else {
            // Speak the extract if available
            speak(extract);
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        speak("Sorry, I encountered an error while searching.");
    }
}
