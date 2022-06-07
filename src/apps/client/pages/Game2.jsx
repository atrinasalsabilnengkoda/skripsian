import React, { Component, Fragment } from 'react';
import { v4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Dialog, Transition } from '@headlessui/react'
import { isMobile } from 'react-device-detect';
import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import Lottie from 'react-lottie';
import animationData from '../assets/orientation.json'
import IMAGES from '../data/DataGambar';
import { ChevronLeftIcon, HomeIcon, PlayIcon } from '@heroicons/react/solid'
import soal1 from '../assets/Bulutangkis.mp3'
import { Link } from 'react-router-dom';

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

class Game2 extends Component {

    state = {
        data: {
            'Bulutangkis': [],
        },
        modal: false,
        score: 0
    };

    componentDidMount() {
        console.log(this.state);
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                break;
            case 'IMAGES':
                console.log('copy');
                this.setState(prev => ({
                    ...prev,
                    data: {
                        ...prev.data,
                        [destination.droppableId]: copy(
                            IMAGES,
                            this.state.data[destination.droppableId],
                            source,
                            destination
                        )
                    }
                }));
                break;
            default:
                console.log('move');
                this.setState(prev => ({
                    ...prev,
                    data: {
                        ...prev.data,
                        ...move(
                            this.state.data[source.droppableId],
                            this.state.data[destination.droppableId],
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
    digitsBeGone(str) {
        return str.match(/\D/g).join('')
    }

    openModal(score) {
        this.setState(prev => ({
            ...prev,
            modal: true,
            score: score
        }))
    }

    closeModal() {
        this.setState(prev => ({
            ...prev,
            modal: false
        }))
    }

    playAudio() {
        new Audio(soal1).play()
    }

    async checkAnswer(state) {
        let arr = await Object.keys(state).filter((item, i) => state[item][0].gambar === this.digitsBeGone(item))

        if (arr > 0) {
            this.openModal(arr.length)
        } else {
            this.openModal(arr.length)
        }
    }

    render() {
        return isMobile ? (
            <DeviceOrientation lockOrientation={'landscape'}>
                <Orientation orientation='landscape' alwaysRender={false}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div className='bg-violet-500 min-h-screen px-4 md:px-8 xl:px-28 pt-4 p-4'>
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
                            <h1 className='text-white'>2. Dengarkan audio berikut lalu cocokan jawabanya</h1>
                            <button onClick={this.playAudio}><PlayIcon className='w-10 h-10 text-white' /></button>
                            <div className='flex'>
                                <div as='Content' className='w-70% flex justify-center'>
                                    {Object.keys(this.state.data).map((list, i) => (
                                        <Droppable key={list} droppableId={list}>
                                            {(provided, snapshot) => (
                                                <div as='Container' className={`w-full min-h-custom-min-height max-h-60 m-2 bg-white p-2 rounded flex justify-center border-2 border-dashed border-black`}
                                                    ref={provided.innerRef}>
                                                    {this.state.data[list].length
                                                        ? this.state.data[list].map(
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
                                                                            alt={item.gambar}
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
                                <Droppable droppableId="IMAGES" isDropDisabled={true}>
                                    {(provided, snapshot) => (
                                        <div as='bank' className={`w-30% bg-custom-text p-2 my-4 rounded shadow-custom-shadow-gray flex flex-wrap`}
                                            ref={provided.innerRef}>
                                            {IMAGES.map((item, index) => (
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
                                                                alt={item.gambar}
                                                                className='w-30% h-auto select-none p-2 mb-2 rounded'
                                                            />
                                                            {snapshot.isDragging && (
                                                                <img src={item.content} alt={item.gambar} className='clone2 !transform-none' />
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
                                <button className='bg-custom-coral text-white px-3 py-1 rounded-md shadow-click' onClick={() => this.checkAnswer(this.state.data)}>
                                    Check
                                </button>
                            </div>

                            {/* modal nilai */}
                            <Transition appear show={this.state.modal} as={Fragment}>
                                <Dialog
                                    as="div"
                                    className="fixed inset-0 z-10 overflow-y-auto"
                                    onClose={() => this.closeModal()}
                                >
                                    <div className="min-h-screen px-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                                        </Transition.Child>

                                        {/* This element is to trick the browser into centering the modal contents. */}
                                        <span
                                            className="inline-block h-screen align-middle"
                                            aria-hidden="true"
                                        >
                                            &#8203;
                                        </span>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            
                                            <div className="bg-white inline-block w-full max-w-sm my-8 overflow-hidden text-left align-middle transition-all transform bg-custom-secondary shadow-xl rounded-2xl py-10">
                                                <Dialog.Title as="h3" className="text-lg font-custom-font font-medium leading-6 text-center">
                                                    Score Game
                                                </Dialog.Title>
                                                <div className="mt-4 flex justify-between IMAGES-center">
                                                    <img className="ml-2" src="https://images2.imgbox.com/93/b8/Prt4kmtc_o.png" alt="icon" />
                                                    <h2 className='text-6xl p-2 bg-white rounded-full'>{(~~(100 / Object.keys(this.state.data).length) * this.state.score)}</h2>
                                                    <img className="mr-2" src="https://images2.imgbox.com/52/c9/bdbSBP7b_o.png" alt="icon" />
                                                </div>
                                            </div>
                                        </Transition.Child>
                                    </div>
                                </Dialog>
                            </Transition>

                        </div>
                    </DragDropContext >
                </Orientation>
                <Orientation orientation='portrait' alwaysRender={false}>
                    <div className='bg-violet-500 min-h-screen px-4 md:px-8 xl:px-28 pt-4 flex flex-col justify-center IMAGES-center'>
                        <Lottie options={defaultOptions} />
                        <h1 className='text-white font-semibold text-lg'>Tolong Putar Device anda</h1>
                    </div>
                </Orientation>
            </DeviceOrientation>

        ) : (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className='bg-violet-500 min-h-screen px-4 md:px-8 xl:px-28 pt-4'>
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
                    <h1 className='text-white'>2. Dengarkan audio berikut lalu cocokan jawabanya</h1>
                    <button onClick={this.playAudio}><PlayIcon className='w-10 h-10 text-white' /></button>
                    <div className='flex'>
                        <div as='Content' className='w-70% flex justify-center'>
                            {Object.keys(this.state.data).map((list, i) => (
                                <Droppable key={list} droppableId={list}>
                                    {(provided, snapshot) => (
                                        <div as='Container' className={`w-full min-h-custom-min-height max-h-60 m-2 bg-white p-2 rounded flex justify-center border-2 border-dashed border-black`}
                                            ref={provided.innerRef}>
                                            {this.state.data[list].length
                                                ? this.state.data[list].map(
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
                                                                    alt={item.gambar}
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
                        <Droppable droppableId="IMAGES" isDropDisabled={true}>
                            {(provided, snapshot) => (
                                <div as='bank' className={`w-30% bg-custom-text p-2 my-4 rounded shadow-custom-shadow-gray flex flex-wrap`}
                                    ref={provided.innerRef}>
                                    {IMAGES.map((item, index) => (
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
                                                        alt={item.gambar}
                                                        className='w-30% h-auto select-none p-2 mb-2 rounded'
                                                    />
                                                    {snapshot.isDragging && (
                                                        <img src={item.content} alt={item.gambar} className='clone2 !transform-none' />
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
                        <button className='bg-custom-coral text-white px-3 py-1 rounded-md shadow-click' onClick={() => this.checkAnswer(this.state.data)}>
                            Check
                        </button>
                    </div>

                    <Transition appear show={this.state.modal} as={Fragment}>
                        <Dialog
                            as="div"
                            className="fixed inset-0 z-10 overflow-y-auto"
                            onClose={() => this.closeModal()}
                        >
                            <div className="min-h-screen px-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                                </Transition.Child>

                                {/* This element is to trick the browser into centering the modal contents. */}
                                <span
                                    className="inline-block h-screen align-middle"
                                    aria-hidden="true"
                                >
                                    &#8203;
                                </span>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    
                                    <div className="bg-white inline-block w-full max-w-sm my-8 overflow-hidden text-left align-middle transition-all transform bg-custom-secondary shadow-xl rounded-2xl py-10">
                                        <Dialog.Title as="h3" className="text-lg font-custom-font font-medium leading-6 text-center">
                                            Score Game
                                        </Dialog.Title>
                                        <div className="mt-4 flex justify-between IMAGES-center">
                                            <img className="ml-2" src="https://images2.imgbox.com/93/b8/Prt4kmtc_o.png" alt="icon" />
                                            <h2 className='text-6xl p-2 bg-white rounded-full'>{(~~(100 / Object.keys(this.state.data).length) * this.state.score)}</h2>
                                            <img className="mr-2" src="https://images2.imgbox.com/52/c9/bdbSBP7b_o.png" alt="icon" />
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>

                </div>
            </DragDropContext >
        );
    }
}

export default Game2;