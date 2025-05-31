import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Exercises</Button>
        <Button color="inherit" component={Link} to="/create">Create Exercise</Button>
        <Button color="inherit" component={Link} to="/user">Create User</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
