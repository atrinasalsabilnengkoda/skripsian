import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router-dom';
import DataTugas1 from '../data/DataTugas1'
import DataTugas2 from '../data/DataTugas2'
import AnswerService from '../services/answer.service';
import AuthService from '../../../services/auth.service';

export default function Tugas() {

    let history = useHistory();

    const navigate = (route) => {
        history.push(route);
    }
    const [data, setData] = useState(0)

    useEffect(() => {
        AnswerService.getAnswer()
            .then(res => {
                setData(res.data.data);
                // res.data.data.filter(e => e.id_question.includes('B')).map(e => setNilai(nilai + Number(e.grade)))
            }, (error) => {
                console.log("Private page", error.response);
                // Invalid token
                if (error.response && error.response.status === 401) {
                    AuthService.logout();
                    navigate("/login");
                    window.location.reload();
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const redirectWithData = (url, data, index) => {
        console.log(data);
        history.push({ pathname: url, state: { data, question_number: index + 1 } })
    }

    const hitungNilai = (tipe) => {
        const user = AuthService.getCurrentUser();

        let arr = data && data.filter(e => e.id_question.includes(tipe) && e.id_user === user.id_user);
        let nilai = 0
        arr && arr.forEach(element => {
            nilai += element.grade
        });

        return nilai * 10
    }

    return (
        <div className='bg-purple-700 min-h-screen flex flex-col items-center pb-4'>
            <div className='min-w-full flex justify-start p-4'>
                <button onClick={() => navigate('/home')}>
                    <ChevronLeftIcon className='w-8 h-8 text-white' />
                </button>
            </div>
            <h1 className='text-white text-xl font-medium mb-4'>Tugas</h1>
            {/* <div className="w-fit mt-4 relative text-gray-600">
                <input
                    className="border-2 border-gray-300 bg-white w-full h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Masukan kode kelas"
                />

                <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                    <SearchIcon className="text-gray-600 h-4 w-4 fill-current" >
                    </SearchIcon>
                </button>
            </div> */}


            <div className='w-90% bg-white mt-4 p-4 mb-4 rounded-lg'>
                <div className='flex justify-between'>
                    <p className='max-w-fit text-white text-sm font-medium bg-custom-blue p-2 mb-4 rounded'>Kode : B6-B</p>
                    <p className='max-w-fit text-white text-sm font-medium bg-yellow-400 p-2 mb-4 rounded'>{hitungNilai('B')}</p>
                </div>
                {/* Card continer */}
                <div className=' w-full flex flex-wrap'>
                    {/* <button as='card' className='flex items-center w-full p-4 mb-4 bg-custom-coral rounded-md shadow-click md:w-48% md:mx-1% ' onClick={() => navigate('/game1')}>
                        <img className="w-16" src="https://images2.imgbox.com/15/d8/Y9j7UAWi_o.png" alt="icon" />
                        <div className='flex flex-col ml-4 text-left'>
                            <h2 className='text-white font-custom-font font-medium text-lg'>1-Membaca 01</h2>
                            <p className='text-white font-custom-font text-xs mt-2'>Game ini akan mengajarkan kamu mencocokan kata dalam bahasa Arab dengan gambar yang sesuai melalui puzzle</p>
                        </div>
                    </button> */}
                    {DataTugas1.map((element, i) => (
                        <button key={i} as='card' className='flex items-center w-full p-4 mb-4 bg-custom-coral rounded-md shadow-click md:w-48% md:mx-1% ' onClick={() => redirectWithData('/game3', element, i)}>
                            <img className="w-16" src="https://images2.imgbox.com/15/d8/Y9j7UAWi_o.png" alt="icon" />
                            {/* <img className="w-16" src="Membaca.png" alt="icon" /> */}
                            <div className='flex flex-col ml-4 text-left'>
                                <h2 className='text-white font-custom-font font-medium text-lg'>6-Membaca {i + 1}</h2>
                                <p className='text-white font-custom-font text-xs mt-2'>Game ini akan mengajarkan kamu mencocokan gambar dengan kata dalam bahasa Arab yang sesuai melalui puzzle</p>
                            </div>
                        </button>
                    ))}
                    {/* <button as='card' className='flex items-center w-full p-4 mb-4 bg-custom-coral rounded-md shadow-click md:w-48% md:mx-1% ' onClick={() => navigate('/game4')}>
                        <img className="w-16" src="https://images2.imgbox.com/09/1e/5vFfSv6l_o.png" alt="icon" />
                        <div className='flex flex-col ml-4 text-left'>
                            <h2 className='text-white font-custom-font font-medium text-lg'>3-Mendengar 01</h2>
                            <p className='text-white font-custom-font text-xs mt-2'>Game ini akan mengajarkan kamu mencocokan kata dalam bahasa Arab melalui puzzle</p>
                        </div>
                    </button>
                    <button as='card' className='flex items-center w-full p-4 mb-4 bg-custom-coral rounded-md shadow-click md:w-48% md:mx-1% ' onClick={() => navigate('/game2')}>
                        <img className="w-16" src="https://images2.imgbox.com/09/1e/5vFfSv6l_o.png" alt="icon" />
                        <div className='flex flex-col ml-4 text-left'>
                            <h2 className='text-white font-custom-font font-medium text-lg'>3-Mendengar 02</h2>
                            <p className='text-white font-custom-font text-xs mt-2'>Game ini akan mengajarkan kamu mencocokan kata dalam bahasa Arab melalui puzzle</p>
                        </div>
                    </button> */}
                </div>
            </div>

            <div className='w-90% bg-white mt-4 p-4 rounded-lg'>
                <div className='flex justify-between'>
                    <p className='max-w-fit text-white text-sm font-medium bg-custom-blue p-2 mb-4 rounded'>Kode : B6-A</p>
                    <p className='max-w-fit text-white text-sm font-medium bg-yellow-400 p-2 mb-4 rounded'>{hitungNilai('A')}</p>
                </div>
                {/* Card continer */}
                <div className=' w-full flex flex-wrap'>
                    {/* <button as='card' className='flex items-center w-full p-4 mb-4 bg-custom-coral rounded-md shadow-click md:w-48% md:mx-1% ' onClick={() => navigate('/game1')}>
                        <img className="w-16" src="https://images2.imgbox.com/15/d8/Y9j7UAWi_o.png" alt="icon" />
                        <div className='flex flex-col ml-4 text-left'>
                            <h2 className='text-white font-custom-font font-medium text-lg'>1-Membaca 01</h2>
                            <p className='text-white font-custom-font text-xs mt-2'>Game ini akan mengajarkan kamu mencocokan kata dalam bahasa Arab dengan gambar yang sesuai melalui puzzle</p>
                        </div>
                    </button> */}
                    {DataTugas2.map((element, i) => (
                        <button key={i} as='card' className='flex items-center w-full p-4 mb-4 bg-custom-coral rounded-md shadow-click md:w-48% md:mx-1% ' onClick={() => redirectWithData('/game4', element, i)}>
                            <img className="w-16" src="https://images2.imgbox.com/09/1e/5vFfSv6l_o.png" alt="icon" />
                            {/* <img className="w-16" src="Mendengar.png" alt="icon" /> */}
                            <div className='flex flex-col ml-4 text-left'>
                                <h2 className='text-white font-custom-font font-medium text-lg'>6-Mendengar {i + 1}</h2>
                                <p className='text-white font-custom-font text-xs mt-2'>Game ini akan mengajarkan kamu mencocokan kata dalam bahasa Arab melalui puzzle</p>
                            </div>
                        </button>
                    ))}
                    {/* <button as='card' className='flex items-center w-full p-4 mb-4 bg-custom-coral rounded-md shadow-click md:w-48% md:mx-1% ' onClick={() => navigate('/game4')}>
                        <img className="w-16" src="https://images2.imgbox.com/09/1e/5vFfSv6l_o.png" alt="icon" />
                        <div className='flex flex-col ml-4 text-left'>
                            <h2 className='text-white font-custom-font font-medium text-lg'>3-Mendengar 01</h2>
                            <p className='text-white font-custom-font text-xs mt-2'>Game ini akan mengajarkan kamu mencocokan kata dalam bahasa Arab melalui puzzle</p>
                        </div>
                    </button>
                    <button as='card' className='flex items-center w-full p-4 mb-4 bg-custom-coral rounded-md shadow-click md:w-48% md:mx-1% ' onClick={() => navigate('/game2')}>
                        <img className="w-16" src="https://images2.imgbox.com/09/1e/5vFfSv6l_o.png" alt="icon" />
                        <div className='flex flex-col ml-4 text-left'>
                            <h2 className='text-white font-custom-font font-medium text-lg'>3-Mendengar 02</h2>
                            <p className='text-white font-custom-font text-xs mt-2'>Game ini akan mengajarkan kamu mencocokan kata dalam bahasa Arab melalui puzzle</p>
                        </div>
                    </button> */}
                </div>
            </div>

        </div >
    )
}
