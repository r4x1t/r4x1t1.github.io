const questions=[
     {
        question:"What is my exact time of birth?",
        answers:[

            {text:"4:00 AM" ,correct:true},
            {text:"6:00 PM" ,correct:false},
            {text:"10:00 AM",correct:false},
            {text:"7:00 PM" ,correct:false},
        ]
     },
     {
        question:"Out of these films, which one will i prefer to watch?",
        answers:[

            {text:"The dark night" ,correct:false},
            {text:"Shawshank redemption" ,correct:true},
            {text:"se7en",correct:false},
            {text:"OldBoy" ,correct:false},
        ]
        
     },
     {
        question:"Who is my spotify top artist ever?",
        answers:[

            {text:"Future" ,correct:false},
            {text:"The Weeknd" ,correct:true},
            {text:"Drake",correct:false},
            {text:"Kendrick Lamar" ,correct:false},
        ]
        
     },
     {
        question:"What is my favorite album of all time?",
        answers:[

            {text:"DS2 by Future" ,correct:false},
            {text:"DAMN. by kendrick lamar" ,correct:false},
            {text:"Starboy by the weeknd",correct:true},
            {text:"Utopia by travis scott" ,correct:false},
        ]
        
     },
     {
        question:"Who is my favorite actor out of these?",
        answers:[

            {text:"Cristian Bale" ,correct:true},
            {text:"Leonardo Dicaprio" ,correct:false},
            {text:"Daniel day-lewis",correct:false},
            {text:"Cillian Murphy" ,correct:false},
        ]
     }
];

const questionElement = document.getElementById("question");//easy acces to html files for modifn
const answerButton= document.getElementById("answer-btns");
const nextButton= document.getElementById("next-btn");

let score=0;//keeps score
let currentQuestionIndex=0;// for tracking the questions in the array

function resetState()
{
    //the next button must be disabled , only enable after selecting an answer
    nextButton.style.display="none";

    while(answerButton.firstChild)//removes all the previous answers and  new is added during the showquestion fn call for each button 
    {
        answerButton.removeChild(answerButton.firstChild);
    } 
}


function showQuestion(){
    resetState();
    let questionNo=currentQuestionIndex+1;
    let currQuestion=questions[currentQuestionIndex];
    questionElement.innerHTML=questionNo+". "+currQuestion.question;//qeustion is modified
    
    currQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);//appends new answer
        if(answer.correct)
        {
            button.dataset.correct=answer.correct;//if its correct answer then add that property to this specific button.
        }
        button.addEventListener("click",selectanswer);
    });
}

function startQuiz()
{//to start the quiz
    score=0;
    currentQuestionIndex=0;
    nextButton.innerHTML="Next";//because i think in the end it will be changed to restart and then it goes to startquiz again
    showQuestion();
}

function selectanswer(e){
    const selectedbtn= e.target;//target is the button selected with all its data
    const iscorrect= selectedbtn.dataset.correct=== "true";

    if(iscorrect)//ye he pehla try player ka if correct then score++ else sahi wala dikhao
    {
        selectedbtn.classList.add("correct");
        score++;
    }
    else{
        selectedbtn.classList.add("incorrect");
    }
//idhar dikhega sahi ye sare buttons ke throug jayega aur correct wale ko select karke uski class new add karega correct class
    Array.from(answerButton.children).forEach(button=>{

        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");
        }
       // else button.classList.add("incorrect");
       //now disable the button 
       //sabko disable bhi kardega
       button.disabled=true; //so each button is checked after selecting the correct or incorrect and if correct its green else nothinng but disable the button
    });
    nextButton.style.display="block";
    //next question ke liye
 //   currentQuestionIndex++;
   // nextButton.addEventListener("click",showQuestion);

}

function showScore()
{
    resetState();//this removes all the buttons or answer options and set score =0 for next game
    if(score>3)
    document.getElementById("question").innerHTML=`Good, You scored ${score} out of ${questions.length} :)) !`;
   else
   {
     questionElement.innerHTML=`Poor, You scored ${score} out of ${questions.length} :(`;
   }
   nextButton.innerHTML="Play Again";
   nextButton.style.display="block";
}


function handleNextButton()
{
    currentQuestionIndex++;//yes if we reach the last question here then show scores
    //also then we hit the next button which is now restart which then goes to addeventlistner where index is already more than length so its restarts the quiz
    if(currentQuestionIndex<questions.length)
    {
        showQuestion();
    }
    else{
        showScore();//we show the score once we are at the end.
    }
}


nextButton.addEventListener("click",()=>{
//this means button ke click ke baad ye hoga
//pehle check karo ki question ki length question no. se kam h if yes then continue quiz
if(currentQuestionIndex<questions.length)
{
    handleNextButton();
}
else{
    startQuiz();//restart quiz.
    //but where to show the score?
    //yes, we do that in handle next button  
}
});

startQuiz();