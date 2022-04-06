'use strict';

const ul = document.querySelector('ul');
const form = document.querySelector("form");
const input = document.querySelector("form > input");

//Je stocke un array de todos
const todos = [
  { 
    content: 'Je suis une Todo',
    done: false,
    editMode: false, 
  },
  { 
    content: 'Faire du Javascript',
    done: false,
    editMode: false, 
  },
];

//addevent de soumission du formulaire
form.addEventListener("submit", event => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});



//affichage des todos
const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    return createTodoElement(todo, index);
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
}

//création de l'élément pour chaque todo

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  buttonDelete.addEventListener("click", event => {
    deleteTodo(index);
  });
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.content}</p>
  `;
  return li;
};


// ajout de todo
const addTodo = content => {
  todos.push({
    content,
    done: false
  });
  displayTodo();
};

//suppression de todos
const deleteTodo = index => {
  todos.splice(index, 1);
  displayTodo();
};

//statut de todos
const toggleTodo = index => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

displayTodo();


