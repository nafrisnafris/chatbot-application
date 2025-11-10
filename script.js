document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === "") return;

    addMessageToChat(userInput, 'user-message');
    document.getElementById('user-input').value = '';

    setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        addMessageToChat(botResponse, 'bot-message');
    }, 500);
}

function addMessageToChat(message, className) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userInput) {
    const responses = {
        greetings: {
            inputs: ["hi", "hello", "hey", "hi there", "hey there", "hello there", "good morning", "good afternoon"],
            output: "Hello! How can I help you with your educational queries today?"
        },
        aboutMe: {
            inputs: ["who are you", "what about you", "i want to know about you", "tell me about you", "tell me about yourself"],
            output: "I am XYZ Chatbot, here to assist you."
        },
        courses: {
            inputs: ["what courses do you offer", "which courses are available", "give me the course details", "list out courses you have", "courses"],
            output: "We offer Diploma, HND, TOPUP Degree, and Master Courses. Which type of course are you looking for?"
        },
        diplomaCourses: {
            inputs: ["diploma", "diploma courses", "tell me about diploma courses", "list of diploma courses"],
            output: "We offer Diploma in IT and Diploma in English. Which course information do you want?"
        },
        englishCourses: {
            inputs: ["diploma in english", "english", "english course"],
            output: "Diploma in English focuses on developing strong communication skills and proficiency in the English language through a comprehensive curriculum. What other information do you want about this course?"
        },
        itCourses: {
            inputs: ["diploma in it", "it", "it course"],
            output: "Diploma in IT covers fundamental concepts, skills, and practical applications in Information Technology. What other information do you want about this course?"
        },
        hndCourses: {
            inputs: ["hnd", "what are the hnd courses", "what about hnd courses", "hnd courses"],
            output: "We offer HND in Computing, HND in Business Management, HND in Civil Engineering, and HND in Quantity Surveying. Which course information do you want?"
        },
        computing: {
            inputs: ["hnd computing", "computing"],
            output: "HND in Computing focuses on practical skills development, covering programming, networking, database management, and software development. What other information do you want about this course?"
        },
        businessManagement: {
            inputs: ["hnd business management", "business management"],
            output: "HND in Business Management enhances your business acumen and leadership abilities through a comprehensive curriculum. What other information do you want about this course?"
        },
        quantitySurveying: {
            inputs: ["hnd quantity surveying", "quantity surveying", "qs", "hnd in qs", "hnd qs"],
            output: "HND in Quantity Surveying covers cost estimation, project management, and procurement processes, preparing you for a career in the construction industry. What other information do you want about this course?"
        },
        civilengineering: {
            inputs: ["civil engineering"],
            output: "HND in Civil Engineering course is developing your practical skills and knowledge in structural design, construction management, and infrastructure development, preparing you for a career in the field of civil engineering and infrastructure projects."
        },
        topup: {
            inputs: ["list of topup courses"],
            output: "We offer BEng Software Engineering, BEng Network Engineering and BSc Mutlimedia Technology. Which course information do you want?"
        },
        softwareengineering: {
            inputs: ["software engineering"],
            output: "BEng Software Engineering course is acquiring in-depth knowledge and skills in software development, algorithm design, system architecture, and project management, preparing you for a successful career in the ever-evolving field of software engineering. What are the other information do you want about this course"
        },
        networkengineering: {
            inputs: ["network engineering"],
            output: "BEng Network Engineering course is for gaining expertise in designing, implementing, and managing computer networks, including routing, switching, security, and network infrastructure, to meet the demands of modern communication systems and technologies. What are the other information do you want about this course"
        },
        multimediaTechnology: {
            inputs: ["multimedia technology"],
            output: "BEng Multimedia Technology is for exploring the dynamic field of multimedia and learn to create engaging and interactive digital experiences through a blend of design, programming, animation, and multimedia production skills. What are the other information do you want about this course"
        },
        paymentForIT: {
            inputs: ["payment for it", "it payment"],
            output: "Diploma in IT course payment is 30,000LKR"
        },
        paymentForEnglish: {
            inputs: ["payment for english", "english payment", "english diploma course payment", "course fee of english course", "english course fee", "diploma english course fee"],
            output: "Diploma in English course payment is 40,000LKR"
        },
        paymentForComputing: {
            inputs: ["payment for hnd computing", "computing payment", "hnd computing course payment", "course fee of hnd computing course", "hnd computing course fee"],
            output: "HND in Computing course payment is 350,000LKR"
        },
        paymentForBusinessManagement: {
            inputs: ["payment for hnd business management", "business management payment", "hnd business management course payment", "course fee of hnd business management course", "hnd business management course fee"],
            output: "HND in Business Management course payment is 375,000LKR"
        },
        paymentForCivilEngineering: {
            inputs: ["payment for hnd civil engineering", "civil engineering payment", "hnd civil engineering course payment", "course fee of hnd civil engineering course", "hnd civil engineering course fee"],
            output: "HND in Civil Engineering course payment is 400,000LKR"
        },
        paymentForQuantitySurveying: {
            inputs: ["payment for hnd quantity surveying", "quantity surveying payment", "hnd quantity surveying course payment", "course fee of hnd quantity surveying course", "hnd quantity surveying course fee"],
            output: "HND in Quantity Surveying course payment is 425,000LKR"
        },
        paymentForSoftwareEngineering: {
            inputs: ["payment for software engineering", "software engineering payment", "software engineering course payment", "course fee of software engineering course", "software engineering course fee"],
            output: "BEng in Software Engineering course payment is 550,000LKR"
        },
        paymentForNetworkEngineering: {
            inputs: ["payment for network engineering", "network engineering payment", "network engineering course payment", "course fee of network engineering course", "network engineering course fee"],
            output: "BEng in Network Engineering course payment is 550,000LKR"
        },
        paymentForMultimediaTechnology: {
            inputs: ["payment for beng multimedia technology", "multimedia technology payment", "multimedia technology course payment", "course fee of multimedia technology course", "multimedia technology course fee"],
            output: "BEng in Multimedia Technology course payment is 500,000LKR"
        },
        payment: {
            inputs: ["payment", "course fee", "total cost", "course amount"],
            output: "--------Diploma Courses Payments--------\n * Diploma in IT course payment is 30,000LKR\n * Diploma in English course payment is 40,000LKR\n\n--------HND Courses Payments--------\n * HND in Computing course payment is 350,000LKR\n * HND in Business Management course payment is 375,000LKR\n * HND in Civil Engineering course payment is 400,000LKR\n * HND in Quantity Surveying course payment is 425,000LKR\n\n--------TopUp Courses Payments--------\n * BEng in Software engineering course payment is 550,000LKR\n * BEng in Network Engineering course payment is 550,000LKR\n * BEng in Multimedia Technology course payment is 500,000LKR\n"
        },
        durationofIT: {
            inputs: ["duration for it", "duration of it course", "it duration", "it course period", "it diploma course duration", "course duration of it course", "it course duration", "diploma it course duration"],
            output: "Diploma in IT course duration is 6 Months"
        },
        durationofEnglish: {
            inputs: ["duration for english", "duration of english course", "english duration", "english course period", "english diploma course duration", "course duration of english course", "english course duration", "diploma english course duration"],
            output: "Diploma in English course duration is 6 Months"
        },
        durationOfComputing: {
            inputs: ["duration for hnd computing", "duration of computing", "computing duration", "computing course period", "hnd computing course duration", "duration of hnd computing course", "hnd computing course duration"],
            output: "HND in Computing course duration is 24 Months"
        },
        durationOfBusinessManagement: {
            inputs: ["duration for hnd business management", "duration of business management", "business management course period", "business management duration", "hnd business management course duration", "duration of hnd business management course", "hnd business management course duration"],
            output: "HND in Business Management course duration is 24 Months"
        },
        durationOfCivilEngineering: {
            inputs: ["duration for hnd civil engineering", "duration of civil engineering", "civil engineering duration", "civil engineering course period", "hnd civil engineering course duration", "duration of hnd civil engineering course", "hnd civil engineering course duration"],
            output: "HND in Civil Engineering course duration is 24 Months"
        },
        durationOfQuantitySurveying: {
            inputs: ["duration for hnd quantity surveying", "duration of quantity surveying", "quantity surveying duration", "quantity surveying course period", "hnd quantity surveying course duration", "duration of hnd quantity surveying course", "hnd quantity surveying course duration"],
            output: "HND in Quantity Surveying course duration is 24 Months"
        },
        durationOfSoftwareEngineering: {
            inputs: ["duration for beng software engineering", "duration of software engineering", "software engineering duration", "software engineering course period", "beng software engineering course duration", "duration of beng software engineering course", "beng software engineering course duration"],
            output: "BEng in Software Engineering course duration is 18 Months"
        },
        durationOfNetworkEngineering: {
            inputs: ["duration for beng network engineering", "duration of network engineering", "network engineering duration", "network engineering course period", "beng network engineering course duration", "duration of beng network engineering course", "beng network engineering course duration"],
            output: "BEng in Network Engineering course duration is 18 Months"
        },
        durationOfMultimediaTechnology: {
            inputs: ["duration for beng multimedia technology", "duration of multimedia technology", "multimedia technology duration", "multimedia technology course period", "beng multimedia technology course duration", "duration of beng multimedia technology course", "beng multimedia technology course duration"],
            output: "BEng in Multimedia Technology course duration is 18 Months"
        },
        duration: {
            inputs: ["duration", "course period", "course duration", "period of course"],
            output: "--------Diploma Courses Duration--------\n * Diploma in IT course duration is 6 Months\n * Diploma in English course duration is 6 Months\n\n--------HND Courses Duration--------\n * HND in Computing course duration is 24 Months\n * HND in Business Management course duration is 24 Months\n * HND in Civil Engineering course duration is 24 Months\n * HND in Quantity Surveying course duration is 24 Months\n\n--------TopUp Courses Duration--------\n * BEng in Software Engineering course duration is 18 Months\n * BEng in Network Engineering course duration is 18 Months\n * BEng in Multimedia Technology course duration is 18 Months\n"
        },
        offers: {
            inputs: ["offers", "available offers", "current offers", "any offers available"],
            output: "Currently, we have a special offer of 10% off on early registrations for all our courses!"
        },
        registrationFees: {
            inputs: ["registration fee", "registration fees", "course registration fee", "registration cost"],
            output: "The registration fee for all courses is 5,000 LKR."
        },
        thanks: {
            inputs: ["thank you", "thank you so much", "i appreciate it", "i am grateful", "tnx"],
            output: "You're welcome!"
        },
        leaving: {
            inputs: ["bye", "leaving", "see you later"],
            output: "Goodbye! Take care!"
        }
    };

    const lowerCaseInput = userInput.toLowerCase();

    for (const category in responses) {
        if (responses[category].inputs.some(input => lowerCaseInput.includes(input))) {
            return responses[category].output;
        }
    }

    return "I can help with course information or career advice. Please specify what you need help with.";
}
