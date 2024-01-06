
function Score(props) {
    const { score, questions, restart } = props;
  
    return (
      <>
        <div className="show-score">
          Your Score: {score}
          <br />
          Total Score: {questions.length * 10}
        </div>
        <button id="next-button" onClick={restart}>
          Restart
        </button>
      </>
    );
  }
  
  export default Score;
  