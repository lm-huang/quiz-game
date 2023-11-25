/** @format */

function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2> 彩笔来做题吧</h2>
      <h2> 🤣 👇 🤣</h2>
      <h2>🤣👉 🤡 👈🤣</h2>
      <h2> 🤣 👆 🤣</h2>
      <h3>一共{numQuestions}题，看看你是不是小丑</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's go!{" "}
      </button>
    </div>
  );
}

export default StartScreen;
