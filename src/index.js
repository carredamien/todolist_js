import "./style.css";

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('form > input');

form.addEventListener('submit', (e) =>{
  e.preventDefault();
  const value = input.value;
  input.value = '';
  addTodo(value);

});

const todos = [
  {
    text: 'Je suis une todo',
    done: false,
  },
  {
    text: 'Faire du js',
    done: true,
  },
];

const displayTodo = () =>{
  const todosNode = todos.map((todo, index) => {
    return createTodoElement(todo, index);
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const createTodoElement = (todo, index)=> {
  const li = document.createElement('li');
  const buttonDelete = document.createElement('button');
  buttonDelete.innerHTML = 'Supprimer;'
  buttonDelete.addEventListener('click', (event) =>{
    deleteTodo(index);
  });

  li.innerHTML = `
    <span class="todo ${ todo.done ? "done" : "" }"></span>
    <p>${ todo.text}</p>
  `;
  li.addEventListener('click', (event) => {
    toggleTodo(index);
  })
  li.appendChild(buttonDelete);
  return li;
};

const addTodo = (text) => {
 todos.push({
    text,
    done: false
 });
 displayTodo();
}
const deleteTodo = (index) => {
  todos.splice(index, 1);
  displayTodo();
};

const toggleTodo = index => {
  todos[index].done = !todos[index].done;
  displayTodo();
}

displayTodo();