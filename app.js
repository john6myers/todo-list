document.addEventListener("DOMContentLoaded",getTodos);
const form= document.querySelector('#todoForm');
const todoList= document.querySelector('#todoList');



form.addEventListener('submit',function(e){
    e.preventDefault();
    // create Li
    const newListItem= document.createElement('li');
    // getting value for todo task
    newListItem.innerText= todoInput.value;
    // appends the new li/task to the overall list
    todoList.appendChild(newListItem);
    // add todo to local storage
    saveLocalTodos(todoInput.value);
    // creates a button 
    const completeButton= document.createElement('button');
    // sets button text to task complete
    completeButton.innerText = 'Task Complete';
    // button is set to all new list items
    newListItem.appendChild(completeButton);
    form.reset();

});
todoList.addEventListener("click", function(e) {
    const targetTag = e.target.tagName.toLowerCase();
    // const targetLi = 'li';
    // checks if the li is clicked if it is the list texts gets striked through
    if (targetTag === "li") {
      e.target.style.textDecoration = "line-through";
    } 
    // if its a button and will be removed from the todo list
    else if (targetTag === "button") {
        
        e.target.parentNode.remove();
        removeLocalTodos(e.target.previousSibling.textContent);
        
        // removeLocalTodos();
    }
  });


   

function saveLocalTodos(todo){
    // check if you already have something saved
    let todos;
    if(localStorage.getItem('todos') === null){
        todos= [];
    }else{
        todos= JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
};

function getTodos(){
    // console.log('hello')
    let todos;
    if(localStorage.getItem('todos') === null){
        todos= [];
    }else{
        todos= JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const newListItem= document.createElement('li');
    // getting value for todo task
        newListItem.innerText= todo;
    // appends the new li/task to the overall list
        todoList.appendChild(newListItem);
    // creates a button 
        const completeButton= document.createElement('button');
    // sets button text to task complete
        completeButton.innerText = 'Task Complete';
    // button is set to all new list items
        newListItem.appendChild(completeButton);    
    })
}

function removeLocalTodos(todo){
    // console.log('hello')
    let todos;
    if(localStorage.getItem('todos') === null){
        todos= [];
    }else{
        todos= JSON.parse(localStorage.getItem('todos'));
    }
    
    // splices out the deleted array item from localStorage
    const todoIndex = todos.indexOf(todo);
    todos.splice(todoIndex , 1);

    // saves the new array to localStoarage 
    localStorage.setItem('todos',JSON.stringify(todos));
    

}

