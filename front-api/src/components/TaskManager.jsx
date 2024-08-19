// TaskManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskManager.css'; // Importa el archivo CSS para los estilos

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/task');
        setTasks(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTaskTitle) return;
    try {
      const response = await axios.post('http://localhost:3000/api/task', { title: newTaskTitle, completed: false });
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTask = async (id, updatedTitle) => {
    try {
      await axios.put(`http://localhost:3000/api/task/${id}`, { title: updatedTitle });
      setTasks(tasks.map(task => (task.id === id ? { ...task, title: updatedTitle } : task)));
      setEditingTask(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/task/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleCompletion = async (id, completed) => {
    try {
      await axios.put(`http://localhost:3000/api/task/${id}`, { completed: !completed });
      setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !completed } : task)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New Task Title"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <div className="task-info">
              {editingTask === task.id ? (
                <input
                  type="text"
                  defaultValue={task.title}
                  onBlur={(e) => handleUpdateTask(task.id, e.target.value)}
                />
              ) : (
                <span className={task.completed ? 'completed' : ''}>{task.title}</span>
              )}
              <span className="task-dates">
                Id: {task.id}<br />
                Title: {task.title}<br />
                Created At: {new Date(task.createdAt).toLocaleDateString()}<br />
                Updated At: {new Date(task.updatedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="task-actions">
              <button onClick={() => setEditingTask(task.id)}>Edit</button>
              <button onClick={() => handleToggleCompletion(task.id, task.completed)}>
                {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
