var newTask = document.getElementById("new-task");
var incompleteTask = document.getElementById("incomplete-tasks");
var completedTask = document.getElementById("completed-tasks");
var addButton = document.getElementsByTagName("button")[0];

//function to create new task

var createNewTask = (taskString) => {
  //new list item
  var newListItem = document.createElement("li");

  //create new elements for added task
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  //label naming for the above <label>
  label.innerHTML = taskString;

  //all HTML elements type and classname set

  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  //appending all the elements created to the new list

  newListItem.append(checkBox);
  newListItem.append(label);
  newListItem.append(editInput);
  newListItem.append(editButton);
  newListItem.append(deleteButton);

  return newListItem;
};

//add task function

const addTask = () => {
  console.log("Task adding..");

  //create a new list for new-task added
  var newListItem = createNewTask(newTask.value);
  //append task to incomplete section
  incompleteTask.appendChild(newListItem);
  bindTaskEvents(newListItem, taskCompleted);

  newTask.value = "";
};

//Edit an existing task.

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var newListItem = this.parentNode;

  var editInput = newListItem.querySelector("input[type=text]");
  var label = newListItem.querySelector("label");
  var containsClass = newListItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  //toggle .editmode on the parent.
  newListItem.classList.toggle("editMode");
};

//Delete task.
var deleteTask = function () {
  console.log("Delete Task...");

  var newListItem = this.parentNode;
  var ul = newListItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(newListItem);
};

//Mark task completed
var taskCompleted = function () {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var newListItem = this.parentNode;
  completedTask.appendChild(newListItem);
  bindTaskEvents(newListItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incomplete-tasks.
  var newListItem = this.parentNode;
  incompleteTask.appendChild(newListItem);
  bindTaskEvents(newListItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
// addButton.addEventListener("click",addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTask.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTask.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTask.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTask.children[i], taskIncomplete);
}
