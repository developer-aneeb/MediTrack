import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const ProfileFormField = ({
  label,
  name,
  value,
  onChange,
  readOnly,
  as = 'input',
  type = 'text',
  rows,
  options,
  className,
  required = false
}) => {
  const inputProps = {
    name,
    value,
    onChange,
    readOnly,
    className,
    required,
  };

  return (
    <Form.Group controlId={name} className="mb-3">
      <Form.Label>{label}</Form.Label>
      {as === 'select' ? (
        <Form.Control as="select" {...inputProps} disabled={readOnly}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Control>
      ) : as === 'textarea' ? (
        <Form.Control as="textarea" rows={rows} {...inputProps} />
      ) : (
        <Form.Control type={type} {...inputProps} />
      )}
    </Form.Group>
  );
};

export default ProfileFormField; 