/* eslint-disable react/function-component-definition */
import React, { useCallback, useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';

const EditableInput = ({
  initialvalue,
  label = 'null',
  onSave,
  placeholder = 'Enter your value',
  EmptyMsg = 'Input is Empty',
  WrapperClass = '',
  ...inputProps
}) => {
  const [input, setInput] = useState(initialvalue);
  const [isEditable, setIsEditable] = useState(false);
  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);
  const onEditClick = useCallback(() => {
    setIsEditable(p => !p);
    setInput(initialvalue);
  }, [initialvalue]);
  const onSaveClick = async () => {
    const trimmed = input.trim();
    if (trimmed === '') {
      Alert(EmptyMsg, 3000);
    }
    if (trimmed !== initialvalue) {
      await onSave(trimmed);
    }
    setIsEditable(false);
  };
  return (
    <div className={WrapperClass}>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditable}
          value={input}
          placeholder={placeholder}
          onChange={onInputChange}
          autoComplete="off"
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? 'close' : 'edit2'} />
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
