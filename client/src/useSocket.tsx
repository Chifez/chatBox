import { DefaultEventsMap } from '@socket.io/component-emitter';
import { ChangeEvent, useState } from 'react';
import { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const useSocket = (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
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
  const [error, setError] = useState('');

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
    if (!uniqueId) return;
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
    if (!Username || !Room) {
      setError('Incomplete details');
      setTimeout(() => {
        setError('');
      }, 1500);
      setLoading(false);
      return;
    }
    const data = {
      user: Username,
      room: Room,
    };
    await socket.emit('join_room', data);
    socket.emit('get_room_details', { roomId: Room });
    setJoined(true);
    setLoading(false);
  };

  const createRoom = async () => {
    setLoading(true);
    if (!Username || !Room || !name) {
      setError('Incomplete details');
      setTimeout(() => {
        setError('');
      }, 1500);
      setLoading(false);
      return;
    }
    const data = {
      user: Username,
      room: Room,
      name: name,
    };
    await socket.emit('create_room', data);
    socket.emit('get_room_details', { roomId: Room });

    setCopied(false);
    setJoined(true);
    setLoading(false);
  };

  const leaveRoom = async () => {
    const data = {
      user: Username,
      room: Room,
    };
    await socket.emit('leave_room', data);
    // setFormData({
    //   ...formData,
    //   Username: '',
    //   name: '',
    //   Room: '',
    // });
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
    error,
  };
};

export default useSocket;
