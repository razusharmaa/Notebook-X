import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate,Link } from 'react-router-dom';

const Signup = ({alert}) => {
  const navigation = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      alert("Passwords do not match","warning")
      return;
    }
    const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: firstName + ' ' + lastName, email, password }),
    });
    const json = await res.json();
    console.log(json);
    if(res.status === 200) {
      localStorage.setItem('token',json.authToken);
      navigation("/");
      alert("Id created successfully","success");
    }
    else {
      alert(json.error,"warning");
    }
  }
  
  return (
    <div className='container mt-4'>
          <h4 className='text-center'>Create an account to use Notebook-X</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Row>
            <Form.Label>Enter your Full Name</Form.Label>
            <Col>
              <Form.Control placeholder="First name" onChange={e => setFirstName(e.target.value)} />
            </Col>
            <Col>
              <Form.Control placeholder="Last name" onChange={e => setLastName(e.target.value)} />
            </Col>
          </Row>
        </Form.Group>
       
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="Password" minLength="5" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCPassword">
  <Form.Label>Confirm Password</Form.Label>
  <Form.Control type="password" placeholder="Password" minLength="5" onChange={e => setConfirmPassword(e.target.value)} />
</Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
       <Button style={{width:"100%"}} variant="primary" type="submit">
          Sign up
        </Button>
        <p className='text-center my-1'>Already have an account? <Link to="/login" className='text-primary'>Log in</Link></p>
      </Form>
    </div>
  )
}

export default Signup;
