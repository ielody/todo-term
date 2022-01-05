const connection = require('mongowave')
const { input } = require('extras')


async function run() {
  const db = await connection({ name: 'todo-term' })
  while(true) {
    printMenu()
    const command = await input()

    if(command === '1') {
      await createTask(db)
    }

    else if(command === '2') {
      await showTasks(db)
    }

    else if(command === '3') {
      await deleteTask(db)
    }

    else if(command === '4') {
      await updateTask(db)
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


function printMenu() {
  console.log('\nChoose a number')
  console.log('1: Add new task')
  console.log('2: Show to-do list')
  console.log('3: Delete task')
  console.log('4: Change existing task')
  console.log('x: Exit application\n')
}


async function createTask(db) {
  console.log('Enter a new task')
  const todo = await input()
  await db('todo').create({ todo })
}


async function showTasks(db) {
  console.log('\nYour tasks:\n')
  const todos = await db('todo').find()
  todos.forEach((todo, i) => {
  console.log(`${i + 1 + '.'} ${todo.task}`)
  })
}


async function deleteTask(db) {
//show list
  const todos = await db('todo').find()
  todos.forEach((todo, i) => {
  console.log(`${i + 1 + '.'} ${todo.task}`)
  })
  //input number
  console.log('\nEnter the number of the task to delete')
  var number = await input()
  var index = parseInt(number) - 1
  var todo = todos[index]
  if (todo) {
    await db('todo').delete({ id: todo.id })
    console.log(todo.task, 'has been deleted')
  } else {
    console.log('Invalid todo number')
  }
}


async function updateTask(db) {
  //show list
  const todos = await db('todo').find()
  todos.forEach((todo, i) => {
  console.log(`${i + 1 + '.'} ${todo.task}`)
  })
  //input number
  console.log('\nEnter the number of the task to update')
  var number = await input()
  var index = parseInt(number) - 1
  var todo = todos[index]
  await db('todo').find({ id: todo.id })

  //input text
  console.log('Enter text to update task')
  const text = await input()
  await db('todo').update({id: todo.id}, {task: text})
  console.log('changed task to', text)
}

run()
