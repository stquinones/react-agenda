const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://tamarasquinones:${password}@cluster0.punuv.mongodb.net/agendaApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const agendaSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Agenda = mongoose.model('Agenda', agendaSchema)

/*const agenda = new Agenda({
  name: 'Bola Extrema',
  number: '4752-1224',
})*/

Agenda.find({}).then(result => {
    result.forEach(agenda => {
      console.log(agenda)
    })
    mongoose.connection.close()
})

/*agenda.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})*/