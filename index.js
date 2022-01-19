const connection = require('mongowave')
const { input } = require('extras')
const c = require('ansi-colors')


async function run() {
  const db = await connection({ name: 'todo-term' })
  await showTasks(db)
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
      console.log('Leaving app - see you soon!')
      process.exit(1)
    }

    else if(command === '5') {
      await markDone(db)
    }


    else {
      console.log(c.red('Command not found'))
    }
  }
}


function printMenu() {
  console.log(c.italic('\nChoose a number'))
  console.log(c.blue('1: Add new task'))
  console.log(c.blue('2: Show to-do list'))
  console.log(c.blue('3: Delete task'))
  console.log(c.blue('4: Change existing task'))
  console.log(c.blue('5: Mark task as done'))
  console.log(c.blue('x: Exit application\n'))

}


async function createTask(db) {
  console.log(c.italic('Enter a new task'))
  const task = await input()
  if(task.length > 1) {
    await db('todo').create({ task })
    console.log(task, 'was added to the list')
  } else {
    console.log(c.red('The text needs to be longer than 1 character'))
  }
}


async function showTasks(db) {
  console.log(c.italic('\nYour tasks:\n'))
  const todos = await db('todo').find()
  todos.forEach((todo, i) => {
  console.log(c.magenta(`${i + 1 + '.'} ${todo.task}`))
  })
}


async function deleteTask(db) {
//show list
  const todos = await db('todo').find()
  todos.forEach((todo, i) => {
  console.log(c.magenta(`${i + 1 + '.'} ${todo.task}`))
  })
  //input number
  console.log(c.italic('\nEnter task number(s) or "0" to delete all tasks'))
  var numbers = await input()
  numbers = numbers.split(',').map(x => x.trim())
  for (const number of numbers) {
    var index = parseInt(number) - 1
      var todo = todos[index]
        if (todo) {
          await db('todo').delete({ id: todo.id })
          console.log(todo.task, c.italic('has been deleted'))
         } else if (number === '0') {
          await db('todo').delete()
          console.log('All tasks have been deleted')
         } else {
          console.log(c.red('Invalid todo number'))
        }
      }
    }


async function updateTask(db) {
  //show list
  const todos = await db('todo').find()
  todos.forEach((todo, i) => {
  console.log(c.magenta(`${i + 1 + '.'} ${todo.task}`))
  })
  //input number
  console.log(c.italic('\nEnter the number of the task to update'))
  var number = await input()
  var index = parseInt(number) - 1
  var todo = todos[index]
  if (todo) {
    await db('todo').find({ id: todo.id })
    console.log(c.italic('Enter text to update task'))
  } else {
    console.log(c.red('Invalid todo number'))
  }
  //input text
  const text = await input()
  if (text.length > 1) {
    await db('todo').update({id: todo.id}, {task: text})
    console.log(c.italic('Changed task to', text))
  } else {
    console.log(c.red.bold('The text needs to be longer than 1 character'))
  }
}


async function markDone(db) {
  //show list
    const todos = await db('todo').find()
    todos.forEach((todo, i) => {
      console.log(`${i + 1 + '.'} ${todo.task}`)
    })
    //get task number
    console.log('\nWrite task number to mark as done')
    var numbers = await input()
    numbers = numbers.split(',').map(x => x.trim())
    for (const number of numbers) {
        var index = parseInt(number) - 1
        var todo = todos[index]
        todo.done = c.strikethrough(todo.task)
        if (todo.done) {
          await db('todo').update({id: todo.id}, {task: todo.done})
          console.log(c.strikethrough(todo.task))
          console.log('Tasks have been marked as done')
          } else {
         console.log(c.red('Invalid todo number'))
      }
    }
  }

run()
