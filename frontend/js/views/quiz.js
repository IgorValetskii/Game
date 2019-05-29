import Questions from '../models/questions';

class Quiz {
    constructor() {
        this.model = new Questions();
        this.score = 0;

        this.showQuestion();
        this.showProgress();
        this.getUserAnswer();
    };

    showQuestion() {
        if(this.score < 15) {

            this.model.getQuestionsList().then(tasks => {

                // Получаем  вопрос и варианты ответов
                const stage = tasks.filter((number, i) => {
                    if (i === this.score) {
                        return number;
                    }
                });

                const currentStage = stage[0];

                // Показыввает вопрос
                const element = document.getElementById('question');
                element.innerHTML = currentStage.question;

               // Показывает варианты ответов и записывает класс (если он есть) правильного ответа
                const answer1 = document.getElementById('choice1');
                answer1.innerHTML = currentStage.answer1[0];

                if (currentStage.answer1[1]) {
                    answer1.classList.add(currentStage.answer1[1]);
                }


                const answer2 = document.getElementById('choice2');
                answer2.innerHTML = currentStage.answer2[0];

                if (currentStage.answer2[1]) {
                    answer2.classList.add(currentStage.answer2[1]);
                }

                const answer3 = document.getElementById('choice3');
                answer3.innerHTML = currentStage.answer3[0];

                if (currentStage.answer3[1]) {
                    answer3.classList.add(currentStage.answer3[1]);
                }

                const answer4 = document.getElementById('choice4');
                answer4.innerHTML = currentStage.answer4[0];

                if (currentStage.answer4[1]) {
                    answer4.classList.add(currentStage.answer4[1]);
                }
            });
        }
        this.getUserAnswer();
    };

    getUserAnswer() {
        if (this.score <15 ) {
            const answerContainer = document.getElementsByClassName('answer-box')[0];

            answerContainer.addEventListener('click', event => {
                event.stopImmediatePropagation();
                const target = event.target,
                    targetClassAnswer = target.classList;
                // Если кликнули на правильный ответ - увеличиваем счет, отрисовываем новый вопрос и текущий прогресс
                if (targetClassAnswer.contains('right')) {
                    this.increaseScore();
                    this.countScore();
                    this.showQuestion();
                    this.showProgress();
                    targetClassAnswer.remove('right');


                } else {
                    this.showGameOver();
                }
            });
        }
    };

    increaseScore() {
        if(this.score < 15) {
            this.score++;
        }
    };

    countScore() {
        if (this.score === 15) {
            this.showWinner();
        }
    };

    showGameOver(){
        let currentMoney,
            prize;

        if(this.score >= 10) {
            currentMoney = document.getElementById('progress10');
            prize = currentMoney.innerHTML;

            const winnerHtml = `<div class="win-text">
                                    <p> Игра окончена!</p>
                                </div>
                            
                                <div class="win-sum">
                                    <p>Вы выйграли ${prize}!</p>
                                </div>`;

            const pageContainer = document.getElementsByClassName('game')[0];
            pageContainer.innerHTML = winnerHtml;

        } else if (this.score >= 5) {
            currentMoney = document.getElementById('progress5');
            prize = currentMoney.innerHTML;

            const winnerHtml = `<div class="win-text">
                                    <p> Игра окончена!</p>
                                </div>
                                
                                <div class="win-sum">
                                    <p>Вы выйграли ${prize}!</p>
                                </div>`;

            const pageContainer = document.getElementsByClassName('game')[0];
            pageContainer.innerHTML = winnerHtml;

        }else {
            const winnerHtml = `<div class="win-text"> Вы проиграли! </div>

                                <div class="win-sum">
                                    <p>К сожалению Вы ничего не выйграли.</p>
                                    <p>Попробуйте еще раз!</p>
                                </div>`;
            const pageContainer = document.getElementsByClassName('game')[0];
            pageContainer.innerHTML = winnerHtml;
        }
    };

    showWinner(){
        const moneyContainer = document.getElementById('progress15');
        const prize = moneyContainer.innerHTML;
        const winnerHtml = `<div class="win-text">
                                <p> Победа!</p>
                            </div>
                            
                            <div class="win-sum">
                                <p>Вы выйграли ${prize}!</p>
                            </div>`;

        const pageContainer = document.getElementsByClassName('game')[0];
        pageContainer.innerHTML = winnerHtml;
    };

    showProgress() {
        if (this.score < 15) {

            let currentQuestionNumber = this.score + 1;
            const element = document.getElementById(`progress${currentQuestionNumber}`);

            element.classList.add('current-money');

            if (currentQuestionNumber !== 1) {

                let previousElement = document.getElementById(`progress${this.score}`);
                previousElement.classList.remove('current-money');

                let money = document.getElementsByTagName('span')[0];
                money.innerHTML = previousElement.innerHTML;
            }
        }
    };
};

export default Quiz;

