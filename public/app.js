const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

let happy;
let sad;
let angry;
let surprised;

fetch('https://8p4d6k6qei.execute-api.ap-south-1.amazonaws.com/dev/user/expression/average_time/60eb310bf633392dd0d2cdbe')
    .then(res => res.json())
    .then(data => {
        const lastdata = data[0].avg_emotion;
        console.log(lastdata);
        happy = lastdata.happy;
        sad = lastdata.sad;
        angry = lastdata.angry;
        surprised = lastdata.surprsed;
    })

// const Intro = "Hello, I'm the voice assistant of this application. First, a brief description of this app. It analyses every second of your facial emotion data which you can see the analyzed data on its dashboard, and now a brief description about me. Well, I'm still updating";

// const greetings = [
// 	"Hello, I'm the voice assistant of this application. First, a brief description about me. Well I'm still updating but still you can talk to me about weather, soccer or greet me with Hi or Hello",
// 	"Hello, I'm the voice assistant of this application. First, a brief description of this app. It analyses every second of your facial emotion data which you can see the analyzed data on its dashboard.",
// 	"Hi, so nice to meet you. I'm the voice assistant of this application. Thank you for using this application"
// ];

const greetings = [
	"Hey, happy go lucky champ",
	"Hey, you sound sad, wanna discuss something with me.",
	"Hey, hello, whats up"
];

const weather = [
	"I like summers a lot, atleast I can enjoy a good long holidays",
	"Weather is so nice today, why don't you just take a break from your work and rather take a walk outside",
	"Who cares It's corona virus outside now every weather feels same inside the home"
];

const soccer = [
	"Can't wait for next champions league game, wish Real Modrid will lift the trophy again.",
	"Hey, I'm a Real Madrid fan but still I wish Cristiano Ronaldo will return to Bearneabeu.",
	"Can't wait for Fifa World Cup Qatar 2022 wish Germany will lift the trophy again."
];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function() {
	console.log('voice is activated, you can to microphone');
}

recognition.onresult = function(event) {
	console.log("Event is: ", event);

	const current = event.resultIndex;

	const transcript = event.results[current][0].transcript;
	content.textContent = transcript;
	readOutLoud(transcript);
}

// add the listener to the btn

btn.addEventListener('click', () => {
	recognition.start();
});

function expressGreeting() {
	let val;
	if (happy > 0.3) {
		val = greetings[0];
	} else if (sad > 0.2) {
		val = greetings[1];
	} else {
		val = greetings[2];
	}
	return val;
}

function readOutLoud(message) {
	const speech = new SpeechSynthesisUtterance();

	speech.text = "Your voice is not clear, please try again or maybe I'm not trained for this right now Sorry.";

	if (message.includes('hai') || message.includes('hello') || message.includes('hi') || message.includes('Hello')) {
		const text = expressGreeting();
		speech.text = text;
	} else if (message.includes('weather') || message.includes('Summer') || message.includes('Winter')) {
		const text = weather[Math.floor(Math.random() * weather.length)];
		speech.text = text;
	} else if (message.includes('Soccer') || message.includes('Football') || message.includes('soccer') || message.includes('football')) {
		const text = soccer[Math.floor(Math.random() * soccer.length)];
		speech.text = text;
	}
	//speech.text = message;
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 1;

	window.speechSynthesis.speak(speech);
}
