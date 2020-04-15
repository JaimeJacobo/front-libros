import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [newBook, updateNewBook] = useState({
    titulo: '',
    autor: '',
    año: '',
    editorial: '',
    genero: ''
  })

  const [allBooks, updateAllBooks] = useState([])

  const [bookToDelete, updateBookToDelete] = useState('')

  //Funcion encargada de enviar la peticion POST a nuestro API en heroku y de esta forma crear un nuevo libro
  const submitBook = async (event)=>{

    event.preventDefault()

    await fetch('https://backend-libros.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo: newBook.titulo,
        autor: newBook.autor,
        año: newBook.año,
        editorial: newBook.editorial,
        genero: newBook.genero
      })
    })

    getAllBooks();
  }

  const deleteBook = async (event)=>{
    event.preventDefault()

    await fetch(`https://backend-libros.herokuapp.com/${bookToDelete}`, {
      method: 'DELETE'
    })

    getAllBooks();
  }

  const getAllBooks = ()=>{
    fetch('https://backend-libros.herokuapp.com/')
    .then((data)=>{
      return data.json()
    })
    .then((dataJSON)=>{
      updateAllBooks(dataJSON.reverse())
    })
  }

  //Simulacion de component did mount. Use Effect se activa SIEMPRE una vez al renderizarse la página. No se va a volver a activar hasta que detecte un camgio en el segudno argumento. En este caso, como el segunto argumento es un array vacīo, este useEffect no se va a volver a ejecutar nunca más.
  useEffect(()=>{
    getAllBooks();
  }, [])

  return (
    <div className="App">
      <h1>Mis libros</h1>
      <form onSubmit={(event)=>submitBook(event)}>

        <label htmlFor="titulo">Titulo</label>
        <input type="text" id="titulo" name="titulo" onChange={(event)=>updateNewBook({...newBook, titulo: event.target.value})}/>

        <br />

        <label htmlFor="autor">Autor</label>
        <input type="text" id="autor" name="autor" onChange={(event)=>updateNewBook({...newBook, autor: event.target.value})}/>

        <br />

        <label htmlFor="año">Año</label>
        <input type="number" id="año" name="año" onChange={(event)=>updateNewBook({...newBook, año: event.target.value})}/>

        <br />

        <label htmlFor="editorial">Editorial</label>
        <input type="text" id="editorial" name="editorial" onChange={(event)=>updateNewBook({...newBook, editorial: event.target.value})}/>

        <br />

        <label htmlFor="genero">Genero</label>
        <input type="text" id="genero" name="genero" onChange={(event)=>updateNewBook({...newBook, genero: event.target.value})}/>

        <br />

        <button type="submit">CREAR LIBRO</button>

      </form>
      <div id="todosLosLibros">
        {
          allBooks.map((book, index)=>{
            return <div key={index}><p>{book.titulo}</p></div>
          })
        }
      </div>
      <form onSubmit={(event)=>deleteBook(event)}>

        <label htmlFor="titulo">Busca un libro y eliminalo</label>
        <input type="text" id="titulo" name="titulo" onChange={(event)=>updateBookToDelete(event.target.value)}/> 

        <button type="submit">BUSCAR Y ELIMINAR</button>

      </form>
    </div>
  );
}

export default App;
