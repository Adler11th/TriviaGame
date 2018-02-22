$(document).ready(function(){
    // class
    class QA{
        constructor(question, option_one, option_two, option_three, answer){
            this.question = question;
            this.option_one = option_one;
            this.option_two = option_two;
            this.option_three = option_three;
            this.answer = answer;
        }
    }
    // variables
    var ObjectArray = [
        new QA("How many days in leap year?","364","365", "366", "366"),
        new QA("How many planets in the Solar System?","eleven","nine", "seven", "nine"),
        new QA("What is Jupiters order from the Sun?", "fifth", "third", "first", "fifth"),
        new QA("How long the day on saturn?", "12h 14min", "10h 42m","8h 51m","10h 42m")
    ]

    var QUESTION_TIMER; //timer gives 30 sec to answer the question

    var QA_TIMER;       //timer 30s for question + 5s to display answer if player didn't respond

    var CLOCK;          //Interval to display time left

    var PLAYER_ANSWER;  

    var ANSWERED = 0, NOT_ANSWERED = 0, WRONG = 0; //tracking variables for final screen

    // function declarations
    function displayQA(array_Element){
        $(".main *").remove();
        $(".main").append(`<h2 class = 'question'>${array_Element.question}</div>`);
        $(".main").append(`<input type = 'button' class = 'option' value = '${array_Element.option_one}'></input>`);
        $(".main").append(`<input type = 'button' class = 'option' value = '${array_Element.option_two}'></input>`);
        $(".main").append(`<input type = 'button' class = 'option' value = '${array_Element.option_three}'></input>`);
    }

    function displayCorrectAnswer(index){
        $(".main *").remove();
        $(".main").append(`<h2 class = 'answer'>Wrong!</h2>
        <div class = 'answer'>The correct answer was: ${ObjectArray[index].answer}</div>`);
    }

    function timer(seconds) {
        clearInterval(CLOCK);
        CLOCK = setInterval(function () {
            if (seconds >= 0) {
                $("#clock").remove();
                $("header").after(`<div id = 'clock'>Time left: ${seconds}<div>`);
                seconds--;
            }else{
                clearInterval(CLOCK);
            }
        }, 1000);
    }

    function checkCurrentAnswer(index){
        if(PLAYER_ANSWER == ObjectArray[index].answer){
                return true;
        }else{
            return false;
        }
    }

    function displayYouGuessed(index){
        $(".main *").remove();
        $(".main").append(`<h2 class = 'answer'>You are correct!</h2>`);
    }

    function waitAnswer(index){
        $(document).on("click", ".option", function(){
            console.log(index);
            PLAYER_ANSWER = $(this).val();
            $(document).off("click", ".option");
            clearTimeout(QUESTION_TIMER);
            clearTimeout(QA_TIMER);
            clearInterval(CLOCK);
            if(checkCurrentAnswer(index)){
                ANSWERED++;
                displayYouGuessed(index);
            }else{
                WRONG++;
                displayCorrectAnswer(index);
            }
            QA_TIMER = setTimeout( function(){
                gameLoop(++index);
            },5*1000)
        });
    }

    function gameLoop(index) {
        if (index < ObjectArray.length) {
            timer(9);
            displayQA(ObjectArray[index]);
            waitAnswer(index);
            QUESTION_TIMER = setTimeout(function () {
                displayCorrectAnswer(index);
                NOT_ANSWERED++;
            }, 10 * 1000);
            QA_TIMER = setTimeout(function () {
                gameLoop(++index);
            }, 15 * 1000);
        } else {
            clearTimeout(QA_TIMER);
            console.log("gameLoop is over");
            finalScreen();
        }
    }

    function finalScreen(){
        $(".main *").remove();
        $(".main").append("<h2 class = 'answer'>Stats</h2>");
        $(".main").append(`<div class = 'answer'> Answered Correctly: ${ANSWERED}</div>`);
        $(".main").append(`<div class = 'answer'> Answered Wrong: ${WRONG}</div>`);
        $(".main").append(`<div class = 'answer'> Didn't answer: ${NOT_ANSWERED}</div>`);
        $(".main").append("<input type = 'button' class = 'reset' value = 'Restart'>");
    }
    
    // main()
    //=======

    $(".main").html("<input type = 'button' id = 'start-game' value = 'Start Game'>");

    $(document).on("click", "#start-game", function(){
        gameLoop(0);
    })
    $(document).on("click",".reset",function(){
        ANSWERED = 0;
        NOT_ANSWERED = 0;
        WRONG = 0;
        gameLoop(0);
    })


})