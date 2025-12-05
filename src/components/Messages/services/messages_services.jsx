import AxiosInstace from "../../../AxiosInstance/call_api";
// In messages_services.js
export const startConversation = async (product, recipient) => {
    try {
        const response = await AxiosInstace.post('messages/conversations/', {
            product,
            recipient
        });
        console.log("Conversation started:", response.data);
        return response.data; // Return the conversation data
    } catch (error) {
        console.log("Error starting conversation:");
    }
}

export const listConversation = async () => {
    try{
        const response = await AxiosInstace.get('messages/conversations/')
        return response.data
    }catch(error){
        console.log("error in fetching connversation")
    }
}


export const ConversationMessagesList = async (conversation_id) => {
    try{
        const response = await AxiosInstace.get(`messages/messages/${conversation_id}/`);
        return response.data
    }catch(error){
        console.log("error in fetching messages")
    }
}

// conversations/<int:conversation_id>/messages/