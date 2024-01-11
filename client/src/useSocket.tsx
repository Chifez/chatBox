import { ChangeEvent, useState } from 'react';

const useSocket = (socket) => {
  const [formData, setFormData] = useState({
    Username: '',
    name: '',
    Room: '',
    avatar: '',
  });
  const [Loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [notification, setNotifcation] = useState('');
  const { Username, Room, name } = formData;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    }));
  };

  const joinRoom = async () => {
    setLoading(true);
    if (Username !== '' && Room !== '') {
      await socket.emit('join_room', Room);
    }
    setJoined(true);
    setLoading(false);
  };
  const createRoom = async () => {
    setLoading(true);
    if (Username !== '' && Room !== '' && name !== '') {
      await socket.emit('create_room', formData);
    }
    setJoined(true);
    setLoading(false);
  };
  return {
    formData,
    setFormData,
    setJoined,
    joined,
    onInputChange,
    joinRoom,
    Loading,
    setLoading,
    createRoom,
    notification,
    setNotifcation,
  };
};

export default useSocket;
