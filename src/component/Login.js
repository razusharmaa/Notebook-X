import React, { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate,Link } from 'react-router-dom';
import NoteContext from '../context/note/NoteContext'

const Login = ({alert}) => {

    const noteContext = useContext(NoteContext)
    const { getNote } = noteContext

    const navigation = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password }),
        });
        const json = await res.json();
        console.log(json);
        if(json.success) {
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('name', json.name);
            await getNote();  // Wait for the notes to be fetched
            navigation("/");
          }
          
        else {
            alert(json.error,"danger");
        }
    }

    return (
        <div className='container d-flex justify-content-center'>
        <Form style={{width:"85%"}} onSubmit={handleSubmit}>
            <h4 className="text-center">Login your account to use Notebook-X</h4>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button style={{width:"100%"}} variant="primary" type="submit">
                Sign in
            </Button>
            <p className='text-center my-1'>Do not have an account? <Link to="/signup" className='text-primary'>Sign up</Link></p>
        </Form>
        </div>
    )
}

export default Login;
