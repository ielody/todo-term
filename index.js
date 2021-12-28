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
      createTask()
    }

    else if(command === '2') {
    }

    else if(command === '3') {
      console.log('Choose task to be deleted')
    }

    else if(command === '4') {
      console.log('Mark task as complete')
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

  async function createTask() {
    const db = await connection({ name: 'todo-term' })
    console.log('Please enter a new task')
    const task = await input()
    await db('todo').create({ task })
    run()
    //printMenu()
  }

run()

