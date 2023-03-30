import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function TextControlsExample() {

const [impression, setImpressions] = useState('')

const handleChange = (e) => {
  setImpressions(e.target.value);
}

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>所感</Form.Label>
        <input type="textarea" value={impression} onChange={handleChange} />
      </Form.Group>
    </Form>
  );
}

export default TextControlsExample;