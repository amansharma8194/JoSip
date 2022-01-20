/* eslint-disable react/function-component-definition */
import React from 'react';
import { useParams } from 'react-router';
import { Alert, Button, Drawer } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { useMediaQuery, useModalToggle } from '../../../misc/custom-hooks';
import { database } from '../../../misc/Firebase';
import EditableInput from '../../EditableInput';

const EditRoomBtnDrawer = () => {
  const { isOpen, Open, close } = useModalToggle();
  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);
  const { chatId } = useParams();
  const isMobile = useMediaQuery('(max-width:992px)');
  const upDateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.success('Succesfully updated', 3000);
      })
      .catch(err => {
        Alert.error(err.message, 3000);
      });
  };
  const onNameSave = newName => {
    upDateData('name', newName);
  };
  const onDescriptionSave = newDescription => {
    upDateData('description', newDescription);
  };

  return (
    <div>
      <Button className="br-circle" size="sm" color="red" onClick={Open}>
        A
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close}>
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            initialvalue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            EmptyMsg="Name can not be Empty"
          />
          <EditableInput
            componentClass="textarea"
            rows={5}
            initialvalue={description}
            onSave={onDescriptionSave}
            label={<h6 className="padded">Description</h6>}
            EmptyMsg="Description can not be Empty"
            WrapperClass="mt-3"
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default EditRoomBtnDrawer;
