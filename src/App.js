import './App.css';
import NotesList from './components/NotesList';
import {nanoid} from "nanoid";
import Notes from './components/Notes';
import { useState } from 'react';
function App() {
    const [notes,setNotes] = useState([
        {
            time:"time1",
            title:"gas",
            desc:"description1",
            key:"1",
            duedate:"duetime1",
            tag:"tag1",
            status:"Done"
        },
        {
            time:"time2",
            title:"water",
            desc:"description2",
            key:"2",
            duedate:"duetime2",
            tag:"tag2",
            status:"Done"
        },
        {
            time:"time3",
            title:"study",
            desc:"description3",
            key:"3",
            duedate:"duetime3",
            tag:"tag3",
            status:"Working"
        }
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
      </header>
    </div>
  );
}

export default App;
