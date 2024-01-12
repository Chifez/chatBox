import { ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useSocket = (socket) => {
  const [formData, setFormData] = useState({
    Username: '',
    name: '',
    Room: '',
    avatar: '',
  });
  const [Loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [notification, setNotifcation] = useState([]);
  const [uniqueId, setUniqueId] = useState('');
  const [copied, setCopied] = useState(false);

  const { Username, Room, name } = formData;

  const generateUniqueId = () => {
    const newId = uuidv4().slice(0, 12);
    setFormData({
      ...formData,
      Room: newId,
    });
    setUniqueId(newId);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uniqueId);
    setCopied(true);
  };

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
      const data = {
        user: Username,
        room: Room,
      };
      await socket.emit('join_room', data);
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

  const leaveRoom = async () => {
    const data = {
      user: Username,
      room: Room,
    };
    await socket.emit('leave_room', data);
    setJoined(false);
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
    leaveRoom,
    generateUniqueId,
    copyToClipboard,
    copied,
  };
};

export default useSocket;
