import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Alert1 = ({ variant,msg }) => {
  const [mode,setMode]=React.useState(true)
  setTimeout(() => {
    setMode(false);
  },1500)
  return (
  <>
    {
   mode && <Alert variant={variant}>
      {msg}
    </Alert>
    }
      </>
  );
};

export default Alert1;
