import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function ExerciseList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then(response => setExercises(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteExercise = (id) => {
    axios.delete(`http://localhost:5000/exercises/${id}`)
      .then(() => {
        setExercises(exercises.filter(ex => ex._id !== id));
      });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: "100vh",
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src="/videos/Dark Blue Illustration Exercise Motivation Mobile Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
        <h3 style={{ color: 'white' }}>Logged Exercises</h3>

        <Paper sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', padding: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Username</TableCell>
                <TableCell sx={{ color: 'white' }}>Description</TableCell>
                <TableCell sx={{ color: 'white' }}>Duration</TableCell>
                <TableCell sx={{ color: 'white' }}>Date</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exercises.map(ex => (
                <TableRow key={ex._id}>
                  <TableCell sx={{ color: 'white' }}>{ex.username}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{ex.description}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{ex.duration}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{new Date(ex.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/edit/${ex._id}`}
                      variant="outlined"
                      sx={{ color: 'white', borderColor: 'white', marginRight: '8px' }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteExercise(ex._id)}
                      variant="outlined"
                      color="error"
                      sx={{ color: 'white', borderColor: 'white' }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

export default ExerciseList;
