$(document).ready(function(){
    // class
    class QA{
        constructor(question, option_one, option_two, option_three, answer,guessed){
            this.question = question;
            this.option_one = option_one;
            this.option_two = option_two;
            this.option_three = option_three;
            this.answer = answer;
            this.guessed = guessed;
        }
    }
    // variables
    var ObjectArray = [
        new QA("How many days in leap year?","364","365", "366", "366",false),
        new QA("How many planets in the Solar System?","eleven","nine", "seven", "nine", false),
        new QA("What is Jupiters order from the Sun?", "fifth", "third", "first", "fifth",false)
    ]

    var QUESTION_TIMER; //timer gives 30 sec to answer the question

    var QA_TIMER;       //timer 30s for question + 5s to display answer if player didn't respond

    var CLOCK;          //Interval to display time left

    var PLAYER_ANSWER;


    // function declarations
    function displayQA(array_Element){
        $(".main *").remove();
        $(".main").append("<div class = 'question'>"+array_Element.question+"</div>");
        $(".main").append("<input type = 'button' class = 'option' value = '"+array_Element.option_one+"'></input>");
        $(".main").append("<input type = 'button' class = 'option' value = '"+array_Element.option_two+"'></input>");
        $(".main").append("<input type = 'button' class = 'option' value = '"+array_Element.option_three+"'></input>");
    }

    function displayCorrectAnswer(index){
        $(".main *").remove();
        console.log(ObjectArray[index].answer);
    }

    function timer(seconds) {
        clearInterval(CLOCK);
        CLOCK = setInterval(function () {
            if (seconds != 0) {
                seconds--;
                $("#clock").remove();
                $("header").append("<div id = 'clock'><div>");
                $("#clock").text(seconds);
            }else{
                clearInterval(CLOCK);
            }
        }, 1000);
    }

    function waitAnswer(index){
        $(document).on("click", ".option", function(){
            PLAYER_ANSWER = $(this).val();
            $(document).off("click", ".option");
            clearTimeout(QUESTION_TIMER);
            clearTimeout(QA_TIMER);
            clearInterval(CLOCK);
            Loop(++index);
        });
    }

    function Loop(index) {
        if (index < ObjectArray.length) {
            timer(10);
            displayQA(ObjectArray[index]);
            waitAnswer(index);
            QUESTION_TIMER = setTimeout(function () {
                displayCorrectAnswer(index);
                timer(5);
            }, 10 * 1000);
            QA_TIMER = setTimeout(function () {
                Loop(++index);
            }, 15 * 1000);
        } else {
            clearInterval(QA_TIMER);
            console.log("Loop is over");
        }
    }
    // main()
    //=======

    $(".main").html("<input type = 'button' id = 'start-game' value = 'Start Game'>");

    $(document).on("click", "#start-game", function(){
        //game logic
        var index = 0
        Loop(index);
    })

})