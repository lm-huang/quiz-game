/** @format */

function FinishScreen({ points, maxPossiblePoints, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        你得了<strong className="danger">{points}</strong>，满分
        <strong>{maxPossiblePoints}</strong>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        完成度{Math.ceil(percentage)}%，鉴定为：🤡
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        再来一把
      </button>
    </>
  );
}
export default FinishScreen;
