import Button from './Buton';
import { useState } from 'react';
import UserInput from './UserInput';
import { GiCheckMark } from 'react-icons/gi';
import { MdContentCopy } from 'react-icons/md';

function Login({
  formData,
  Loading,
  onInputChange,
  joinRoom,
  createRoom,
  generateUniqueId,
  copyToClipboard,
  copied,
  error,
}: any) {
  const [tab, setTab] = useState('create');

  const { Username, Room, name } = formData;
  return (
    <section>
      <div className="w-full h-screen py-8 flex items-center justify-center px-4 md:px-0 ">
        <div className="w-full md:w-[32vw] min-h-[40vh] flex flex-col bg-white rounded-lg py-2 ">
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
                  <div className="relative flex items-center gap-2 mb-4">
                    <Button
                      handleClick={generateUniqueId}
                      children="Create ID"
                      className="!w-fit p-3 text-sm whitespace-nowrap"
                    ></Button>
                    <span className="relative  w-full">
                      <UserInput
                        label="Room ID"
                        placeholder="Room ID"
                        value={Room}
                        name="Room"
                        inputChange={onInputChange}
                        className=" rounded-lg w-full"
                        readonly={true}
                      />
                      <div
                        onClick={copyToClipboard}
                        className="absolute  right-4 top-[40%]  cursor-pointer"
                      >
                        {copied ? <GiCheckMark /> : <MdContentCopy />}
                      </div>
                    </span>
                    <p className="text-slate-500 absolute -bottom-6 right-0">
                      share this ID with your friends
                    </p>
                  </div>
                  <p className="text-sm text-red-300 text-left">{error}</p>
                </div>
                {/* <div className="flex flex-col justify-between gap-4 items-center mb-4">
                  <img
                    src=""
                    alt=""
                    className="w-16 h-16 border border-[#551FFF] rounded-full"
                  />
                  <span className="relative ">
                    <input type="file" className="absolute opacity-0" />
                    <Button className=" !text-sm p-3">Upload avatar</Button>
                  </span>
                </div> */}
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
                  <p className="text-sm text-red-300 text-left">{error}</p>
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
