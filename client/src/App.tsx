import { io } from 'socket.io-client';
import Button from './Buton';
import { ChangeEvent, useState } from 'react';
import UserInput from './UserInput';
import Chats from './Chats';
import Login from './Login';
import useSocket from './useSocket';

const socket = io('ws://localhost:5001');

function App() {
  const {
    formData,
    joined,
    onInputChange,
    joinRoom,
    createRoom,
    Loading,
    setNotifcation,
    notification,
    copied,
    copyToClipboard,
    generateUniqueId,
    leaveRoom,
    Name,
  } = useSocket(socket);

  return (
    <div className="bg-[#EAEAEA]">
      {!joined ? (
        <Login
          formData={formData}
          Loading={Loading}
          onInputChange={onInputChange}
          joinRoom={joinRoom}
          createRoom={createRoom}
          copied={copied}
          copyToClipboard={copyToClipboard}
          generateUniqueId={generateUniqueId}
        />
      ) : (
        <Chats
          socket={socket}
          formData={formData}
          setNotifcation={setNotifcation}
          notification={notification}
          leaveRoom={leaveRoom}
          Name={Name}
        />
      )}
    </div>
  );
}

export default App;
