const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

let personas = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())


app.get('/', (request, response) => {
  response.send('<h1>Hola Mundo!</h1>')
})

app.get('/api/personas', (request, response) => {
    response.json(personas)
  })

app.get('/api/personas/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = personas.find(p => {
    return p.id === id
    })
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    /* response.json(note) */
}) 

app.get('/api/notes', (request, response) => {
    response.json(notes)
})  

app.get('/api/info', (request, response) => {
    const contadorPersonas = personas.length
    const date = new Date().toISOString()
    response.send(`<p>Agenda telefonica tiene info de ${contadorPersonas} personas<br/>${date}</p>`)
  })  

/*app.delete('/api/personas/:id', (request, response) => {
    const id = Number(request.params.id)
    const personToDelete = personas.find(p => p.id === id)
    if (personToDelete) {
      response.status(204).json({message: "Se borró"})
    } else {
      response.status(404).end()
    }
    // response.json(note) 
})*/

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const initialLength = personas.length;
  personas = personas.filter(p => p.id !== id); // Actualiza el arreglo global
  if (personas.length < initialLength) {
    response.status(200).json({ message: 'Se borró correctamente' });
  } else {
    response.status(404).json({ error: 'Persona no encontrada' });
  }
});

app.post('/api/persons', (request, response) =>{
  const person = request.body  /* person contiene los datos que se envian en el Json desde el REST client */
  if(!person || !person.name){
      return response.status(400).json({
          error: 'person.content esta vacio o no existe'
      })
  }
  const ids = personas.map(p => p.id)
  const maxId = Math.max (...ids)
  const newPerson = {
      id: maxId +1,
      name: person.name,
      number: person.number
  }
  personas = personas.concat(newPerson)
  response.json(person)
});


const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })  


