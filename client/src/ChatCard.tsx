import React from 'react';
import Image from './Image';
import { BiCheckDouble } from 'react-icons/bi';

const ChatCard = ({ item, socket }) => {
  const getImageBlob = (img) => {
    if (img) {
      const mimeType = 'image/png'; // or 'image/png' for PNG
      const imageBlob = new Blob([img], { type: mimeType });
      return imageBlob;
    }
  };
  return (
    <div className="w-[100%] ">
      {item.notify && (
        <p
          className="w-full text-xs text-center bg-yellow-100 rounded-full p-1 my-1"
          // key={idx}
        >
          {item.notify}
        </p>
      )}
      {item.data && (
        <div
          // key={idx}
          className={`h-auto max-w-[90%]  py-1 px-2 my-1 break-words ${
            item.data.id === socket.id
              ? 'ml-auto  bg-[#E0F2FD] rounded-t-xl rounded-bl-xl '
              : 'mr-auto   bg-white rounded-t-xl rounded-br-xl '
          }`}
        >
          <p
            className={` font-semibold ${
              item.data.id === socket.id ? 'text-[#8b6060]' : 'text-[#405f72]'
            }`}
          >
            {item.data.id === socket.id ? null : item.data?.author}
          </p>

          {item.data?.message && (
            <p className="w-full pb-1  ">{item.data?.message}</p>
          )}
          {item.data?.image && <Image image={getImageBlob(item.data?.image)} />}
          <div className="flex w-full items-end gap-1 justify-end">
            <p className="text-xs">{item.data?.date}</p>
            {item.data.id === socket.id && (
              <BiCheckDouble className="w-4 h-4 text-[#3F3B3B]" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatCard;
