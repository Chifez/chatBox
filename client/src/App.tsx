import { io } from 'socket.io-client';
import Chats from './Chats';
import Login from './Login';
import useSocket from './useSocket';

const apiUrl =
  process.env.NODE_ENV !== 'development'
    ? process.env.REACT_APP_BASE_URL
    : 'localhost:5001';

const socket = io(apiUrl || 'localhost:5001');

function App() {
  const {
    formData,
    joined,
    onInputChange,
    selectFile,
    joinRoom,
    createRoom,
    Loading,
    copied,
    copyToClipboard,
    generateUniqueId,
    leaveRoom,
    error,
    updateUserName,
  } = useSocket(socket);

  return (
    <div className="bg-[#EAEAEA]">
      {!joined ? (
        <Login
          formData={formData}
          Loading={Loading}
          onInputChange={onInputChange}
          onSelectFile={selectFile}
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
          leaveRoom={leaveRoom}
          updateUserName={updateUserName}
        />
      )}
    </div>
  );
}

export default App;
