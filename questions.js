const skills = ["Main Idea","Evidence","Trap","Purpose"];

const topics = [
"urban gardening","renewable energy","sleep science",
"community programs","climate policy","digital learning",
"nutrition","wildlife conservation","public transit",
"local businesses","volunteering","space exploration"
];

const difficultyLevels = [-2,-1,0,1,2,3];

let questionBank = [];

let idCounter = 0;

function createPassage(topic, difficulty){

let tone = difficulty >= 2 ? "complex" : "balanced";

return `This passage discusses ${topic}. 
It explains several perspectives and includes evidence, counterpoints, 
and nuanced reasoning presented in a ${tone} manner. 
Some arguments highlight benefits, while others address limitations.`;
}

function generateItem(skill, difficulty){

let topic = topics[Math.floor(Math.random()*topics.length)];
let passage = createPassage(topic,difficulty);

let stem="";
let correct="";
let distractors=[];

if(skill==="Main Idea"){
stem="What is the main idea of the passage?";
correct=`${topic} has both strengths and limitations.`;
distractors=[
`${topic} is always successful.`,
`${topic} has no impact.`,
`The author dislikes ${topic}.`
];
}

if(skill==="Evidence"){
stem="Which detail would best support the author’s claim?";
correct=`A study showing measurable results related to ${topic}.`;
distractors=[
`A personal opinion about ${topic}.`,
`A vague statement mentioning ${topic}.`,
`An unrelated anecdote.`
];
}

if(skill==="Trap"){
stem="Which answer choice uses extreme language?";
correct=`${topic} always solves every issue.`;
distractors=[
`${topic} sometimes helps.`,
`${topic} may improve conditions.`,
`${topic} often supports change.`
];
}

if(skill==="Purpose"){
stem="What is the author’s purpose in writing this passage?";
correct=`To inform readers about ${topic}.`;
distractors=[
`To entertain with fiction.`,
`To criticize unrelated ideas.`,
`To confuse the audience.`
];
}

let answers=[correct,...distractors];
answers.sort(()=>Math.random()-.5);

return{
id:idCounter++,
skill,
difficulty,
discrimination:1.4 + Math.random()*0.6,
passage,
stem,
choices:answers,
correct:answers.indexOf(correct)
};
}

skills.forEach(skill=>{
difficultyLevels.forEach(level=>{
for(let i=0;i<6;i++){
questionBank.push(generateItem(skill,level));
}
});
});
