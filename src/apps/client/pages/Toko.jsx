import React from 'react';
import { ChevronLeftIcon, ShoppingCartIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router-dom';

export default function Toko() {

    let history = useHistory();

    const navigate = (route) => {
        history.push(route);
    }

    return (
        <div className='bg-purple-700 min-h-screen flex flex-col items-center'>
            <div className='min-w-full flex justify-start p-4'>
                <button onClick={() => navigate('/home')}>
                    <ChevronLeftIcon className='w-8 h-8 text-white' />
                </button>
            </div>
            <h1 className='text-white text-xl font-medium'>Toko</h1>


            <div className='w-90% bg-white mt-4 p-4 rounded-lg flex flex-wrap'>
                {/* Card continer */}

                <div className='w-full flex items-center sm:w-48% p-4 mt-4 mb-4 bg-custom-coral rounded-md shadow-click sm:mx-1%'>
                    <div className='w-12 sm:mr-4 md:mr-5 sm:ml-0 md:ml-5' >
                        <img src="https://images2.imgbox.com/75/07/l6Ul6J0S_o.png" alt="icon" />
                    </div>
                    <div className='w-2/5 flex flex-col text-left'>
                        <h1 className='text-white font-custom-font font-bold md:text-xl sm:text-xs'>Permen</h1>
                        <p className='text-white font-custom-font md:text-lg sm:text-xs sm:mt-1 md:mt-2'>100 poin</p>
                    </div>
                    <div className='w-2/5 flex justify-end text-right sm:ml-2 md:ml-8'>
                        <button className='flex items-center max-w-fit text-white text-sm font-medium bg-custom-blue p-1 mb-1 mt-2 rounded-md'>
                            <ShoppingCartIcon className='w-4 h-4 mt-1 mb-1 md:ml-3 md:mr-3 sm:ml-0 sm:mr-0' />
                            <p className='text-white font-custom-font md:text-lg sm:text-xs mt-1 mb-1 md:mr-3 sm:mr:0'>Beli</p>
                        </button>
                    </div>
                </div>
                <div className='w-full flex items-center sm:w-48% p-4 mt-4 mb-4 bg-custom-coral rounded-md shadow-click sm:mx-1%'>
                    <div className='w-12 sm:mr-4 md:mr-5 sm:ml-0 md:ml-5' >
                        <img src="https://images2.imgbox.com/10/0e/GuzybGRB_o.png" alt="icon" />
                    </div>
                    <div className='w-2/5 flex flex-col text-left'>
                        <h1 className='text-white font-custom-font font-bold md:text-xl sm:text-xs'>Coklat</h1>
                        <p className='text-white font-custom-font md:text-lg sm:text-xs sm:mt-1 md:mt-2'>500 poin</p>
                    </div>
                    <div className='w-2/5 flex justify-end text-right sm:ml-2 md:ml-8'>
                        <button className='flex items-center max-w-fit text-white text-sm font-medium bg-custom-blue p-1 mb-1 mt-2 rounded-md'>
                            <ShoppingCartIcon className='w-4 h-4 mt-1 mb-1 md:ml-3 md:mr-3 sm:ml-0 sm:mr-0' />
                            <p className='text-white font-custom-font md:text-lg sm:text-xs mt-1 mb-1 md:mr-3 sm:mr:0'>Beli</p>
                        </button>
                    </div>
                </div>
                <div className='w-full flex items-center sm:w-48% p-4 mt-4 mb-4 bg-custom-coral rounded-md shadow-click sm:mx-1%'>
                    <div className='w-12 sm:mr-4 md:mr-5 sm:ml-0 md:ml-5' >
                        <img src="https://images2.imgbox.com/35/33/suQi5xHy_o.png" alt="icon" />
                    </div>
                    <div className='w-2/5 flex flex-col text-left'>
                        <h1 className='text-white font-custom-font font-bold md:text-xl sm:text-xs'>Pensil</h1>
                        <p className='text-white font-custom-font md:text-lg sm:text-xs sm:mt-1 md:mt-2'>1500 poin</p>
                    </div>
                    <div className='w-2/5 flex justify-end text-right sm:ml-2 md:ml-8'>
                        <button className='flex items-center max-w-fit text-white text-sm font-medium bg-custom-blue p-1 mb-1 mt-2 rounded-md'>
                            <ShoppingCartIcon className='w-4 h-4 mt-1 mb-1 md:ml-3 md:mr-3 sm:ml-0 sm:mr-0' />
                            <p className='text-white font-custom-font md:text-lg sm:text-xs mt-1 mb-1 md:mr-3 sm:mr:0'>Beli</p>
                        </button>
                    </div>
                </div>
                <div className='w-full flex items-center sm:w-48% p-4 mt-4 mb-4 bg-custom-coral rounded-md shadow-click sm:mx-1%'>
                    <div className='w-12 sm:mr-4 md:mr-5 sm:ml-0 md:ml-5' >
                        <img src="https://images2.imgbox.com/91/00/PC0Y5iyA_o.png" alt="icon" />
                    </div>
                    <div className='w-2/5 flex flex-col text-left'>
                        <h1 className='text-white font-custom-font font-bold md:text-xl sm:text-xs'>Buku</h1>
                        <p className='text-white font-custom-font md:text-lg sm:text-xs sm:mt-1 md:mt-2'>2500 poin</p>
                    </div>
                    <div className='w-2/5 flex justify-end text-right sm:ml-2 md:ml-8'>
                        <button className='flex items-center max-w-fit text-white text-sm font-medium bg-custom-blue p-1 mb-1 mt-2 rounded-md'>
                            <ShoppingCartIcon className='w-4 h-4 mt-1 mb-1 md:ml-3 md:mr-3 sm:ml-0 sm:mr-0' />
                            <p className='text-white font-custom-font md:text-lg sm:text-xs mt-1 mb-1 md:mr-3 sm:mr:0'>Beli</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
