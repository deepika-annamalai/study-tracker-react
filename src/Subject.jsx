import { useState,useEffect } from "react";
import Progress from "./progress";

function Subject({
    id,
    name,
    hour,
    color,
    completed,
    createdAt,
    onDelete,
    onEdit,
    onHourChange,
    onComplete
}){
    const [isEditing,setIsEditing] = useState(false);
    const [newName,setNewName] = useState(name);

    useEffect(()=>{
        setNewName(name);
    },[name]);

    function getMessage(){
        if(hour===0)
            return "Start Studying😴";
        if (hour>6)
            return "Excellent🔥";
        if (hour>3)
            return "Good Progress!!😉"
        return "";
    }

    function handleSave(){
        if(newName.trim()==="") return;
        
        onEdit(id,newName);
        setIsEditing(false);
    }

    function progress(){
      if (hour===1)
        return 10;
      if (hour===2)
        return 20;
      if (hour===3)
        return 30;
      if (hour===4)
        return 40;
      if (hour===5)
        return 50;
      if (hour===6)
        return 60;
      if (hour===7)
        return 70;
      if (hour===8)
        return 80;
      if (hour===9)
        return 90;
      if (hour>=10)
        return 300;
      return 0;
    }
    return(
      <div style={{
          border: "2px solid gray",
          padding: "10px",
          marginTop: "20px",
          marginBottom: "20px",
          borderRadius: "8px",
          background:color,
          color:"black"
        }}>
          <Progress
            progress={progress()}
          />
              {isEditing ?(
                  <>
                    <input
                      value={newName}
                      onChange={(e)=> setNewName(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                  </>
              ):(<>
              <h2 style={{textDecoration:completed? "line-through":"none"}}>{name}</h2>
              <h2>({hour}) hrs [{createdAt}]</h2>
              </>)}

                  <button onClick={()=>onHourChange(id,hour+1)}>➕</button>

                  {hour>0 && (<button onClick={()=>onHourChange(id,hour-1)}>➖</button>)}

                  <button onClick={() =>onHourChange(id, 0)}>Reset ♻️</button>

                  <button onClick={() =>setIsEditing(true)}>Edit ✏️</button>

                  <button onClick={() => onDelete(id)}>Delete ❌</button>

                  <button 
                  onClick={()=>onComplete(id)}
                  disabled={completed}
                    >✔ Complete</button>

                  <p>Status: {completed?"Completed✅":"Pending⏳"}</p>
                  <h3>{getMessage()}</h3>
        </div>
  );
}

export default Subject;