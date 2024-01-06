

// Option.js
function Option(props) {
    const { options, clickedOption, setClickedOption } = props;
  
    return (
      <div className="option-container">
        {options.map((item, index) => (
          <button
            className={`option-btn ${clickedOption === item ? "checked" : ""}`}
            onClick={() => setClickedOption(item)}
          >
            {item}
          </button>
))}
      </div>
    );
  }
  
  export default Option;


