import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const { authUser } = useSelector(store => store.user); // Access authUser from the Redux store
    const dispatch = useDispatch();

    console.log("selected user id:",selectedUser);
      console.log("logged in user",authUser)

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                console.log("before calling for messages");
                axios.defaults.withCredentials = true;
              
                // Send request with selectedUser._id as parameter and authUser._id in the body
                const res = await axios.post(`http://localhost:5000/api/v1/message/${selectedUser?._id}`, {
                    id: authUser?._id // Sender's ID in request body
                });
                if(!res.data)
                    {
                        dispatch(setMessages([]));
                        return;
                    }

                console.log("Fetched messages for the selected user:2",res.data);
                 dispatch(setMessages(res.data));
                 console.log("messages sent in redux store");
            } catch (error) {
                console.log("Error fetching messages:", error);
            }
        };

        if (selectedUser?._id && authUser?._id) { // Only fetch if both IDs are available
            fetchMessages();
        }
    }, [selectedUser?._id, authUser?._id, dispatch]); // Add dependencies for re-fetching if IDs change
}

export default useGetMessages;
