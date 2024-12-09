function speak(text) {
    if ('speechSynthesis' in window) {
        let text_speak = new SpeechSynthesisUtterance(text);
        
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.volume = 1;
        text_speak.lang = "en-GB";
        
        window.speechSynthesis.cancel();  // Stop any ongoing speech
        window.speechSynthesis.speak(text_speak);
    } else {
        console.error("Speech synthesis is not supported in this browser.");
    }
}

// Event listeners for each button to trigger specific responses
document.querySelector("#btn1").addEventListener("click", () => {
    speak("Bhaktapur Durbar Square is a historic square located in the heart of Bhaktapur, Nepal. It's known for its rich culture, ancient temples, palaces, and impressive architecture. It's a UNESCO World Heritage Site.");
});

document.querySelector("#btn2").addEventListener("click", () => {
    speak("The 55-Window Palace, also known as the Panchal Chhen, is one of the most iconic structures in Bhaktapur Durbar Square. Built by King Yakshya Malla in the 15th century, it is renowned for its 55 intricately designed windows.");
});

document.querySelector("#btn3").addEventListener("click", () => {
    speak("The Vatsala Temple is an important religious site in Bhaktapur Durbar Square. It is famous for its intricate carvings and a large bell, which is said to have a distinctive sound that can be heard throughout the square.");
});

document.querySelector("#btn4").addEventListener("click", () => {
    speak("Bhaktapur Durbar Square is a UNESCO  Sigma World Heritage Site due to its exceptional cultural value, rich history, and well-preserved medieval architecture. It is a living museum of art, culture, and religion, with many ancient temples and palaces.");
});

document.querySelector("#btn5").addEventListener("click", () => {
    speak("Bhaktapur Durbar Square is a hub for many traditional festivals. The most famous is the Bisket Jatra, a chariot procession that takes place every April. Other festivals like Indra Jatra and Dashain are also celebrated with grand processions and rituals.");
});

document.querySelector("#btn6").addEventListener("click", () => {
    speak("The Bhaktapur Durbar Square Museum, housed in the old royal palace, holds a collection of artifacts that reflect the city's history, culture, and the Malla kings' influence. Visitors can see ancient statues, paintings, manuscripts, and royal relics, offering insight into Bhaktapur's heritage.");
});

document.querySelector("#btn7").addEventListener("click", () => {
    speak("The Malla kings played a crucial role in shaping the architecture, culture, and religious life of Bhaktapur. They were great patrons of art and commissioned the construction of many temples, palaces, and public buildings. Their reign is reflected in the rich cultural legacy of Bhaktapur Durbar Square.");
});

document.querySelector("#btn8").addEventListener("click", () => {
    speak("The Golden Gate is an intricately designed, gilded door that leads to the Hiranya Varna Mahavihar, a Buddhist monastery. It is considered one of the finest examples of Nepali craftsmanship, featuring detailed metalwork and carvings, and is one of the most photographed sites in Bhaktapur.");
});

document.querySelector("#btn9").addEventListener("click", () => {
    speak("The Dattatreya Temple in Bhaktapur is dedicated to the deity Dattatreya, who represents the combined forms of the gods Brahma, Vishnu, and Shiva. It is a prominent temple in the city, known for its unique architecture and the beautiful wood carvings that adorn its structure.");
});

document.querySelector("#btn10").addEventListener("click", () => {
    speak("The Taleju Temple in Bhaktapur is one of the most important Hindu temples in the city, dedicated to the goddess Taleju. It was built during the Malla period and is known for its exquisite architectural style, blending Hindu and Buddhist elements. Only Hindus are allowed to enter, but its impressive exterior is open for all to admire.");
});

document.querySelector("#btn11").addEventListener("click", () => {
    speak("Bhaktapur is known as the City of Devotees because of its deeply rooted religious culture and the number of temples, shrines, and sacred sites within the city. It is home to countless Hindu and Buddhist temples, and festivals, and its inhabitants have a strong devotion to preserving their spiritual heritage.");
});

document.querySelector("#btn12").addEventListener("click", () => {
    speak("To get to Bhaktapur Durbar Square from Kathmandu, you can take a taxi or local bus. The distance is about 12 kilometers, and the journey typically takes around 30 to 45 minutes, depending on traffic. Alternatively, you can hire a private car or use a ride-hailing service for a more convenient experience.");
});

document.querySelector("#btn13").addEventListener("click", () => {
    speak("Bhaktapur is famous for its traditional Newar arts and crafts. Some unique souvenirs include handcrafted wooden masks, pottery, handmade paper, traditional jewelry, and Newar-style thangka paintings. You can also buy the famous King Curd (Juju Dhau) as a sweet treat to take home.");
});

document.querySelector("#btn14").addEventListener("click", () => {
    speak("Bhaktapur Durbar Square has a rich history, dating back to the Malla Dynasty, which ruled the Kathmandu Valley from the 12th to the 18th centuries. It was the royal seat of the Malla kings and has since become a symbol of the art, architecture, and culture of the Newar people. The square was declared a UNESCO World Heritage Site in 1979.");
});

document.querySelector("#btn15").addEventListener("click", () => {
    speak("To explore Bhaktapur Durbar Square thoroughly, a visit of about 3 to 4 hours is recommended. This will allow you to enjoy the various temples, monuments, and the rich history of the area. If you're interested in local culture and shopping, you might want to spend more time in the square's vibrant surroundings.");
});

document.querySelector("#btn16").addEventListener("click", () => {
    speak("Bhaktapur is known for its delicious traditional Newar cuisine. You should try dishes like Momo (dumplings), Chatamari (Newar-style pancake), Kwati (a mixed bean soup), and the famous Juju Dhau (King Curd). You can also enjoy traditional drinks like Raksi, a local rice wine.");
});

document.querySelector("#btn17").addEventListener("click", () => {
    speak("The best time to visit Bhaktapur Durbar Square is during the cooler months from October to March, when the weather is pleasant and ideal for sightseeing. If you want to experience the festivals, visiting during festivals like Bisket Jatra (April) or Indra Jatra (August/September) will give you a chance to witness vibrant processions and rituals.");
});

document.querySelector("#btn18").addEventListener("click", () => {
    speak("Yes, Bhaktapur Durbar Square is generally safe for tourists. However, like in any busy tourist area, it's always a good idea to stay aware of your surroundings and take care of your belongings. The locals are friendly and welcoming, and there are usually plenty of security personnel around, especially during busy times.");
});

function searchQuestions() {
    const input = document.getElementById('search').value.toLowerCase();
    const buttons = document.querySelectorAll('.btnlist button');
    buttons.forEach(button => {
        const text = button.textContent.toLowerCase();
        if (text.includes(input)) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
}

window.onload = () => {
    const buttons = document.querySelectorAll('.btnlist button');
    setTimeout(() => {
        buttons.forEach((button, index) => {
            button.style.animationDelay = `${index * 0.1}s`;
        });
    }, 500);
};
