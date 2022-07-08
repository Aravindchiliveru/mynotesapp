import './App.css';
import NotesList from './components/NotesList';
import {nanoid} from "nanoid";
import Notes from './components/Notes';
import { useState } from 'react';
function App() {
    const [notes,setNotes] = useState([
        
    ]);

    const addTodos = (e) => {
        const timee = new Date();
        const newToDo = {
            time:timee.toLocaleDateString(),
            title:e.title,
            desc:e.description,
            key:nanoid(),
            duedate:e.duedate==undefined?"":e.duedate._d.toLocaleDateString(),
            tag:e.tag,
            status:e.status==undefined?'Open':e.status
        };
        const datanew = [...notes,newToDo];
        setNotes(datanew);
    };

    const delTodos = (rec) =>{
        const datanew = notes.filter((note)=>note.key !== rec.key)
        setNotes(datanew);
    }

    const editTodos = (rec) =>{
        const datanew = notes.map((todo)=>{if(todo.key == rec.key){
            return rec;
        }else{
            return todo;
        }})
        setNotes(datanew)
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO LIST APP</h1>
        <Notes handleAddNote={addTodos} />
        <NotesList notes={notes} delAddNote={delTodos} editNote={editTodos}/>
        <br /><br />
      <a href='https://aravind-portfolio.vercel.app/' target='__blank'><h3>By Chiliveru Aravind</h3></a>
      </header>
    </div>
  );
}

export default App;
