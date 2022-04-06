// Create a new task list item depending on the items passed from the render() function
const createTaskHtml = (id, name, task, description, dueDate, assignedTo, email, status) => `
  <li class="list-group-item" data-task-id=${id}>
    <div class="card">
      <div class="card-body ${status === 'TODO' ? 'bg-danger' : status === 'IN-PROGRESS' ? 'bg-warning' : 'bg-success'}">
        <h5 class="card-title">
          <div class="form-check">
            <input type="checkbox" class="form-check-input checkedBox" name="theCheck">
            ${task} | By: ${name} | For: ${assignedTo} | id: ${id}
          </div>
        </h5>
        <p class="card-text">${description}</p>
        <p class="card-text">Due Date: ${dueDate} | Status: ${status}</p>
        <p class="card-text">Email: ${email}</p>
      </div>
    </div>
  </li>
`;

class taskManager {

  // Constructor for creating and initializing a new taskManager object
  constructor(currentId = 0) {
    // Creating a new empty tasks array
    this.tasks = [];
    // Creating a currentId property and setting it to 0
    this.currentId = currentId;
  }

  // Method to add a new task to the tasks array of the taskManager object
  addTask (name, task, description, dueDate, assignedTo, email) {

    // Creating a new task object and storing the object's properties based on arguments passed
    const newTask = {
      id: this.currentId++,
      name: name,
      task: task,
      description: description,
      dueDate: dueDate,
      assignedTo: assignedTo,
      email: email,
      status: 'TODO'
    };

    // Passing the new task object and it's information into the tasks array
    this.tasks.push(newTask);
    
  }

  // Method to display the tasks array in a list form
  render() {
    // Creating a temperary array to store the task list
    const tasksHtmlList = [];
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Get the current date in the loop
      const date = new Date(task.dueDate);
      // Format the current date
      const formattedDate = (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + date.getFullYear();
      // Pass the task properties to create a new task list item
      const taskHtml = createTaskHtml(task.id, task.name, task.task, task.description, formattedDate, task.assignedTo, task.email, task.status);
      // Push the new task list item into the task list array
      tasksHtmlList.push(taskHtml);
    }
    // Concatenate all of the task list items within the array and store it to a new task list variable
    const tasksHtml = tasksHtmlList.join('\n');
    // Select the area the the task list will be displayed
    const tasksList = document.querySelector('#tasksList');
    // Change the HTML to display the task list variable
    tasksList.innerHTML = tasksHtml;
  }

  // Method to find the correct task based on the id passed
  getTaskById(taskId) {
    // Create a variable to store the found task
    let foundTask;
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Determine if its the right task by comparing the task's id to the id passed as a parameter
      if (task.id === taskId) {
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }
    // Return the found task
    return foundTask;
  }

  // Method to save the contents of the task array and the current id into local storage by converting everything into string
  save() {
    // Converting the task array into a string and storing it an a new variable
    const tasksJson = JSON.stringify(this.tasks);
    // Saving the name of the item and storing the string into local storage
    localStorage.setItem('tasks', tasksJson);
    // Converting the current id number into a string and storing it an a new variable
    const currentId = String(this.currentId);
    // Saving the name of the item and storing the string into local storage
    localStorage.setItem('currentId', currentId);
  }

  // Method to load the tasks array and the current id from local storage
  load() {
    // Checking if there is an item called tasks to retrieve from local storage
    if (localStorage.getItem('tasks')) {
      // Retrieving the tasks string from local storage
      const tasksJson = localStorage.getItem('tasks');
      // Converting tasks from string and storing it to the tasks array
      this.tasks = JSON.parse(tasksJson);
    }
    // Checking if there is an item called currentId to retrieve from local storage
    if (localStorage.getItem('currentId')) {
      // Retrieving the currentId string from local storage
      const currentId = localStorage.getItem('currentId');
      // Converting currentId from string and storing it to the currentId property
      this.currentId = Number(currentId);
    }
  }
}

module.exports = taskManager;