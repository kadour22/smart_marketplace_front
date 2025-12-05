import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Send, Clock, User, Search, 
  Sparkles, Circle, CheckCheck, Package
} from 'lucide-react';
import { listConversation } from './services/messages_services';
import { Link } from 'react-router-dom';

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get_conversations = async () => {
      try {
        const data = await listConversation();
        setConversations(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };
    get_conversations();
  }, []);

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

  const isEmpty = conversations.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <MessageSquare className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Messages</h1>
              <p className="text-slate-600">
                {conversations.length} {conversations.length === 1 ? 'conversation' : 'conversations'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Empty State */}
        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <MessageSquare className="w-16 h-16 text-blue-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No Messages Yet</h2>
            <p className="text-slate-600 mb-8">Start a conversation with a seller!</p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition font-semibold"
              >
                Browse Products
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Conversations List */}
            <div className="space-y-4">
              <AnimatePresence>
                {conversations.map((conversation, index) => (
                  <motion.div
                    key={conversation.id || index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="group"
                  >
                    <Link to={`/messages/${conversation.id}`}>
                      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-300 p-6 cursor-pointer">
                        <div className="flex items-start space-x-4">
                          {/* Avatar */}
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="relative flex-shrink-0"
                          >
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                              <User className="w-7 h-7 text-white" />
                            </div>
                            {/* Online/Unread indicator */}
                            {conversation.unread_count > 0 && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
                              >
                                <span className="text-white text-xs font-bold">
                                  {conversation.unread_count}
                                </span>
                              </motion.div>
                            )}
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                                  {conversation.seller_name || 'Seller'}
                                </h3>
                                {conversation.product_name && (
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Package className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm text-slate-600 truncate">
                                      {conversation.product_name}
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Timestamp */}
                              <div className="flex items-center space-x-1 text-xs text-slate-500">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{conversation.last_message_time || '2h ago'}</span>
                              </div>
                            </div>

                            {/* Last Message Preview */}
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-slate-600 line-clamp-1 flex-1">
                                {conversation.last_message || 'Start a conversation...'}
                              </p>
                              
                              {/* Read Status */}
                              {conversation.is_read ? (
                                <CheckCheck className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
                              ) : (
                                <Circle className="w-2 h-2 text-blue-600 fill-blue-600 flex-shrink-0 ml-2" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bottom shine effect */}
                        <motion.div
                          className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                        />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Tips Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 bg-blue-50 rounded-xl border border-blue-200 p-6"
            >
              <div className="flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Quick Tips</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Be clear and specific in your messages</li>
                    <li>• Respond promptly to seller inquiries</li>
                    <li>• Keep all communication within the platform</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationList;