/** @format */

function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <>
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
        className="start"
      />
      <div className="progress">
        <p>
          Question <strong>{index + 1}</strong>/{numQuestions}
        </p>
        <p>
          <strong>{points}</strong>/{maxPossiblePoints}
        </p>
      </div>
    </>
  );
}
export default Progress;
