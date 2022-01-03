const connection = require('mongowave')
const { input } = require('extras')


async function run() {
  const db = await connection({ name: 'todo-term' })
    while(true) {

    console.log('1: Add new task')
    console.log('2: Show to-do list')
    console.log('3: Delete task')
    console.log('4: Change existing task')
    console.log('x: Exit application')
    console.log('')

  const command = await input()

    if(command === '1') {
      createTask(db)
    }

    else if(command === '2') {
      showTasks(db)
    }

    else if(command === '3') {
      deleteTask(db)
    }

    else if(command === '4') {
      updateTask(db)
    }

    else if(command === 'x') {
      console.log('Leaving app')
      process.exit(1)
    }

    else {
      console.log('Command not found')
    }
  }
}

async function createTask(db) {
  const task = await input()
  await db('todo').create({ task })
  console.log('Please enter a new task')
  }

async function showTasks(db) {
  console.log('Your tasks:')
  const todos = await db('todo').find()

  todos.forEach((todo, i) => {
  console.log(`${i + 1 + '.'} ${todo.task}`)
  })

  console.log(' ')
  console.log("What do you want to do next?")
}

async function deleteTask(db) {

  //show list
  const todos = await db('todo').find()
  todos.forEach((todo, i) => {
  console.log(`${i + 1 + '.'} ${todo.task}`)
  })

  //input
  console.log(' ')
  console.log('Enter the number of the task to delete')
  var number = await input()
  var index = parseInt(number) - 1
  var task = todos[index]
  await db('todo').delete({ id: task.id })
  console.log(task.task, 'has been deleted')
}

async function updateTask(db) {
  //show list
  const todos = await db('todo').find()
  todos.forEach((todo, i) => {
  console.log(`${i + 1 + '.'} ${todo.task}`)
  })

  //input
  console.log(' ')
  console.log('Enter the number of the task to update')
  var number = await input()
  var index = parseInt(number) - 1
  var task = todos[index]
  await db('todo').find({ id: task.id })
  console.log('Change existing task')

}

run()
