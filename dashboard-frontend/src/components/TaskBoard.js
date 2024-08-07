import axios from 'axios';

import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Checkbox, TextField, Button, Box } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';


const TaskBoard = ({ showSnackbar }) => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');


  const snackBarMssg = (message, severity = 'error', redirectToPath = '') => {
    showSnackbar({
      message: message,
      severity: severity,
      autoHideDuration: 500,
      redirectToPath: redirectToPath
    });
  }


  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/get-tasks', { headers: { 'x-auth-token': token } });
      if (response?.data?.msg) throw new Error(response.data.msg);
      if (Array.isArray(response?.data)) {
        let tasksList = response?.data
        if (tasksList?.length) {
          tasksList = tasksList?.map(v => ({
            ...v,
            id: v._id
          }))
        }
        return setTasks(tasksList);
      }
      snackBarMssg('Task added successfully...', 'success')
    } catch (error) {
      console.error(`Error in adding task to db: ${error.message}`);
      // snackBarMssg(`Failed: ${error.message}`, 'error')
      let errorMssgFromApi = error?.response?.data?.msg
      if (errorMssgFromApi) {
        console.log('errorMssgFromApi to get tasks: ', errorMssgFromApi);
        if (errorMssgFromApi === "No token, authorization denied") {
          return snackBarMssg('Session expired', 'error', '/login');
        }
      }
      console.log('error', error);
    }
  }

  const saveTask = async (newTaskObj) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks/add-task', newTaskObj, { headers: { 'x-auth-token': token } });
      if (Array.isArray(response?.data)) {
        snackBarMssg('Task added successfully...', 'success')

      } else if (response?.data?.msg) {
        throw new Error(response.data.msg);
      }
    } catch (error) {
      console.error(`Error in adding task to db: ${error.message}`);
      // snackBarMssg(`Failed: ${error.message}`, 'error')
      let errorMssgFromApi = error?.response?.data?.msg
      if (errorMssgFromApi) {
        console.log('errorMssgFromApi to save task: ', errorMssgFromApi);
        if (errorMssgFromApi === "No token, authorization denied") {
          return snackBarMssg('Unauthorized user', 'error');
        }
      }
    }
  }

  const updateTask = async (taskObj) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/update/${taskObj._id}`,
        taskObj,
        { headers: { 'x-auth-token': token } }
      );

      if (Array.isArray(response?.data)) {
        snackBarMssg('Task added successfully...', 'success')
      } else if (response?.data?.msg) {
        throw new Error(response.data.msg);
      }

    } catch (error) {

      console.error(`Error in adding task to db: ${error.message}`);
      let errorMssgFromApi = error?.response?.data?.msg
      snackBarMssg(error.message, 'error');
      if (errorMssgFromApi) {
        console.log('errorMssgFromApi to save task: ', errorMssgFromApi);
        if (errorMssgFromApi === "No token, authorization denied") {
          return snackBarMssg('Unauthorized user', 'error');
        }
      }

    }
  }


  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        await fetchTasks();
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim() !== '') {
      try {
        const newTaskObj = { taskName: newTask, completed: false };
        await saveTask(newTaskObj);
        setTasks([...tasks, { ...newTaskObj, id: Date.now() }]);
        setNewTask('');
      } catch (error) {
        console.error('Failed to add task', error);
      }
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);

      const taskToUpdate = updatedTasks.find(task => task.id === id);
      await updateTask(taskToUpdate);
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  return (
    <Card sx={{ flexGrow: 1, p: 7 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Task Board
        </Typography>
        <Box display="flex" mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddTask} sx={{ ml: 1 }}>
            Add
          </Button>
        </Box>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} dense button onClick={() => handleToggleTask(task.id)}>
              <Checkbox
                edge="start"
                checked={task.completed}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={task.taskName} style={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TaskBoard;









// import React, { useState } from 'react';
// import { Card, CardContent, Typography, List, ListItem, ListItemText, Checkbox, TextField, Button, Box } from '@mui/material';

// const TaskBoard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');

//   const handleAddTask = () => {
//     if (newTask.trim() !== '') {
//       setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
//       setNewTask('');
//     }
//   };

//   const handleToggleTask = (id) => {
//     setTasks(tasks.map(task => 
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   return (
//     <Card sx={{ flexGrow: 1, p: 7 }}>
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           Task Board
//         </Typography>
//         <Box display="flex" mb={2}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Add a new task"
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//           />
//           <Button variant="contained" onClick={handleAddTask} sx={{ ml: 1 }}>
//             Add
//           </Button>
//         </Box>
//         <List>
//           {tasks.map((task) => (
//             <ListItem key={task.id} dense button onClick={() => handleToggleTask(task.id)}>
//               <Checkbox
//                 edge="start"
//                 checked={task.completed}
//                 tabIndex={-1}
//                 disableRipple
//               />
//               <ListItemText primary={task.text} style={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
//             </ListItem>
//           ))}
//         </List>
//       </CardContent>
//     </Card>
//   );
// };

// export default TaskBoard;