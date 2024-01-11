import { io } from 'socket.io-client';
import Button from './Buton';
import { ChangeEvent, useState } from 'react';
import UserInput from './UserInput';
import Chats from './Chats';

const socket = io('ws://localhost:5001');

function App() {
  const [formData, setFormData] = useState({
    Username: '',
    Room: '',
  });
  const { Username, Room } = formData;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    }));
  };

  const joinRoom = () => {
    if (Username !== '' && Room !== '') {
      socket.emit('join_room', Room);
    }
    console.log(Room, Username, 'clicked');
  };
  return (
    <div className="bg-[#EAEAEA]">
      <section>
        <div className="w-full h-screen py-8 flex items-center justify-center ">
          <div className="w-[32vw] min-h-[40vh] flex flex-col bg-white rounded-lg py-2 ">
            <header className="w-full flex justify-center pb-4">
              <h1 className="font-semibold text-xl">Log in to chat</h1>
            </header>
            <div className="flex-1 px-4">
              <div className="flex flex-col gap-4 py-2">
                <UserInput
                  label="Username"
                  placeholder="Your username"
                  value={Username}
                  name="Username"
                  inputChange={onInputChange}
                  className="rounded-lg w-full"
                />
                <UserInput
                  label="Room ID"
                  placeholder="Room ID"
                  value={Room}
                  name="Room"
                  inputChange={onInputChange}
                  className=" rounded-lg w-full"
                />
              </div>
              <div className="flex flex-col justify-between gap-4 items-center mb-4">
                <img
                  src=""
                  alt=""
                  className="w-16 h-16 border border-[#551FFF] rounded-full"
                />
                <span className="relative ">
                  <input type="file" className="absolute opacity-0" />
                  <Button className=" !text-sm p-3">Upload avatar</Button>
                </span>
              </div>
              <Button className=" !text-sm p-3" handleClick={joinRoom}>
                Join Room
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Chats socket={socket} formData={formData} />
    </div>
  );
}

export default App;
