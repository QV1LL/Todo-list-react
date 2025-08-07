import { useState } from "react";
import "./Content.css";

const Content = () => {
  const [elements, setElements] = useState([]);

  const [inputValue, setInputValue] = useState();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const deleteElementByIndex = (targetIndex) => {
    setElements(elements.filter((_, index) => index !== targetIndex));
  };

  return (
    <div className="content-layout">
      <div className="controls">
        <input
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isInputFocused ? "..." : "Введіть задачу..."}
          className="input-field"
        />
        <button
          onClick={() => {
            if (inputValue.trim() !== "") {
              setElements([...elements, inputValue]);
              setInputValue("");
            }
          }}
          className="add-button"
        >
          Додати
        </button>
      </div>
      <div className="elements">
        {elements.map((element, index) => {
          return (
            <div className="card" key={index}>
              <p>- {element}</p>
              <button
                onClick={() => deleteElementByIndex(index)}
                className="delete-button"
              >
                Готово
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
