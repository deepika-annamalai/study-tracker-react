function Progress({progress}) {


  return (
    <div
      style={{
        width: "300px",
        height: "25px",
        backgroundColor: "#ddd",
        borderRadius: "20px",
        overflow: "hidden"
      }}
    >

      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "green"
        }}
      ></div>

    </div>
  );
}

export default Progress;