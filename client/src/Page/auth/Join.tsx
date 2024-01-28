import Button from '../../component/Buton';
import Login from '../../component/Login';
import UserInput from '../../component/UserInput';

const Join = () => {
  return (
    <>
      <Login>
        <header className="w-full flex justify-center py-4">
          <h1 className="font-semibold text-xl">Join Room</h1>
        </header>
        <div className="flex-1 px-4">
          <div className="flex flex-col gap-4 py-2">
            <UserInput
              label="Username"
              placeholder="Your username"
              //   value={Username}
              name="Username"
              //   inputChange={onInputChange}
              className="rounded-lg w-full"
            />
            <UserInput
              label="Room ID"
              placeholder="Room ID"
              //   value={Room}
              name="Room"
              //   inputChange={onInputChange}
              className=" rounded-lg w-full"
            />
            {/* <p className="text-sm text-red-300 text-left">{error}</p> */}
          </div>
          <Button
            className=" !text-sm p-3"
            // handleClick={joinRoom}
            // isLoading={Loading}
          >
            Join Room
          </Button>
        </div>
      </Login>
    </>
  );
};

export default Join;
