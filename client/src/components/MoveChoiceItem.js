import React from 'react';
import Form from 'react-bootstrap/Form';

const MoveChoiceItem = ({ operation, onChange, value, isInvalid, checked, disabled }) => {
  return (
    <Form.Group controlId={value}>
      <Form.Check type="radio" label={value}
        checked={checked}
        onChange={(e) => onChange({ value })}
        isInvalid={isInvalid}
        disabled={disabled}
        feedback={'Invalid number'}
      />
    </Form.Group>
  );
};

export default MoveChoiceItem;
