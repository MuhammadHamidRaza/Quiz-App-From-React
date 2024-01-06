

function Question(props) {
  console.log(props.questions[props.currentindex].question.text);

  const { currentindex, questions } = props;

  return (
    <div className="question">
      <span id="question-number">{currentindex + 1}</span>
      <span id="question-txt">{questions[currentindex].question.text}</span>
    </div>
  );
}

export default Question;
