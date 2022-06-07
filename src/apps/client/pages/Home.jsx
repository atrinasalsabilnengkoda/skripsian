import React from 'react';
import { PlayIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router-dom';
import AuthService from '../../../services/auth.service';

export default function Home() {

    let history = useHistory();

    const navigate = (route) => {
        history.push(route);
    }

    const logOut = () => {
        AuthService.logout();
        navigate('/');
        window.location.reload();
    }

    return (
        <div className='bg-purple-700 min-h-screen flex flex-col items-center justify-center'>
            <img className='mb-4 w-32' src="https://images2.imgbox.com/84/97/Qm0ko9x0_o.png" alt="ilustrasi" />
            {/* <img className='mb-4 w-32' src="Ilustrasi.png" alt="ilustrasi" /> */}
            <h1 className='text-white sm:text-3xl md:text-4xl text-center font-bold mb-4'>Mari Belajar Bahasa Arab</h1>
            <button onClick={() => navigate('/tugas')} className='flex items-center bg-custom-coral shadow-notclick text-white text-xl py-3 px-6 rounded-full mb-3 hover:bg-white hover:text-custom-coral'><PlayIcon className='w-6 h-6 mr-2 ' />Bermain</button>
            <button onClick={() => navigate('/toko')} className='flex items-center bg-custom-coral shadow-notclick text-white text-xl py-2 px-4 rounded-full mb-3 hover:bg-white hover:text-custom-coral'><ShoppingCartIcon className='w-6 h-6 mr-2 ' />Toko</button>
            <button onClick={() => navigate('/profilSiswa')} className='flex items-center bg-custom-coral shadow-notclick text-white text-xl py-2 px-4 rounded-full mb-3 hover:bg-white hover:text-custom-coral'><UserIcon className='w-6 h-6 mr-2 ' />Profil</button>
            <button onClick={() => logOut()} className='flex items-center bg-custom-coral shadow-notclick text-white text-xl py-2 px-4 rounded-full hover:bg-white hover:text-custom-coral'>Logout</button>
        </div>
    );
}


