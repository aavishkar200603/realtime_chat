import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const { authUser } = useSelector((store) => store.user); // Access authUser from the Redux store

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;

                // Send authUser._id as a query parameter
                const res = await axios.get(`http://localhost:5000/api/v1/user`, {
                    params: {
                        userId: authUser?._id, // Query parameter
                    },
                });

                console.log("other users -> ", res);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log("Error fetching other users:", error);
            }
        };

        if (authUser?._id) { // Only fetch if authUser._id exists
            fetchOtherUsers();
        }
    }, [authUser?._id, dispatch]); // Add authUser._id as a dependency to re-fetch if it changes
}

export default useGetOtherUsers;
