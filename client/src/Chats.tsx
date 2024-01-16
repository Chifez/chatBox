import { useEffect, useState } from 'react';
import Button from './Buton';
import { SlOptionsVertical } from 'react-icons/sl';
import { BiCheckDouble } from 'react-icons/bi';
import Modal from './Modal';
import DropDown from './dropDown';
import { IoMdAttach } from 'react-icons/io';
import Image from './Image';
import ChatCard from './ChatCard';

const Chats = ({ socket, formData, leaveRoom, updateUserName }: any) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessageList] = useState([]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [chatRoomName, setchatRoomName] = useState(formData.name);
  const [file, setFile] = useState();
  const [typing, setIsTyping] = useState('');

  const { Username, name, avatar, Room } = formData;

  let isTypingTimeout;

  const handleExitRoom = () => {
    leaveRoom();
    setIsOptionOpen(false);
  };

  const handleOpenProfileModal = () => {
    updateUserName();
    setIsOptionOpen(false);
  };

  const optionlist = {
    optionList: [
      { title: 'Leave Room', callback: handleExitRoom },
      { title: 'Update profile', callback: handleOpenProfileModal },
    ],
  };

  const debounce = (func, delay) => {
    let timeoutId;

    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
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

  const sendTypingNotification = (isTyping: boolean) => {
    const typingData = {
      id: socket.id,
      author: Username,
      room: Room,
      isTyping,
    };

    socket.emit('typing', typingData);
  };

  const handleTypingChange = debounce(() => {
    sendTypingNotification(true);
  }, 500);

  const sendMessage = async () => {
    if (currentMessage !== '' || file !== '') {
      sendTypingNotification(false);
      setIsTyping('');
      const messageData = {
        id: socket.id,
        room: Room,
        author: Username,
        message: currentMessage,
        image: file,
        date: getCurrentTime(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((prev) => [...prev, { data: messageData }]);
      setCurrentMessage('');
      setFile('');
    }
    console.log(file);
  };

  const selectFile = (e: any) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleMessage = (data: any) => {
    if (data.type === 'alert') {
      setMessageList((prev) => [...prev, { notify: data.value }]);
    } else {
      setMessageList((prev) => [...prev, { data: data.value }]);
    }
  };

  const handleSetRoomName = ({ roomName }: any) => {
    setchatRoomName(roomName);
  };

  const handleTypingNotification = (data) => {
    console.log('someone is typing');
    setIsTyping(`${data.author} is typing...`);
    setTimeout(() => {
      setIsTyping('');
    }, 2000);
  };

  useEffect(() => {
    socket.on('receive_message', handleMessage);
    socket.on('notification', handleMessage);
    socket.on('typing', handleTypingNotification);
    socket.on('roomDetails', handleSetRoomName);
    return () => {
      socket.off('receive_message', handleMessage);
      socket.off('notification', handleMessage);
      socket.on('typing', handleTypingNotification);
      socket.off('roomDetails', handleSetRoomName);
    };
  }, []);

  return (
    <section>
      <div className="w-full h-screen py-8 flex items-center justify-center px-4 md:px-0 ">
        <div className="w-full md:w-[40vw] h-[80vh] rounded-lg overflow-hidden ">
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
                onClick={() => setIsOptionOpen(!isOptionOpen)}
                className="cursor-pointer text-white"
              />
              <Modal
                isDropDown={true}
                openModal={isOptionOpen}
                onClose={() => setIsOptionOpen(false)}
                extrastyle="absolute right-1 rounded-md z-50"
              >
                <DropDown list={optionlist} />
              </Modal>
            </div>
          </div>
          <div className="flex-1 h-[60vh] overflow-scroll w-full bg-slate-300 flex flex-col p-5 scrollbar-hide">
            {messages.map((item, idx) => (
              <ChatCard item={item} socket={socket} key={idx} />
            ))}
          </div>

          <div className="relative h-[10vh] bg-[#551FFF] flex items-center gap-2 px-2 py-2">
            {typing !== '' && (
              <p className="absolute left-2 -top-6 italic text-sm">{typing}</p>
            )}
            <div className="absolute left-1 px-1 ">
              <input
                onChange={selectFile}
                type="file"
                className="absolute w-full opacity-0"
              />
              <IoMdAttach className="w-7 h-7 " />
            </div>
            <input
              type="text"
              value={currentMessage}
              className="w-full h-full bg-white pl-8 p-3 border border-[#551FFF] rounded-lg outline-none"
              onChange={(e) => {
                handleMessageChange(e);
                handleTypingChange();
              }}
              onKeyDown={(event) => {
                event.key === 'Enter' && sendMessage();
              }}
            />
            <Button
              className="!text-sm py-3 px-4 w-fit h-full flex-1 text-center flex items-center justify-center border"
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
