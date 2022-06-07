import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router-dom';
import UserService from '../../../services/user.service';
import AuthService from '../../../services/auth.service';

export default function Profil() {

    let history = useHistory();

    const navigate = (route) => {
        history.push(route);
    }
    
    const [data, setData] = useState({})

    useEffect(() => {

        const user = AuthService.getCurrentUser();

        if (user) {
            UserService.getUserById(user.id_user)
                .then(res => {
                    setData(res.data.data);
                    console.log(res.data.data);
                }, (error) => {
                    console.log("Private page", error.response);
                    // Invalid token
                    if (error.response && error.response.status === 401) {
                        AuthService.logout();
                        navigate("/login");
                        window.location.reload();
                    }
                })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className='bg-purple-700 min-h-screen flex flex-col items-center'>
            <div className='min-w-full flex justify-start p-4'>
                <button onClick={() => navigate('/home')}>
                    <ChevronLeftIcon className='w-8 h-8 text-white' />
                </button>
            </div>
            <h1 className='text-white text-xl font-medium'>Profil-ku</h1>

            <div className='w-90% bg-white mt-4 p-4 rounded-lg'>
                {/* Card continer */}
                <div className=' w-full flex flex-wrap'>
                    <div className='w-full flex flex-col items-center justify-center mt-3'>
                        {/* <img className='object-center' src="https://thumbs2.imgbox.com/f7/02/pCjwRNJy_t.png" alt="icon" /> */}
                        <img className='object-center' src={data && data.image} alt="icon" />
                        <h1 className='font-custom-font font-bold text-2xl mt-3'>{data && data.name}</h1>
                        <h1 className='font-custom-font text-lg mt-3'>Kelas : {data && data.class}</h1>
                        <h1 className='font-custom-font text-lg mt-3'>No Absen : {data && data.attendees_no}</h1>
                    </div>
                    <div className='flex items-center w-full p-4 mt-4 mb-4 bg-custom-coral rounded-md shadow-click md:mx-2%'>
                        <div className=' flex flex-col text-left'>
                            <h1 className='text-white font-custom-font font-bold text-lg'>Total Poin : {data && data.poin}</h1>
                            <h2 className='text-white font-custom-font text-lg mt-2'>Total Game : 0</h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
