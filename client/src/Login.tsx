import { io } from 'socket.io-client';
import Button from './Buton';
import { ChangeEvent, useState } from 'react';
import UserInput from './UserInput';
import Chats from './Chats';

const socket = io('ws://localhost:5001');

function Login({ formData, Loading, onInputChange, joinRoom, createRoom }) {
  const [tab, setTab] = useState('create');
  const { Username, Room, name } = formData;
  return (
    <section>
      <div className="w-full h-screen py-8 flex items-center justify-center ">
        <div className="w-[32vw] min-h-[40vh] flex flex-col bg-white rounded-lg py-2 ">
          <div className="flex justify-evenly">
            <button
              onClick={() => setTab('create')}
              className={`${
                tab === 'create' ? 'border-b-2 border-[#551FFF]' : ''
              }`}
            >
              Create Room
            </button>
            <button
              onClick={() => setTab('join')}
              className={`${
                tab === 'join' ? 'border-b-2 border-[#551FFF]' : ''
              }`}
            >
              Join Room
            </button>
          </div>
          {tab === 'create' ? (
            <>
              <header className="w-full flex justify-center py-4">
                <h1 className="font-semibold text-xl">Create Room</h1>
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
                    label="Room Name"
                    placeholder="Room name"
                    value={name}
                    name="name"
                    inputChange={onInputChange}
                    className=" rounded-lg w-full"
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
                <Button
                  className=" !text-sm p-3"
                  handleClick={createRoom}
                  isLoading={Loading}
                >
                  Create Room
                </Button>
              </div>
            </>
          ) : (
            <>
              <header className="w-full flex justify-center py-4">
                <h1 className="font-semibold text-xl">Join Room</h1>
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
                <Button
                  className=" !text-sm p-3"
                  handleClick={joinRoom}
                  isLoading={Loading}
                >
                  Join Room
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Login;
