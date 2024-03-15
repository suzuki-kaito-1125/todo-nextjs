"use client";

import { useState } from "react";

export default function Todo() {
  const [todoText, setTodoText] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };
  const onClick = () => {
    setTodoText("");
  };

  return (
    <div className="p-4 space-y-2">
      <div>
        <h1 className="text-2xl">Todos</h1>
      </div>
      <div className="space-x-2">
        <input
          className="text-black p-2"
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChange}
        />
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={onClick}
        >
          input
        </button>
      </div>
      <div className="border-2 border-white rounded-lg p-4">
        <ul>
          <h2 className="text-xl">unmarked_todos</h2>
          <li>
            <p>Todo1</p>
          </li>
          <li>
            <p>Todo1</p>
          </li>
        </ul>
      </div>
      <div className="border-2 border-white rounded-lg p-4">
        <ul>
          <h2 className="text-xl">marked_todos</h2>
          <li>
            <p>Todo1</p>
          </li>
          <li>
            <p>Todo1</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
