import logo from './logo.svg';
import './App.css';
import { useState ,useEffect} from 'react'

function App() {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [currentindex, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption,setClickedOption]=useState(0);
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch(
      "https://the-trivia-api.com/v2/questions?categories=science_and_nature&limit=10&difficulty=easy"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setQuestions(res);
        setOptions(shuffle([...res[currentindex].incorrectAnswers, res[currentindex].correctAnswer]));

        
        })
  }
  function opt(){
    setOptions(shuffle([...questions[currentindex+1].incorrectAnswers, questions[currentindex+1].correctAnswer]));
  
 }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  function nextBtn(){
    if(currentindex < questions.length -1){
      updateScore()
    setIndex(currentindex + 1)
    opt()
  }}
  function updateScore(){
    if(clickedOption===questions[currentindex].correctAnswer){
      setScore(score+10);
  }
}

  return (
    <div>
      
      <p className='heading-txt'>Todo App</p>
      {questions.length ?
      <div className='container'>
      <div className='question'>
        <span id='question-number'>{currentindex +1 }</span>
        <span id='question-txt'>{questions[currentindex].question.text}</span>
      </div>
      <div className='option-container'>
        {options.map((item, index) => {
          return <button onClick={setClickedOption(index+1)} className='option-btn'>{item}</button>
        })}

      </div>
      <button onClick={nextBtn} id='next-button'>Next</button>
      </div> : <div>...Loading</div>}
    </div>
  );
}

export default App;
