const connection = require('mongowave')
const { input } = require('extras')
//const extras = require('extras')
const prompt = require('prompt')
prompt.start()

async function run() {
  const db = await connection({ name: 'todo-term' })
    while(true) {

    console.log('1: Show to-do list')
    console.log('2: Add new task')
    console.log('3: Delete task')
    console.log('4: Change existing task')
    console.log('x: Exit application')

  const { command } = await prompt.get(['command'])
    if(command === '1') {
      console.log("Your tasks:")
    }

    else if(command === '2') {
      console.log('Enter a new task:')
    }

    else if(command === '3') {
      console.log("Choose task to be deleted")
    }

    else if(command === '4') {
      console.log("Choose task to update")
    }

    else if(command === 'x') {
      console.log("Leaving app")
      process.exit(1)
    }

    else {
      console.log('command not found')
    }
  }
}

run()

