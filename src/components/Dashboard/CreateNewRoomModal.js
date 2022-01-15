/* eslint-disable react/function-component-definition */
import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import firebase from 'firebase/app';
import { useModalToggle } from '../../misc/custom-hooks';
import { database } from '../../misc/Firebase';

const { StringType } = Schema.Types;

const SchemaModal = Schema.Model({
  name: StringType().isRequired('Chat name is Required'),
  desription: StringType().isRequired('Description is Required'),
});

const INITIAL_FORM = {
  name: '',
  desription: '',
};

const CreateNewRoomModal = () => {
  const { isOpen, Open, close } = useModalToggle();
  const [FormValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);
  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }
    setIsLoading(true);
    const newRoomData = {
      ...FormValue,
      CreatedAt: firebase.database.ServerValue.TIMESTAMP,
    };
    try {
      await database.ref('rooms').push(newRoomData);
      Alert.success(`${FormValue.name} room has been created`);
      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 3000);
    }
  };
  return (
    <div className="mt-1">
      <Button block color="green" onClick={Open}>
        <Icon icon="creative" /> Create New Chat Room
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>Add New Room Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            formValue={FormValue}
            onChange={onFormChange}
            model={SchemaModal}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl name="name" placeholder="Enter new Room name..." />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                name="desription"
                placeholder="Enter room Desription..."
                componentClass="textarea"
                rows={5}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create New Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateNewRoomModal;
