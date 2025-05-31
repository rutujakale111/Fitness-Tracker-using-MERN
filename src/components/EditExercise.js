import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem } from '@mui/material';

function EditExercise() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/exercises/${id}`)
      .then(res => {
        setUsername(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(res.data.date.slice(0, 10));
      });

    axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          setUsers(res.data.map(user => user.username));
        }
      });
  }, [id]);

  const onSubmit = e => {
    e.preventDefault();
    const exercise = { username, description, duration, date };
    axios.post(`http://localhost:5000/exercises/update/${id}`, exercise)
      .then(res => console.log(res.data));
    navigate('/');
  };

  return (
    <div>
      <h3>Edit Exercise</h3>
      <form onSubmit={onSubmit}>
        <TextField
          select
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        >
          {users.map(user => (
            <MenuItem key={user} value={user}>{user}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration (min)"
          type="number"
          value={duration}
          onChange={e => setDuration(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Update Exercise</Button>
      </form>
    </div>
  );
}

export default EditExercise;
