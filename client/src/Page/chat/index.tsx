import Chats from './Chats';

function Chat() {
  let joined = false;
  return <div className="bg-[#EAEAEA]">{joined && <Chats />}</div>;
}

export default Chat;
