let input = document.querySelector(".input") ; 
let submit = document.querySelector(".add") ;  
let tasksDiv =  document.querySelector(".tasks") ;
let remove =  document.querySelector(".remove") ;

// Empty Array To Store The Tasks
let arrayOfTasks = [] ; 

// check if There is Tasks In Local Storage 
if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));  
}  
getDataFormLogalStorage() ; 

// Add  task 
submit.onclick = function(){
    if( input.value !== ""){
        addTaskToArray(input.value) ;  // Add Task  To Array of Tasks
        input.value = ""; // Empty  input field
    }
}

// Remove All Tasks 
remove.onclick =function(){
    tasksDiv.innerHTML="";  
    window.localStorage.removeItem("tasks"); 
} 

// Click On Task Elemant
tasksDiv.addEventListener("click",(e)=>{
    // delate task 
    if(e.target.classList.contains("del"))
    {
        // Remove Task From Local Storage
        deleteTaskWithLogalStorage(e.target.parentElement.getAttribute("data-id"));  

        // Remove Element From  Page 
        e.target.parentElement.remove() ;   
    }

    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));

        // Toggle Done Class
        e.target.classList.toggle("done");
    }
})


function addTaskToArray(taskText)
{
     // Task Data
    const task = {
        id: Date.now() ,
        title: taskText ,  
        completed: false ,   
    };
    
    //  push  task 
    arrayOfTasks.push(task) ; 

    // console.log(arrayOfTasks);    //  for  tist 

    // Add Tasks To  Page 
    addElementsToPageFrom(arrayOfTasks) ;  

    //Add Tasks To local  Storage
    addDataToLocalStorageFrom(arrayOfTasks) ;  
}

function addElementsToPageFrom(arrayOfTasks)
{
    // Empty Tasks Div  
    tasksDiv.innerHTML = "" ;
    
    // looping for arrayOfTasks 
    arrayOfTasks.forEach((task) => {

        //Create  Main Div 
        let div = document.createElement("div") ; 
        div.className = "task" ;

        // Check  If Task  id Done 
        if(task.completed)
        {
            div.className = "task done";
        }

        div.setAttribute("data-id" , task.id); 
        div.appendChild(document.createTextNode(task.title));

        // Create Delate Button 
        let span =  document.createElement("span") ;  
        span.className="del" ;  
        span.appendChild(document.createTextNode("Delate")) ; 
    

        // Append Button To Main  Div
        div.appendChild(span) ;  
        
        //Add Task Div Tasks container 
        tasksDiv.appendChild(div) ; 
    }); 
}

function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks)); 
}

function getDataFormLogalStorage(){
    let Data =  window.localStorage.getItem("tasks") ; 
    if(Data)
    {
        let tasks =  JSON.parse(Data); 
        addElementsToPageFrom(tasks) ;  
    }
}

function deleteTaskWithLogalStorage(Id)
{
    // delate element from array by id 
    arrayOfTasks =arrayOfTasks.filter((task) => task.id != Id) ;  

    //Updata To Local Storage 
    addDataToLocalStorageFrom(arrayOfTasks); 
}

function toggleStatusTaskWith(Id) 
{
    for (let i = 0; i < arrayOfTasks.length; i++) 
    {
        if (arrayOfTasks[i].id == Id) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }

    //Updata To Local Storage 
    addDataToLocalStorageFrom(arrayOfTasks);
}


