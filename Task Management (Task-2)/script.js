let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(){

const input=document.getElementById("taskInput");

if(input.value.trim()=="") return;

tasks.push({
id:Date.now(),
text:input.value,
completed:false
});

input.value="";
saveTasks();
displayTasks();

}

function deleteTask(id){

tasks=tasks.filter(task=>task.id!==id);

saveTasks();

displayTasks();

}

function editTask(id){

const task=tasks.find(t=>t.id===id);

let newTask=prompt("Edit Task",task.text);

if(newTask){

task.text=newTask;

saveTasks();

displayTasks();

}

}

function toggleTask(id){

const task=tasks.find(t=>t.id===id);

task.completed=!task.completed;

saveTasks();

displayTasks();

}

function displayTasks(){

const list=document.getElementById("taskList");

const search=document.getElementById("search").value.toLowerCase();

list.innerHTML="";

tasks
.filter(task=>{

if(filter==="pending") return !task.completed;

if(filter==="completed") return task.completed;

return true;

})
.filter(task=>task.text.toLowerCase().includes(search))
.forEach(task=>{

list.innerHTML+=`
<li>

<span class="${task.completed?'completed':''}">
${task.text}
</span>

<div class="actions">

<button onclick="toggleTask(${task.id})">
${task.completed?'Undo':'Done'}
</button>

<button onclick="editTask(${task.id})">
Edit
</button>

<button onclick="deleteTask(${task.id})">
Delete
</button>

</div>

</li>
`;

});

}

displayTasks();