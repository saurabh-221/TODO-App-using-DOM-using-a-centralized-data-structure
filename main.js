var todoList = JSON.parse(localStorage.getItem('items'));

var dragID;
var dragText;


window.onload = function () {
  if (todoList != null) {
    displayList();
  };
  $("#todo-item").keyup(function (event) {
    if (event.keyCode === 13) {
      $("#add-btn").click();
    }
  });
};


// Add item to to-do list
function addItem() {
  if (todoList == null) {
    todoList = [];
  }
  var item = document.getElementById('todo-item');
  if (item.value != '') {
    todoList.push([item.value, false]);
    addToLocalStorage();
    clearChanges();
    displayList();
  }
  document.getElementById("todo-item").value = "";
}


// Add item to local storage
function addToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(todoList));
}


// Display list method
function displayList() {
  var array = JSON.parse(localStorage.getItem('items'));
  var section = document.getElementById('todo');

  for (var i = 0; i < array.length; i++) {
    var division = document.createElement('li');
    division.id = i;
    division.draggable = 'true';
    division.className = 'list-item';
    division.addEventListener('dragstart', dragStart);
    division.addEventListener('dragover', dragOver);
    division.addEventListener('drop', dragDrop);
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', checkItem);
    checkbox.checked = array[i][1];
    var todoText = document.createElement('span');
    todoText.innerText = array[i][0];
    var cancel = document.createElement('div');
    cancel.className = 'cancel-img';
    cancel.addEventListener('click', removeItem);
    if (array[i][1]) {
      todoText.style.textDecoration = 'line-through';
      todoText.style.color = 'gray';
    }
    division.appendChild(checkbox);
    division.appendChild(todoText);
    division.appendChild(cancel);
    section.appendChild(division);
  }
}


function clearChanges() {
  var ul = document.getElementById('todo');

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}


function checkItem() {
  if (this.checked == true) {
    todoList[this.parentNode.id][1] = true;
    addToLocalStorage();
    clearChanges();
    displayList();
  } else {
    todoList[this.parentNode.id][1] = false;
    addToLocalStorage();
    clearChanges();
    displayList();
  }
}


function removeItem() {
  this.parentNode.parentNode.removeChild(this.parentNode);
  todoList.splice(this.parentNode.id, 1);
  addToLocalStorage();
}


function dragStart(e) {
  dragID = this.id;
  dragText = e.target.textContent;
}


function dragOver(e) {
  e.preventDefault();
  e.stopPropagation();
}


function dragDrop(e) {
  todoList[this.id][0] = dragText;
  todoList[dragID][0] = e.target.textContent;
  var isChecked = todoList[this.id][1];
  todoList[this.id][1] = todoList[dragID][1];
  todoList[dragID][1] = isChecked;

  addToLocalStorage();
  clearChanges();
  displayList();
}

