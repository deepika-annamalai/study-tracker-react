import { useState,useEffect } from "react";
import Pomodoro from "./Pomodoro";
import Subject from "./Subject";

function App(){
    const [subjects,setSubjects]=useState(()=>{
        const savedSubjects=localStorage.getItem("subjects");
        return savedSubjects ? JSON.parse(savedSubjects):[];
    });

    const [inputGoal,setInputGoal]=useState("");
    const [goal,setGoal]=useState(()=>{
        const savedGoal=localStorage.getItem("goal");
        return savedGoal ? JSON.parse(savedGoal):"";
    });

    const [color,setColor]=useState("#ff0000");

    useEffect(()=>{
        localStorage.setItem("goal",JSON.stringify(goal))
},[goal]);

    const [newSubject,setNewSubject]=useState("");

    function handleAdd(){
        if(newSubject.trim()==="") return;

        setSubjects([...subjects,
            {
                id:Date.now(),
                name:newSubject,
                hour:0,
                color:color,
                completed:false,
                createdAt:new Date().toLocaleDateString()
            }
        ]);
        setNewSubject(""),setColor("#000000");
    }

    function handleDelete(id){
        setSubjects(subjects.filter((sub)=>
            sub.id!==id
    ));
    }

    function handleEdit(id,newName){
        setSubjects(subjects.map((sub)=>
            sub.id===id ? 
              {
                ...sub,
                name:newName
              }
            :sub
        ));
    }

    function handleHourChange(id,newHour){
        setSubjects(
            subjects.map((sub)=>
              sub.id===id 
                ?{...sub,hour:newHour}
                : sub
            )
        );
    }

    function handleComplete(id) {
        setSubjects(
            subjects.map((sub) =>
            sub.id === id
                ? { ...sub, completed: true }
                : sub
            )
        );
    }

    function handleSet(){
        console.log("inputGoal =",inputGoal);
        setGoal(inputGoal);
        setInputGoal("");
    }

    useEffect(()=>{
        localStorage.setItem("subjects",JSON.stringify(subjects));
    },[subjects]);

    return(
        <div>
            <h1>STUDY TRACKER 📚</h1>
            <input type="text" value={inputGoal} placeholder="Today's Goal" onChange={(e)=>setInputGoal(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&handleSet()}/>
            <button onClick={handleSet}>Set</button>

            <h3>Today's Goal: {goal}</h3>
            <input type="text" value={newSubject} onChange={(e)=> setNewSubject(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&handleAdd()} placeholder="Enter Subject"/>
            <button onClick={handleAdd}>Add</button>

            <input type="color" value={color} onChange={(e)=>setColor(e.target.value)}/>

            <Pomodoro/>

            {subjects.map((sub)=>(
                <Subject
                  key={sub.id}
                  id={sub.id}
                  name={sub.name}
                  hour={sub.hour}
                  color={sub.color}
                  completed={sub.completed}
                  createdAt={sub.createdAt}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onHourChange={handleHourChange}
                  onComplete={handleComplete}
                  />
            ))}

        </div>
        
    )
}
export default App;