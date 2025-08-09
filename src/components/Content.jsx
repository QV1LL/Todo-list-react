import { useEffect, useState } from "react";
import "./Content.css";
import UserTask from "../models/UserTask";

const BASE_URL = "http://192.168.1.105:5223";

const Content = () => {
  const [userTasks, setUserTasks] = useState([]);

  const [inputValue, setInputValue] = useState();
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/usertask`);

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        setUserTasks(data.map((item) => new UserTask(item.id, item.name)));
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchElements();
  }, []);

  const deleteElementByIndex = async (targetIndex) => {
    const taskToDelete = userTasks[targetIndex];
    const response = await fetch(
      `${BASE_URL}/api/usertask/${taskToDelete.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok)
      setUserTasks(userTasks.filter((_, index) => index !== targetIndex));
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
          onClick={async () => {
            if (inputValue.trim() !== "") {
              try {
                const response = await fetch(`${BASE_URL}/api/usertask`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ name: inputValue }),
                });

                if (!response.ok) throw new Error("Failed to create task");

                const createdTask = await response.json();

                setUserTasks((prev) => [
                  ...prev,
                  new UserTask(createdTask.id, createdTask.name),
                ]);
                setInputValue("");
              } catch (error) {
                console.error("Error adding task:", error);
              }
            }
          }}
          className="add-button"
        >
          Додати
        </button>
      </div>
      <div className="elements">
        {userTasks.map((element, index) => {
          return (
            <div className="card" key={index}>
              <p>- {element.name}</p>
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
