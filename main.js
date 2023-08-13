const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

let questionIndex = 0;
let score = 0;

const questionWrapper = document.querySelector('#header'),
	  answersWrapper = document.querySelector('#list'),
	  submitBtn = document.querySelector('#submit');


function clearPage() {
	questionWrapper.innerHTML = '';
	answersWrapper.innerHTML = '';
}

clearPage();
showQuestions();

submitBtn.onclick = checkAnswer;

function showQuestions() {
	// question title

	const questionsTemplate = `<h2 class="title">%title%</h2>`;
	const question = questionsTemplate.replace('%title%', questions[questionIndex]['question']);

	questionWrapper.innerHTML = question;


	// answers

	for ([index, answerText] of questions[questionIndex]['answers'].entries()) {

		const answerNumber = index + 1;
		
		const answersTemplate = `
			<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>
		`;

		const answer = answersTemplate
							.replace('%answer%', answerText)
							.replace('%number%', answerNumber);

		answersWrapper.innerHTML += answer;
	}
}

function checkAnswer() {

	const checkedRadio = answersWrapper.querySelector('input[type=radio]:checked');
	
	if(!checkedRadio) {
		submitBtn.blur();
		return
	}

	const userAnswer = parseInt(checkedRadio.value);
	
	if(userAnswer === questions[questionIndex]['correct']) {
		score++;
		console.log(score);
	}
	
	if(questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestions();
		return
	} else {
		clearPage();
		showResults();
	}
}

function showResults() {
	const resultTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
		<p>Ты олениха</p>
		<img width='300' heigth='300' src='https://oir.mobi/uploads/posts/2021-05/1620328492_36-oir_mobi-p-severnaya-olenikha-zhivotnie-krasivo-foto-38.jpg'></img>
	`;

	let title, message;

	if(score === questions.length) {
		title = 'Поздравляем';
		message = 'Вы отвевили верно на все вопросы';
	} else if((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат';
		message = 'Вы дали более половины правильных ответов';
	} else {
		title = 'Стоит постараться';
		message = 'Пока у вас меньше половины правильных ответов';
	}

	let result = `${score} из ${questions.length}`;

	const finalMessage = resultTemplate
							.replace('%title%', title)
							.replace('%message%', message)
							.replace('%result%', result);

	questionWrapper.innerHTML = finalMessage;


	submitBtn.blur();
	submitBtn.innerText = 'Играть снова';
	submitBtn.onclick =()=> {history.go()};
}