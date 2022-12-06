import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  buttonContainer: `flex gap-2`,
  button: `cursor-pointer flex items-center`,
};

function ToDoList({
  text,
  completed = false,
  toggleComplete,
  id,
  deleteTodo,
  editTodo,
}) {
  return (
    <li className={completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          type='checkbox'
          name=''
          id={text}
          checked={completed}
          onChange={() => toggleComplete({ text, completed, id })}
        />
        <label
          className={completed ? style.textComplete : style.text}
          htmlFor={text}
        >
          {text}
        </label>
      </div>
      <div className={style.buttonContainer}>
        <button
          type='button'
          className={style.button}
          onClick={() => editTodo({ id, text, completed })}
        >
          <FiEdit />
        </button>
        <button
          type='button'
          className={style.button}
          onClick={() => deleteTodo(id)}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </li>
  );
}

export default ToDoList;
