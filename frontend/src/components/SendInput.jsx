import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser,authUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message.trim()) return; // Avoid sending empty messages

        try {
            // Send the message along with the authUser._id
            const res = await axios.post(
                `http://localhost:5000/api/v1/message/send/${selectedUser?._id}`,
                { 
                    message, 
                    id: authUser?._id  // Send the authUser._id as senderId
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            // Dispatch the new message to Redux store
            dispatch(setMessages([...messages, res?.data?.newMessage]));

            // Clear the input field
            setMessage("");
        } catch (error) {
            console.log("Error sending message:", error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}  // Update message state
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
                />
                <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
                    <IoSend />
                </button>
            </div>
        </form>
    );
};

export default SendInput;
