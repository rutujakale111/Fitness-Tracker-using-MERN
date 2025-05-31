import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem } from '@mui/material';

function CreateExercise() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          setUsers(res.data.map(user => user.username));
          setUsername(res.data[0].username);
        }
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const onSubmit = async e => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration: Number(duration),
      date
    };

    try {
      const res = await axios.post('http://localhost:5000/exercises/add', exercise);
      console.log(res.data);
      window.location = '/';
    } catch (err) {
      console.error('Error creating exercise:', err);
      alert('Failed to create exercise, please try again.');
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/images/Brown Simple Minimalist Daily Exercise Youtube Thumbnail.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}
    >
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '12px',
        padding: '2rem',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        color: '#fff'  // make all text inside white
      }}>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Create New Exercise</h3>
        <form onSubmit={onSubmit}>
          <TextField
            select
            label="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
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
            required
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
          />

          <TextField
            label="Duration (min)"
            type="number"
            value={duration}
            onChange={e => setDuration(e.target.value)}
            fullWidth
            margin="normal"
            required
            inputProps={{ min: 0 }}
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
          />

          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true, style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff' } }}
            fullWidth
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '1rem' }}
          >
            Create Exercise
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateExercise;
