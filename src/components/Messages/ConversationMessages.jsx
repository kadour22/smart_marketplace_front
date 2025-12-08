import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, ArrowLeft, User, Package, Clock, 
  CheckCheck, Loader2
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { ConversationMessagesList, sendMessage } from './services/messages_services';

const ConversationMessages = () => {
  const [messages, setMessages] = useState([]);
  const [conversationDetails, setConversationDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { id: conversation_id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const currentUser = localStorage.getItem('username');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await ConversationMessagesList(conversation_id);
        // If backend returns { conversation: {...}, messages: [...] }
        if (data.conversation && data.messages) {
          setConversationDetails(data.conversation);
          setMessages(data.messages);
        } else {
          // If backend still returns just messages array
          setMessages(data);
        }
        console.log("Messages loaded:", data);
      } catch(error) {
        console.log("Failed to load messages:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
  }, [conversation_id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    const messageContent = newMessage;
    
    // Optimistic UI update - add message immediately
    const optimisticMessage = {
      id: 'temp-' + Date.now(),
      content: messageContent,
      sender: currentUser,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, optimisticMessage]);
    setNewMessage(''); // Clear input immediately for better UX
    
    try {
      // Send message to backend
      const response = await sendMessage(conversation_id, messageContent);
      
      // Replace optimistic message with real one from server
      if (response) {
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === optimisticMessage.id ? response : msg
          )
        );
      }
    } catch(error) {
      console.error('Failed to send message', error);
      // Remove optimistic message on error and restore input
      setMessages(prevMessages => 
        prevMessages.filter(msg => msg.id !== optimisticMessage.id)
      );
      setNewMessage(messageContent);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/conversations')}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </motion.button>

            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">
                {conversationDetails 
                  ? (conversationDetails.sender === currentUser 
                      ? conversationDetails.recipient 
                      : conversationDetails.sender)
                  : 'Chat'}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Package className="w-4 h-4" />
                <span>Product Chat</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Messages List */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4"
                >
                  <Send className="w-12 h-12 text-blue-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No messages yet</h3>
                <p className="text-slate-600">Start the conversation below!</p>
              </div>
            ) : (
              <AnimatePresence>
                {messages.map((message, index) => {
                  // Check if message is from current user
                  const isMyMessage = message.sender === currentUser;
                  
                  return (
                    <motion.div
                      key={message.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-end space-x-2 max-w-[70%] ${isMyMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {!isMyMessage && (
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className={`rounded-2xl px-4 py-3 ${
                            isMyMessage
                              ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-900'
                          }`}
                        >
                          <p className="text-sm break-words">{message.content}</p>
                          <div className={`flex items-center space-x-1 mt-1 text-xs ${
                            isMyMessage ? 'text-blue-100 justify-end' : 'text-slate-500'
                          }`}>
                            <Clock className="w-3 h-3" />
                            <span>
                              {message.timestamp 
                                ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                : 'Just now'
                              }
                            </span>
                            {isMyMessage && (
                              <CheckCheck className="w-4 h-4 text-blue-200" />
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-slate-200 p-4 bg-slate-50">
            <div className="flex items-end space-x-3">
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none resize-none transition"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>

              <motion.button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || sending}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl transition shadow-lg ${
                  newMessage.trim() && !sending
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 hover:shadow-xl'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                {sending ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <Send className="w-6 h-6 text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-blue-50 rounded-xl border border-blue-200 p-4"
        >
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> Keep all communication within the platform for your safety and security.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ConversationMessages;