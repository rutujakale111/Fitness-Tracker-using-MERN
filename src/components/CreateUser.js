import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

function CreateUser() {
    const [username, setUsername] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const user = { username };

        try {
            const res = await axios.post('http://localhost:5000/users/add', user);
            console.log(res.data);
            alert('User created successfully!');
            setUsername('');
        } catch (err) {
            const message = err.response ? err.response.data : err.message;
            console.error('Error:', message);
            alert(`Failed to create user: ${message}`);
        }
    };

    return (
        <div
            style={{
                backgroundImage: 'url("/images/Soft Minimalist Quote Instagram Story (1).png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div style={{
                borderRadius: '12px',
                padding: '2rem',
                width: '100%',
                maxWidth: '400px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                textAlign: 'center',
            }}>
                <h3>Create New User</h3>
                <form onSubmit={onSubmit}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                        inputProps={{ minLength: 3 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '1rem' }}
                    >
                        Create User
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
