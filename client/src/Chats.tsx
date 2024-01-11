import { useState } from 'react';
import Button from './Buton';

const Chats = ({ socket, formData }) => {
  const [currentessage, setCurrentMessage] = useState('');
  const { Username, Room } = formData;
  // const getCurrentTime = ()=>{
  // const options = {hour:'numeric', minute:'2-digit', hour12:true};
  // const currentTime =  new Date().toLocaleTimeString('en-US',options)
  // return currentTime
  // }
  const handleMessageChange = (e: any) => {
    setCurrentMessage(e.target.value);
  };
  const sendMessage = async () => {
    if (currentessage !== '') {
      const messageData = {
        room: Room,
        author: Username,
        message: currentessage,
        date:
          new Date(Date.now()).getHours() +
          `:` +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('send_message', messageData);
    }
  };
  return (
    <section>
      <div className="w-full h-screen py-8 flex items-center justify-center ">
        <div className="w-[40vw] h-[80vh] rounded-md border border-red-500">
          <div className="h-[10vh] w-full bg-[#551FFF] flex items-center gap-4 px-2">
            <img
              src=""
              alt=""
              className="w-8 h-8 border border-red-500 rounded-full"
            />
            <p className="text-white font-semibold">{Username}</p>
          </div>
          <div className="flex-1 h-[60vh] overflow-scroll w-full"></div>
          <div className="h-[10vh] flex items-center gap-4 px-2">
            <input
              type="text"
              className="w-full bg-transparent p-3 border border-[#551FFF] rounded-md"
              onChange={handleMessageChange}
            />
            <Button
              className="!text-sm  px-4 py-3 w-fit"
              handleClick={sendMessage}
            >
              send
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chats;
