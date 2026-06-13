import { useEffect, useState } from "react";

function Pomodoro() {
  const [time, setTime] =
    useState(25 * 60);

  const [isRunning, setIsRunning] =
    useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(()=>{
    if(time===0){
      setIsRunning(false);
      alert("finished");
    }
    else{
      console.log("nothing");
    }
  },[time]);


  function formatTime() {
    const minutes = Math.floor(time / 60);

    const seconds = time % 60;

    return `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }

  function handleReset() {
    setTime(25 * 60);
    setIsRunning(false);
  }

  return (
    <div
      style={{
        border: "2px solid tomato",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "40px",
        marginBottom: "40px"
      }}
    >
      <h1>🍅 Pomodoro Timer</h1>

      <h2>{formatTime()}</h2>

      {
        time===0&&(
          <h3>
            Session Completed!!
          </h3>
        )
      }
      <button
        onClick={() => setIsRunning(true)}
        disabled={time===0}
      >
        Start ▶️
      </button>

      <button
        onClick={() => setIsRunning(false)}
      >
        Pause ⏸️
      </button>

      <button onClick={handleReset}>
        Reset 🔄
      </button>

    </div>
  );
}

export default Pomodoro;