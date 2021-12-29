const connection = require('mongowave')
const { input } = require('extras')
const extras = require('extras')

async function run() {
  const db = await connection({ name: 'todo-term' })
    while(true) {

    console.log('1: Add new task')
    console.log('2: Show to-do list')
    console.log('3: Delete task')
    console.log('4: Change existing task')
    console.log('x: Exit application')

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
      console.log('Change existing task')
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
  console.log('Please enter a new task')
  const task = await input()
  await db('todo-term').create({ task })
  run()
  }

async function showTasks(db) {
  console.log('Your tasks:')
  const result = await db('todo-term').find()
  console.log(result)
  run()
}

// async function deleteTask() {
//   const db = await connection({ name: 'todo-term' })
//   showTasks()
//   const task = await input()
//   console.log('Enter name of task to be deleted')
//   const result = await db('todo-term').delete({ task })
//   console.log("Number of tasks deleted" + result)
//   run()
//}

run()