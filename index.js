"use strict";

const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("form > input");

form.addEventListener("submit", event => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});

const todos = [
  {
    text: "Apprendre VueJs",
    done: true,
    editMode: false
  },
  {
    text: "faire du JavaScript",
    done: true,
    editMode: false
  },
  {
    text: "faire du NodeJs",
    done: true,
    editMode: false
  },
  {
    text: "faire du Php",
    done: true,
    editMode: false
  },
  {
    text: "Développer un thème WordPress",
    done: true,
    editMode: false
  },
  {
    text: "Apprendre Symfony",
    done: false,
    editMode: false
  },
  {
    text: "Apprendre Docker",
    done: false,
    editMode: false
  },
];

const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    if (todo.editMode) {
      return createTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  buttonDelete.classList.add("danger");
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "Edit";
  buttonEdit.classList.add("success");
  buttonDelete.addEventListener("click", event => {
    event.stopPropagation();
    deleteTodo(index);
  });
  buttonEdit.addEventListener("click", event => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p class="${todo.done ? "done" : ""}">${todo.text}</p>
  `;
  li.addEventListener("click", event => {
    toggleTodo(index);
  });
  li.append(buttonEdit, buttonDelete);
  return li;
};

const createTodoEditElement = (todo, index) => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.text;
  const buttonSave = document.createElement("button");
  buttonSave.classList.add("primary");
  buttonSave.innerHTML = "Save";
  const buttonCancel = document.createElement("button");
  buttonCancel.innerHTML = "Cancel";
  buttonCancel.classList.add("primary");
  buttonCancel.addEventListener("click", event => {
    event.stopPropagation();
    toggleEditMode(index);
  });
  buttonSave.addEventListener("click", event => {
    editTodo(index, input);
  });
  li.append(input, buttonCancel, buttonSave);
  return li;
};

const addTodo = text => {
  text = text.trim();
  if (text) {
    todos.push({
      text: `${text[0].toUpperCase()}${text.slice(1)}`,
      done: false
    });
    displayTodo();
  }
};

const deleteTodo = index => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = index => {
  todos[index].done = !todos[index].done;
  displayTodo();
};

const toggleEditMode = index => {
  todos[index].editMode = !todos[index].editMode;
  displayTodo();
};

const editTodo = (index, input) => {
  const value = input.value;
  todos[index].text = value;
  todos[index].editMode = false;
  displayTodo();
};

//Lors de l'édition, ajoutez un écouteur pour sauvegarder avec la touche entrée 
input.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    editTodo(index, input);
  }
});

//Rendre l'édition possible sur un double clic 
// li.addEventListener("dblclick", event => {
//   toggleEditMode(index);
// });


//Empêcher le double clic de changer le statut deux fois de suite de la todo 
// let timer;
// li.addEventListener("click", event => {
//   if (event.detail === 1) {
//     timer = setTimeout(() => {
//       toggleTodo(index);
//     }, 200);
//   } else if (event.detail > 1) {
//     clearTimeout(timer);
//     toggleEditMode(index);
//   }
// });

displayTodo();
