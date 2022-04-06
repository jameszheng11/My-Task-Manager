// Create a new task manager oject
const newTaskManager = new taskManager(0);

// Loading task list from local storage
newTaskManager.load();
// Displaying the task list
newTaskManager.render();

// Selecting the location of the task input form
const newTaskForm = document.querySelector('#newTask');
// Selecting the location of the incorrect input alert box
const errorMessage = document.querySelector('#alertMessage');
// Selecting the location of the task buttons
const changeTask = document.querySelector('#taskButtons');

// Event listener for the task form
newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault()
  
  // Selecting the locations of the form items
  const firstName = document.querySelector('#firstName');
  const taskName = document.querySelector('#taskName');
  const taskInput = document.querySelector('#taskInput');
  const start = document.querySelector('#start');
  const assignedToName = document.querySelector('#assignedToName');
  const emailInput = document.querySelector('#emailInput');
  
  // Creating new variables and setting their respective values
  const name = firstName.value;
  const task = taskName.value;
  const description = taskInput.value;
  const dueDate = start.value;
  const assignedTo = assignedToName.value;
  const email = emailInput.value;
  
  // Determine if an input field is an empty value and block submission if any field is empty
  if(!validFormFieldInput(name)) {
    errorMessage.innerHTML = "Invalid name input";
    errorMessage.style.display = "block"
  } else if(!validFormFieldInput(task)) {
    errorMessage.innerHTML = "Invalid task name input";
    errorMessage.style.display = "block"
  } else if(!validFormFieldInput(description)) {
    errorMessage.innerHTML = "Invalid description input";
    errorMessage.style.display = "block"
  } else if(!validFormFieldInput(dueDate)) {
    errorMessage.innerHTML = "Invalid due date input";
    errorMessage.style.display = "block"
  } else if(!validFormFieldInput(assignedTo)) {
    errorMessage.innerHTML = "Invalid assignment input";
    errorMessage.style.display = "block"
  } else if(!validFormFieldInput(email)) {
    errorMessage.innerHTML = "Invalid E-mail input";
    errorMessage.style.display = "block"
  } else {
    errorMessage.style.display = "none"
    // Invoke the method to add a new task to the tasks array of the taskManager object
    newTaskManager.addTask(name, task, description, dueDate, assignedTo, email);
    // Saving the task list and current id
    newTaskManager.save();
    // Displaying the task list
    newTaskManager.render();
    // Set the input fields to empty values
    firstName.value = '';
    taskName.value = '';
    taskInput.value = '';
    start.value = '';
    assignedToName.value = '';
    emailInput.value = '';
  }
});

// Function to determine if the data received is an empty value
function validFormFieldInput(data) {
  return data !== null && data !== '';
}

// Event listener for the task buttons
changeTask.addEventListener('click', (event) => {
  // Check if the task change buttons have been pressed
  if (event.target.classList.contains('taskChangeButton')) {
    // Selecting the locations of the check boxes
    let checkedBoxes = document.getElementsByName('theCheck');
    // Loop over the check boxes
    for (let i = 0; i < checkedBoxes.length; i++) {
      // Determining if the item is a check box
      if (checkedBoxes[i].type === 'checkbox') {
        // Determining if a check box is checked
        if (checkedBoxes[i].checked === true) {
          // Retrieving the list item of the checked box
          let parentTask = checkedBoxes[i].parentElement.parentElement.parentElement.parentElement.parentElement;
          // Retrieving the id of the list item
          let taskId = Number(parentTask.dataset.taskId);
          // Retrieving the task associated with the id
          let task = newTaskManager.getTaskById(taskId);
          // Determining which task change button was pressed
          if(event.target.id === 'complete') {
            // Setting the task's status to 'DONE' if the complete button was pressed
            task.status = 'DONE';
          } else if (event.target.id === 'in-progress') {
            // Setting the task's status to 'IN-PROGRESS' if the in-progress button was pressed
            task.status = 'IN-PROGRESS';
            // Setting the task's status to 'TODO' if the reset button was pressed
          } else if (event.target.id === 'reset') {
            task.status = 'TODO';
          }
        }
      }
    }
    // Saving the task list and current id
    newTaskManager.save();
    // Displaying the task list
    newTaskManager.render();
  }

  // Check if delete button has been pressed
  if (event.target.classList.contains('taskDeleteButton')) {
    // Selecting the locations of the check boxes
    let checkedBoxes = document.getElementsByName('theCheck');
    // Creating an array to store the location of the check box items that need to be deleted
    let toDelete = [];
    // Loop over the check boxes
    for (let i = 0; i < checkedBoxes.length; i++) {
      // Determining if the item is a check box
      if (checkedBoxes[i].type === 'checkbox') {
        // Determining if a check box is checked
        if (checkedBoxes[i].checked === true) {
          // Pushing the check box location into the delete array
          toDelete.push(i);
        }
      }
    }
    // Loop over the delete array to receive the locations of the checked boxes
    for (let i = toDelete.length -1; i >= 0; i--) {
      // Splicing the list item to be deleted from the tasks array
      newTaskManager.tasks.splice(toDelete[i], 1);
    }
    // Saving the task list and current id
    newTaskManager.save();
    // Displaying the task list
    newTaskManager.render();
  }
});