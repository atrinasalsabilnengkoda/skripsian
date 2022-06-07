import React, { useState, useEffect, Fragment } from 'react';
import { v4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { isMobile } from 'react-device-detect';
import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import Lottie from 'react-lottie';
import animationData from '../assets/orientation.json'
// import WORDS from '../data/DataKata';
import { ChevronLeftIcon, HomeIcon, PlayIcon } from '@heroicons/react/solid'
// import soal1 from '../assets/Bulutangkis.mp3'
import { Link, useLocation, useHistory } from 'react-router-dom';
import AnswerService from '../services/answer.service';
import AuthService from '../../../services/auth.service';
import toast, { Toaster } from 'react-hot-toast';

// lottie option
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(0, 1, { ...item, id: v4() });

    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(0, 1, removed)

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    console.log(result);

    return result;
};

const Game4 = () => {

    let history = useHistory();

    const navigate = (route) => {
        history.push(route);
    }
    const location = useLocation();
    const [state, setState] = useState({
        data: {

        },
        modal: false,
        score: 0
    });
    const [dataBank, setDataBank] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [audio, setAudio] = useState('');

    useEffect(() => {
        if (location.state) {
            setState(prev => ({
                ...prev,
                data: location.state.data.data_soal,
            }));
            setDataBank(location.state.data.data_bank);
            setAudio(location.state.data.audio)
        }
    }, [location])

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            AnswerService.getAnswerById({ id_user: user.id_user, id_question: 'A' + location.state.question_number })
                .then(res => {

                    console.log(res);
                    if (res.data.success) {
                        const answer = JSON.parse(res.data.data.the_answer);
                        setState(prev => ({
                            ...prev,
                            data: {
                                ...answer
                            }
                        }));

                        setBtnDisabled(true);
                    }
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
    }, [location])

    useEffect(() => {
        console.log(audio);
    }, [audio])


    const onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                break;
            case 'WORDS':
                console.log('copy');
                setState(prev => ({
                    ...prev,
                    data: {
                        ...prev.data,
                        [destination.droppableId]: copy(
                            dataBank,
                            state.data[destination.droppableId],
                            source,
                            destination
                        )
                    }
                }));
                break;
            default:
                console.log('move');
                setState(prev => ({
                    ...prev,
                    data: {
                        ...prev.data,
                        ...move(
                            state.data[source.droppableId],
                            state.data[destination.droppableId],
                            source,
                            destination
                        )
                    }
                })
                );
                break;
        }
    };

    // hapus digit di soal
    function digitsBeGone(str) {
        return str.match(/\D/g).join('')
    }

    function playAudio() {
        new Audio(audio).play()
    }

    async function checkAnswer(data) {
        const user = AuthService.getCurrentUser();

        if (state.data[Object.keys(data)[0]].length) {
            let arr = await Object.keys(data).filter((item, i) => data[item][0].kata === digitsBeGone(item))

            AnswerService.createAnswer({ id_user: user.id_user, id_question: 'A' + location.state.question_number, the_answer: JSON.stringify(data), grade: arr.length })
                .then(res => {
                    console.log(res);
                    toast.success('data berhasil disimpan', { position: 'bottom-center' })
                    window.location.reload();
                }, (error) => {
                    console.log("Private page", error.response);
                    // Invalid token
                    if (error.response && error.response.status === 401) {
                        AuthService.logout();
                        navigate("/login");
                        window.location.reload();
                    }
                })
        } else {
            toast.error('Harap isi jawaban', { position: 'bottom-center' })
        }
    }

    return isMobile ? (
        <>
            <Toaster />
            <DeviceOrientation lockOrientation={'landscape'}>
                <Orientation orientation='landscape' alwaysRender={false}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className='bg-purple-700 min-h-screen px-4 md:px-8 xl:px-28 pt-4 p-4'>
                            <div className=' flex justify-between mb-4'>
                                <Link to='/tugas'>
                                    <button >
                                        <ChevronLeftIcon className='w-8 h-8 text-white' />
                                    </button>
                                </Link>
                                <Link to='/home'>
                                    <button >
                                        <HomeIcon className='w-8 h-8 text-white' />
                                    </button>
                                </Link>
                            </div>
                            <h1 className='text-white'>Dengarkan audio berikut lalu cocokan jawabanya</h1>
                            <button onClick={playAudio}><PlayIcon className='w-10 h-10 text-white' /></button>
                            <div className='flex'>
                                <div as='Content' className='w-70% flex justify-center'>
                                    {Object.keys(state.data).map((list, i) => (
                                        <Droppable key={list} droppableId={list}>
                                            {(provided, snapshot) => (
                                                <div as='Container' className={`w-full min-h-custom-min-height max-h-60 m-2 bg-white p-2 rounded flex justify-center border-2 border-dashed border-black`}
                                                    ref={provided.innerRef}>
                                                    {state.data[list].length
                                                        ? state.data[list].map(
                                                            (item, index) => (
                                                                <Draggable
                                                                    key={item.id}
                                                                    draggableId={item.id}
                                                                    index={index}>
                                                                    {(provided, snapshot) => (
                                                                        <img ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            src={item.content}
                                                                            alt={item.kata}
                                                                            className='w-30% h-auto select-none p-2 mb-2 rounded'
                                                                        />
                                                                    )}
                                                                </Draggable>
                                                            )) : !provided.placeholder && (
                                                                ''
                                                            )}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    ))}
                                </div>
                                <Droppable droppableId="WORDS" isDropDisabled={true}>
                                    {(provided, snapshot) => (
                                        <div as='bank' className={`w-30% bg-custom-text p-2 my-4 rounded shadow-custom-shadow-gray flex flex-wrap`}
                                            ref={provided.innerRef}>
                                            {dataBank.map((item, index) => (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <Fragment>
                                                            <img ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                src={item.content}
                                                                alt={item.kata}
                                                                className='w-30% h-auto select-none p-2 mb-2 rounded'
                                                            />
                                                            {snapshot.isDragging && (
                                                                <img src={item.content} alt={item.kata} className='clone2 !transform-none' />
                                                            )}
                                                        </Fragment>
                                                    )}
                                                </Draggable>
                                            ))}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                            <div className='w-full flex mt-4'>
                                <button disabled={btnDisabled} className='bg-custom-coral text-white px-3 py-1 rounded-md shadow-click' onClick={() => checkAnswer(state.data)}>
                                    Check
                                </button>
                            </div>

                        </div>
                    </DragDropContext >
                </Orientation>
                <Orientation orientation='portrait' alwaysRender={false}>
                    <div className='bg-purple-700 min-h-screen px-4 md:px-8 xl:px-28 pt-4 flex flex-col justify-center WORDS-center'>
                        <Lottie options={defaultOptions} />
                        <h1 className='text-white font-semibold text-lg'>Tolong Putar Device anda</h1>
                    </div>
                </Orientation>
            </DeviceOrientation>
        </>
    ) : (
        <>
            <Toaster />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className='bg-purple-700 min-h-screen px-4 md:px-8 xl:px-28 pt-4'>
                    <div className=' flex justify-between mb-4'>
                        <Link to='/tugas'>
                            <button >
                                <ChevronLeftIcon className='w-8 h-8 text-white' />
                            </button>
                        </Link>
                        <Link to='/'>
                            <button >
                                <HomeIcon className='w-8 h-8 text-white' />
                            </button>
                        </Link>
                    </div>
                    <h1 className='text-white'>Dengarkan audio berikut lalu cocokan jawabanya</h1>
                    <button onClick={playAudio}><PlayIcon className='w-10 h-10 text-white' /></button>
                    <div className='flex'>
                        <div as='Content' className='w-70% flex justify-center'>
                            {Object.keys(state.data).map((list, i) => (
                                <Droppable key={list} droppableId={list}>
                                    {(provided, snapshot) => (
                                        <div as='Container' className={`w-full min-h-custom-min-height max-h-60 m-2 bg-white p-2 rounded flex justify-center border-2 border-dashed border-black`}
                                            ref={provided.innerRef}>
                                            {state.data[list].length
                                                ? state.data[list].map(
                                                    (item, index) => (
                                                        <Draggable
                                                            key={item.id}
                                                            draggableId={item.id}
                                                            index={index}>
                                                            {(provided, snapshot) => (
                                                                <img ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    src={item.content}
                                                                    alt={item.kata}
                                                                    className='w-30% h-auto select-none p-2 mb-2 rounded'
                                                                />
                                                            )}
                                                        </Draggable>
                                                    )) : !provided.placeholder && (
                                                        ''
                                                    )}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </div>
                        <Droppable droppableId="WORDS" isDropDisabled={true}>
                            {(provided, snapshot) => (
                                <div as='bank' className={`w-30% bg-custom-text p-2 my-4 rounded shadow-custom-shadow-gray flex flex-wrap`}
                                    ref={provided.innerRef}>
                                    {dataBank.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>
                                            {(provided, snapshot) => (
                                                <Fragment>
                                                    <img ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        src={item.content}
                                                        alt={item.kata}
                                                        className='w-30% h-auto select-none p-2 mb-2 rounded'
                                                    />
                                                    {snapshot.isDragging && (
                                                        <img src={item.content} alt={item.kata} className='clone2 !transform-none' />
                                                    )}
                                                </Fragment>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className='w-full flex mt-4'>
                        <button disabled={btnDisabled} className='bg-custom-coral text-white px-3 py-1 rounded-md shadow-click' onClick={() => checkAnswer(state.data)}>
                            Check
                        </button>
                    </div>
                </div>
            </DragDropContext >
        </>
    );
}


export default Game4;