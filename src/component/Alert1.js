import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

const Alert1 = ({ variant, msg }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="alert-container position-fixed top-0 w-100">
      {show && <Alert variant={variant}>{msg}</Alert>}
    </div>
  );
};

export default Alert1;
