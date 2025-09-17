import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, completed, deleted

  const addTask = () => {
    if (input.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      deleted: false,
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, completed: !task.completed} : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, deleted: true} : task
      )
    );
  };

  const restoreTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, deleted: false} : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return !task.deleted;
    if (filter === 'pending') return !task.completed && !task.deleted;
    if (filter === 'completed') return task.completed && !task.deleted;
    if (filter === 'deleted') return task.deleted;
    return true;
  });

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All Tasks</button>
        <button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'active' : ''}>Pending Tasks</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed Tasks</button>
        <button onClick={() => setFilter('deleted')} className={filter === 'deleted' ? 'active' : ''}>Deleted Tasks</button>
      </div>
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className={`${task.completed ? 'completed' : ''} ${task.deleted ? 'deleted' : ''}`}>
            <span>{task.text}</span>
            {!task.deleted && (
              <>
                {!task.completed && (
                  <button className="complete-btn" onClick={() => toggleComplete(task.id)}>Complete</button>
                )}
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
            {task.deleted && (
              <button className="restore-btn" onClick={() => restoreTask(task.id)}>Restore</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
