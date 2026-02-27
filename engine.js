let theta = 0;
let xp = 0;
let streak = 0;
let usedQuestions = [];
let questionCount = 0;
let maxQuestions = 30;

function logistic(theta,a,b){
return 1/(1+Math.exp(-a*(theta-b)));
}

function updateTheta(response,a,b){
let p = logistic(theta,a,b);
let gradient = a*(response-p);
theta += 0.4*gradient;
}

function selectQuestion(){
let available = questionBank.filter(q=>!usedQuestions.includes(q.id));

available.sort((a,b)=>
Math.abs(a.difficulty-theta) - Math.abs(b.difficulty-theta)
);

return available[0];
}

function loadQuestion(){

if(questionCount>=maxQuestions){
endGame();
return;
}

let q = selectQuestion();
usedQuestions.push(q.id);

document.getElementById("environment").innerText =
`Environment: ${q.skill} Sector`;

document.getElementById("passage").innerText=q.passage;
document.getElementById("stem").innerText=q.stem;

let choicesDiv=document.getElementById("choices");
choicesDiv.innerHTML="";

q.choices.forEach((choice,index)=>{
let div=document.createElement("div");
div.className="choice";
div.innerText=choice;

div.onclick=function(){

if(div.classList.contains("correct")||
div.classList.contains("incorrect")) return;

questionCount++;

let correct = index===q.correct?1:0;

if(correct){
div.classList.add("correct");
xp+=10;
streak++;
}else{
div.classList.add("incorrect");
streak=0;
}

updateTheta(correct,q.discrimination,q.difficulty);
updateStats();

setTimeout(loadQuestion,800);
};

choicesDiv.appendChild(div);
});
}

function updateStats(){
document.getElementById("xp").innerText=xp;
document.getElementById("theta").innerText=theta.toFixed(2);
document.getElementById("progress").innerText=
questionCount+"/"+maxQuestions;

let percent = (questionCount/maxQuestions)*100;
document.getElementById("xpBar").style.width=percent+"%";
}

function endGame(){
document.getElementById("card").innerHTML=
`<h2>Mission Complete</h2>
<p>Final Ability (θ): ${theta.toFixed(2)}</p>
<p>Total XP: ${xp}</p>
<button onclick="downloadResults()">Download Results</button>`;
}

function downloadResults(){
let csv="Theta,"+theta+"\nXP,"+xp;
let blob=new Blob([csv],{type:"text/csv"});
let url=URL.createObjectURL(blob);
let a=document.createElement("a");
a.href=url;
a.download="ReadingMissionResults.csv";
a.click();
}

loadQuestion();
