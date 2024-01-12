import { io } from 'socket.io-client';
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
    error,
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
          error={error}
        />
      ) : (
        <Chats
          socket={socket}
          formData={formData}
          setNotifcation={setNotifcation}
          notification={notification}
          leaveRoom={leaveRoom}
        />
      )}
    </div>
  );
}

export default App;
