import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import ToDoList from './components/ToDoList';
import { db } from './firebase';
import { FiEdit3 } from 'react-icons/fi';

const style = {
  bg: `h-screen w-screnn p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editMode, setEditMode] = useState({
    id: '',
    completed: false,
    edit: false,
  });

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnap) => {
      let todosDB = [];
      querySnap.forEach((el) => {
        todosDB.push({ ...el.data(), id: el.id });
      });
      setTodos(todosDB);
    });
    return () => unsubscribe();
  }, []);

  const toggleComplete = async (task) => {
    await updateDoc(doc(db, 'todos', task.id), {
      completed: !task.completed,
    });
  };

  const createTodo = async (todo) => {
    if (todo.trim().length <= 0) {
      setInput('');
      return global.alert('Type something');
    }
    await addDoc(collection(db, 'todos'), {
      text: todo.trim(),
      completed: false,
    });
    setInput('');
  };

  const editTodo = ({ id, text, completed }) => {
    setEditMode({
      id,
      completed,
      edit: true,
    });
    setInput(text);
  };

  const goEdit = async (text, id, completed) => {
    await updateDoc(doc(db, 'todos', id), {
      text,
      completed,
    });
    setEditMode({
      id: '',
      completed: false,
      edit: false,
    });
    setInput('');
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>To Do App - Firebase</h3>
        <form action='' className={style.form}>
          <input
            value={input}
            className={style.input}
            type='text'
            placeholder='Add task'
            onChange={({ target: { value } }) => setInput(value)}
          />
          <button
            className={style.button}
            type='button'
            onClick={() =>
              editMode.edit
                ? goEdit(input, editMode.id, editMode.completed)
                : createTodo(input)
            }
          >
            {editMode.edit ? (
              <FiEdit3 size={30} />
            ) : (
              <AiOutlinePlus size={30} />
            )}
          </button>
        </form>
        <ul>
          {todos.map((task) => (
            <ToDoList
              {...task}
              key={task.id}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </ul>
        {todos.length > 0 && (
          <p className={style.count}>
            {`You have ${todos.length} Todo${todos.length > 1 ? 's' : ''}`}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
