import { useEffect, useState, useRef } from 'react';
import Button from './Buton';
import { SlOptionsVertical } from 'react-icons/sl';
import Modal from './Modal';
import DropDown from './dropDown';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chats = ({
  socket,
  formData,
  setNotifcation,
  notification,
  leaveRoom,
}: any) => {
  const [currentessage, setCurrentMessage] = useState('');
  const [messages, setMessageList] = useState([
    { id: '', author: '', message: '', date: '' },
  ]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [chatRoomName, setchatRoomName] = useState(formData.name);

  const { Username, name, avatar, Room } = formData;

  const handleOpenOption = () => {
    setIsOptionOpen(!isOptionOpen);
  };

  const handlecloseOption = () => {
    setIsOptionOpen(false);
  };

  const exitRoom = () => {
    leaveRoom();
    handlecloseOption();
  };

  const openModal = () => {
    handlecloseOption();
  };

  const optionlist = {
    optionList: [
      { title: 'Leave Room', callback: exitRoom },
      { title: 'Update profile', callback: openModal },
    ],
  };

  const getCurrentTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    const currentTime = new Date().toLocaleTimeString('en-US', options);
    return currentTime;
  };

  const handleMessageChange = (e: any) => {
    setCurrentMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (currentessage !== '') {
      const messageData = {
        id: socket.id,
        room: Room,
        author: Username,
        message: currentessage,
        date: getCurrentTime(),
      };
      await socket.emit('send_message', messageData);
      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage('');
    }
  };

  const handleReceiveMessage = (data: any) => {
    setMessageList((prev) => [...prev, data]);
    console.log('new message', messages);
  };

  const handleNotification = (data: any) => {
    setNotifcation((prev: any) => [...prev, data]);
  };

  const setRoomName = ({ roomName }: any) => {
    setchatRoomName(roomName);
  };
  useEffect(() => {
    socket.on('receive_message', handleReceiveMessage);
    socket.on('create_room', handleNotification);
    socket.on('join_room', handleNotification);
    socket.on('leave_room', handleNotification);
    socket.on('roomDetails', setRoomName);
    return () => {
      socket.off('receive_message', handleReceiveMessage);
      socket.off('create_room', handleNotification);
      socket.off('join_room', handleNotification);
      socket.off('leave_room', handleNotification);
      socket.off('roomDetails', setRoomName);
    };
  }, []);

  return (
    <section>
      <div className="w-full h-screen py-8 flex items-center justify-center px-4 md:px-0 ">
        <div className="w-full md:w-[40vw] h-[80vh] rounded-md border border-red-500">
          <div className="h-[10vh] w-full bg-[#551FFF] flex items-center justify-between px-2">
            <div className=" flex items-center gap-2">
              {/* <img
                src=""
                alt=""
                className="w-8 h-8 border border-red-500 rounded-full"
              /> */}
              <p className="text-white font-semibold">{chatRoomName}</p>
            </div>
            <div className="relative">
              <SlOptionsVertical
                onClick={handleOpenOption}
                className="cursor-pointer text-white"
              />
              <Modal
                isDropDown={true}
                openModal={isOptionOpen}
                onClose={handlecloseOption}
                extrastyle="absolute right-1 rounded-md z-50"
              >
                <DropDown list={optionlist} />
              </Modal>
            </div>
          </div>
          <div className="border border-green-500 flex-1 h-[60vh] overflow-scroll w-full flex flex-col p-5 scrollbar-hide">
            {notification &&
              notification.map((alert: string, idx: number) => (
                <p
                  className="text-xs text-center bg-yellow-100 rounded-full p-2 mb-2"
                  key={idx}
                >
                  {alert}
                </p>
              ))}
            {messages.map((item, idx) => (
              <div
                key={idx}
                className={`h-auto max-w-2xl py-3 my-1 ${
                  item.id === socket.id
                    ? 'mr-auto  bg-[#D9D9D9] rounded-t-xl rounded-br-xl pr-5 pl-2'
                    : 'ml-auto bg-[#E0F2FD] rounded-t-xl rounded-bl-xl pl-5 pr-2'
                }`}
              >
                <p
                  className={` font-semibold ${
                    item.id === socket.id ? 'text-[#8b6060]' : 'text-[#405f72]'
                  }`}
                >
                  {item.id === socket.id ? 'You' : item?.author}
                </p>
                <p>{item?.message}</p>
                <p className="text-[10px]">{item?.date}</p>
              </div>
            ))}
          </div>
          <div className="h-[10vh] flex items-center gap-4 px-2">
            <input
              type="text"
              value={currentessage}
              className="w-full bg-transparent p-3 border border-[#551FFF] rounded-md"
              onChange={handleMessageChange}
              onKeyDown={(event) => {
                event.key === 'Enter' && sendMessage();
              }}
            />
            <Button
              className="!text-sm py-3 px-4 w-fit flex-1"
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
