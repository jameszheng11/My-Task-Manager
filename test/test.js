const assert = require('assert');
const taskManager = require('../js/taskManager');

describe('TaskManager', () => {
  
  describe('constructor', () => {
    it('should get current task id',  () => {
      const TaskManager = new taskManager();
      const expected = 0;
      const actual = TaskManager.currentId;
      assert.equal(actual, expected);
    });
  });

  describe('addTask', () => {
    it('should add a new task to the task array', () => {
      const TaskManager = new taskManager();
    
      const task = {
        id: 0, 
        name: 'firstName', 
        task: 'name', 
        description: 'some description',
        dueDate: '4/4/2020',
        assignedTo: 'some person',
        email: 'blahblah@email.com',
        status: 'TODO'
      };
      const expected = [task];

      // name, task, description, dueDate, assignedTo, email
      TaskManager.addTask('firstName', 'name', 'some description', '4/4/2020', 'some person', 'blahblah@email.com');
      const actual = TaskManager.tasks;
			assert.deepEqual(actual, expected);

    });
  });

  describe('getTaskById', () => {
    it('should get desired task in the task array by task id', () => {
      const TaskManager = new taskManager();
      
      TaskManager.addTask('firstName', 'name', 'some description', 'some person', '4/4/2020', 'blahblah@email.com');
      const expected = TaskManager.tasks[0];
      const actual = TaskManager.getTaskById(0);
      assert.deepEqual(actual, expected);
    });
  });
  
});