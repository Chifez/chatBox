import { BiCheckDouble } from 'react-icons/bi';

const ChatCard = ({ item, socket, imageModal }: any) => {
  const toggleModal = (image: any) => {
    imageModal(image);
    console.log('chatcard', image);
  };
  return (
    <>
      {item.notify && (
        <div className="flex w-full items-center justify-center ">
          <p className=" text-xs text-center w-[80%] md:w-[70%] bg-yellow-100 rounded-lg p-1 my-1">
            {item.notify}
          </p>
        </div>
      )}
      {item.data && (
        <div
          className={`h-auto max-w-[70%]  py-1 px-2 my-1 break-words ${
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
          {item.data?.image && (
            <div onClick={() => toggleModal(item.data?.image)}>
              <img
                src={item.data?.image}
                alt="image"
                className="max-w-full h-auto"
              />
            </div>
          )}
          <div className="flex w-full items-end gap-1 justify-end">
            <p className="text-xs">{item.data?.date}</p>
            {item.data.id === socket.id && (
              <BiCheckDouble className="w-4 h-4 text-[#3F3B3B]" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatCard;
