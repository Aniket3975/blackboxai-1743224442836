import React, { useState, useEffect } from 'react';
import { FaSearch, FaPaperclip, FaSmile, FaPaperPlane, FaEllipsisV } from 'react-icons/fa';

function MessagesPage() {
  // Mock data for chats
  const [chats, setChats] = useState([
    {
      id: 1,
      type: 'direct',
      name: "Jamie Chen",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
      lastMessage: "Hey, how's the project going?",
      time: "2h ago",
      unread: 0,
      online: true
    },
    {
      id: 2,
      type: 'group',
      name: "Study Group",
      avatar: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100",
      lastMessage: "Casey: I'll bring the notes tomorrow",
      time: "1d ago",
      unread: 3,
      online: false
    }
  ]);

  // Mock data for active chat messages
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Sample users for group chat
  const groupMembers = [
    { id: 1, name: "Jamie Chen", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" },
    { id: 2, name: "Taylor Smith", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    { id: 3, name: "Casey Jordan", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100" }
  ];

  // Load messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      // Simulate loading messages
      const chatMessages = [
        {
          id: 1,
          sender: activeChat.type === 'direct' ? activeChat.id : 1,
          content: "Hey everyone!",
          time: "10:30 AM",
          isMe: false
        },
        {
          id: 2,
          sender: activeChat.type === 'direct' ? 0 : 2,
          content: "How's it going?",
          time: "10:32 AM",
          isMe: activeChat.type === 'direct'
        },
        {
          id: 3,
          sender: activeChat.type === 'direct' ? activeChat.id : 3,
          content: "Working on the project now",
          time: "10:35 AM",
          isMe: false
        }
      ];
      setMessages(chatMessages);
    }
  }, [activeChat]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 0, // Current user
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 h-[600px]">
          {/* Chat List */}
          <div className="border-r">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Messages</h2>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Search messages"
                  className="w-full pl-8 pr-4 py-2 bg-gray-100 rounded-md"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="overflow-y-auto h-[500px]">
              {chats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    activeChat?.id === chat.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={chat.avatar} 
                        alt={chat.name} 
                        className="w-12 h-12 rounded-full"
                      />
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-3 flex flex-col">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={activeChat.avatar} 
                      alt={activeChat.name} 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{activeChat.name}</h3>
                      {activeChat.type === 'group' && (
                        <p className="text-xs text-gray-500">
                          {groupMembers.length} members
                        </p>
                      )}
                      {activeChat.type === 'direct' && (
                        <p className="text-xs text-gray-500">
                          {activeChat.online ? 'Online' : 'Offline'}
                        </p>
                      )}
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <FaEllipsisV />
                  </button>
                </div>

                {/* Group Members (for group chat) */}
                {activeChat.type === 'group' && (
                  <div className="p-3 border-b bg-gray-50">
                    <div className="flex items-center space-x-2 overflow-x-auto">
                      {groupMembers.map(member => (
                        <div key={member.id} className="flex flex-col items-center">
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-xs mt-1">{member.name.split(' ')[0]}</span>
                        </div>
                      ))}
                      <button className="text-blue-600 text-sm font-medium">
                        + Add Members
                      </button>
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                            message.isMe
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-800 shadow-sm'
                          }`}
                        >
                          {activeChat.type === 'group' && !message.isMe && (
                            <div className="text-xs font-semibold mb-1">
                              {groupMembers.find(m => m.id === message.sender)?.name}
                            </div>
                          )}
                          <p>{message.content}</p>
                          <div className={`text-xs mt-1 text-right ${
                            message.isMe ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaPaperclip />
                    </button>
                    <div className="flex-grow relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message"
                        className="w-full pl-4 pr-10 py-2 border rounded-full"
                      />
                      <button className="absolute right-3 top-2 text-gray-400 hover:text-gray-600">
                        <FaSmile />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-grow flex items-center justify-center bg-gray-50">
                <div className="text-center p-6">
                  <h3 className="text-xl font-semibold mb-2">Select a chat</h3>
                  <p className="text-gray-600">
                    Choose an existing conversation or start a new one
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;