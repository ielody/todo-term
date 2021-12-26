const connection = require('mongowave')
//const extras = require('extras')
const prompt = require('prompt')
prompt.start()

async function run() {
  const db = await connection({ name: 'todo-term' })

  // const result = await db('todo').create({ name: 'hello' })
  // console.log(result)
  // const update = await db('todo').update({id:result.id},{author:'ingeborg', category: 5})
  // const todos = await db('todo').delete()
  // console.log(todos)
  while(true) {

    const cmdlist = [{'1': 'Show to do list'}, {'2': 'Add new task'}, {'3': 'Delete task'}, {'4': 'Change existing task', 'x': 'Exit application'}]
    const tasks = []

    console.log('1: Show to do list')
    console.log('2: Add new task')
    console.log('3: Delete task')
    console.log('4: Change existing task')
    console.log('x: Exit application')

    const { command } = await prompt.get(['command'])
    if(command === '1') {
      console.log("Your tasks:",tasks)
    }

    else if(command === '2') {
      console.log('Enter a new task:')
      const add = await db('todo').find({})
      console.log(add)
    }

    else if(command === '3') {
      console.log("Choose task to be deleted")
      const del = await db('todo').delete({})
      console.log(del)
    }

    else if(command === '4') {
      console.log("Choose task to update")
      const change = await db('todo').update({command}, {command})
      console.log(change)
    }

    else if(command === 'x') {
      console.log("Leaving app")
      process.exit(1)

    }

    else {
      console.log('command not found')
    }
  }


  async function showList() {

  }

  async function addNew() {

  }

  async function deleteTask() {

  }

  async function updateTask() {
    const change = await db('todo').update({command}, {command})

  }


}
run()
showList()
addNew()
deleteTask()
updateTask()
