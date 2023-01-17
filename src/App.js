import './App.css';
import { useState } from 'react';

function App() {

  //state your list of tasks. Tasks is a variable, and setTask is a function that will update the value of tasks
  const [tasks, setTask] = useState ([
    {id: 1, taskName: "Hoover", priority: "Medium Priority"},
    {id: 2, taskName: "Do a big shop", priority: "Low Priority"},
    {id: 3, taskName: "Dust", priority: "Low Priority"},
    {id: 4, taskName: "Sort my flippin' life out", priority: "High Priority"}
  ])

  //to display all of your tasks in a list, create a variable. The value of this variable is the result of using the 'map' method on your 'tasks'. This method takes in a variable, and for each variable (i.e. each item in our list) it will: return an HTML <li> item with the value of the taskName that exists for each item in the list.

  //'key' is a JSX word, telling React to add an ID for a new task as it is added to the list. If you don't specify which key to use, React will use the item's index in the array. Since we want to be able to change our arrays, however, this won't work as an item's index number will keep changing.

  //because the taskCompleted function takes in a variable, you have to put it into an anonymous function first, otherwise it'll just run when you load the page and you get stuck in the infinite loop.
  const tasksDisplayedInAListFormat = tasks.map ((task) => {
    return (
    <li key={task.id}>
      {task.taskName}
      <br></br>
      {task.priority}
      <button onClick={() => taskCompleted(task.id)}>Task Completed</button>
      </li>
    )
  })

  //if you want to add a new thing, you need to have a separate variable that new things can be saved into. This useState is a function that allows you to change the state of one bit of the page, rather than 
  const [whateverYouTypeInTheTextbox, setNewTask] = useState("")
  const [clickingARadioButton, setPriority] = useState("")

  //to add a new task, you first need to add an event listener to the thing that takes in a new task i.e. the text input box of the form below. Then you make a function that executes some code once the event you're listening to has happened. This function below has an event passed into it, and it then calls the setNewTask function. THIS function goes to the target of the event i.e. the HTML element where the event happened, and grabs whatever you typed in (it's value) and saves that in the variable you declared above.
  const functionThatHandlesStuffWhenYouTypeInTheTextbox = (evt) => {
    setNewTask(evt.target.value)
  }

  //the second part of adding a new task is to actually save it. To do this, you need to add an event listener again, this time for when the form has been submitted (once submitted the task is saved). 
  const functionThatSavesANewTask = (evt) => {
    //stops the page from refreshing and losing what we're trying to save
    evt.preventDefault()
    //we're creating a new task object - it must be the same data type as the tasks as defined above
    const newTask = {id: Date.now(), taskName: whateverYouTypeInTheTextbox, priority:clickingARadioButton}
    //now you need to make a copy of the original list (using the spread operator) and add the newTask to it.
    const newListofTasks = [...tasks, newTask]
    //the setTask function will change the state of the list 'tasks' and set it to be what is passed into it i.e. the newListOfTasks, as defined above
    setTask(newListofTasks)
    //this function below changes the value of whatever it is you typed into the text input box to whatever is passed into it. Here, an empty string. This essentially resets the text input box back to 'blank'.
    setNewTask("")
  }

  //to remove a task from the list, you will need a physical way for the user to do that, so need to add a button to the <li> element for each task, and an event listener that listens out for you clicking the button so as to remove the item.
  //you need a function that takes in a unique identifier for your task, so use its ID. 
  const taskCompleted = (id) => {
    //The filter() method is an iterative method. It calls a provided callbackFn function once for each element in an array, and constructs a new array of all the values for which callbackFn returns a truthy value. Array elements which do not pass the callbackFn test are not included in the new array.
    const listOfTasksWithSomeRemoved = tasks.filter((task) => task.id !== id)
    setTask(listOfTasksWithSomeRemoved)
  }

  const functionThatHandlesUserClickingARadioButton = (evt) => {
    setPriority(evt.target.value)
  }





  return (
    <div>
      <h1>My To-do List</h1>
      
      <form onSubmit={functionThatSavesANewTask}>
        <label htmlFor='add-task'>Add a New Task Here: </label>
        <input type='text' id='add-task' value={whateverYouTypeInTheTextbox} onChange={functionThatHandlesStuffWhenYouTypeInTheTextbox}></input>
        <label htmlFor='highPriority'>High Priority</label>
        <input type='radio' id='highPriority' name='priority' value='High Priority' onChange={functionThatHandlesUserClickingARadioButton}></input>
        <label htmlFor='regPriority'>Regular Priority</label>
        <input type='radio' id='regPriority' name='priority' value='Regular Priority' onChange={functionThatHandlesUserClickingARadioButton}></input>
        <label htmlFor='lowPriority'>Low Priority</label>
        <input type='radio' id='lowPriority' name='priority' value='Low Priority' onChange={functionThatHandlesUserClickingARadioButton}></input>
        <input id='saveButton' type='submit' value='Add Task'></input>
      </form>

      <ul>
        {tasksDisplayedInAListFormat}
      </ul>
    </div>
  );
}

export default App;
