import StatusCard from 'components/StatusCard';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthService from '../../../services/auth.service';
import StoreService from '../services/store.service';
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/solid';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { Button, Pagination, HelperText, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from '@windmill/react-ui';

export default function DataToko() {
    const history = useHistory();
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const { register, formState: { errors }, handleSubmit, setValue, resetField } = useForm();
    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, setValue: setValue2, resetField: resetField2 } = useForm();

    // setup pages control for every table
    const [pageTable, setPageTable] = useState(1);

    // setup data for every table
    const [dataTable, setDataTable] = useState([]);
    const [totalResults, setTotalResults] = useState(0);

    // pagination setup
    const resultsPerPage = 10;
    // const totalResults = dataTable.length;

    // pagination change control
    function onPageChangeTable(p) {
        setPageTable(p);
    }

    useEffect(() => {
        StoreService.getAllItems().then(
        (response) => {
            const data = response.data.store;

            setTotalResults(data.length);
            setDataTable(
            data.slice(
                (pageTable - 1) * resultsPerPage,
                pageTable * resultsPerPage
            )
            );
        },
        (error) => {
            console.log("Private page", error.response);
            // Invalid token
            if (error.response && error.response.status === 401) {
            AuthService.logout();
            history.push("/login");
            window.location.reload();
            }
        }
        );
    }, [history]);

    function openModalCreate() {
        setModalCreate(true);
    }

    function closeModalCreate() {
        resetField('item_name');
        resetField('item_poin');
        resetField('image');
        setModalCreate(false);
    }

    function openModalUpdate(id) {
        id && setValue2('id_item', id);
        id && setValue2('item_name', dataTable.filter(e => e.id_item === id).map(e => e.item_name));
        id && setValue2('item_poin', dataTable.filter(e => e.id_item === id).map(e => e.item_poin));
        id && setValue2('image', dataTable.filter(e => e.id_item === id).map(e => e.image));
        setModalUpdate(true);
    }

    function closeModalUpdate() {
        setModalUpdate(false);
    }

    const getAllItems = () => {
        StoreService.getAllItems().then(
        (response) => {
            const data = response.data.store;

            setTotalResults(data.length);
            setDataTable(
            data.slice(
                (pageTable - 1) * resultsPerPage,
                pageTable * resultsPerPage
            )
            );
        },
        (error) => {
            console.log("Private page", error.response);
            // Invalid token
            if (error.response && error.response.status === 401) {
            AuthService.logout();
            history.push("/login");
            window.location.reload();
            }
        }
        );
    }

    const createItem = (data) => {
        StoreService.createItem(data).then(res => {
        getAllItems();
        closeModalCreate();
        toast.success('Data berhasil dibuat', { position: 'bottom-center'});
        }, (err) => {
        console.log(err);
        })
    }

    const updateItem = (data) => {
        StoreService.updateItem(data).then(res => {
        getAllItems();
        closeModalUpdate();
        toast.success('Data berhasil diedit', { position: 'bottom-center'});
        }, (err) => {
        console.log(err);
        })
    }

    const deleteItem = (id) => {
        StoreService.deleteItem({id_item: id}).then(res => {
        getAllItems();
        toast.success('Data berhasil dihapus', { position: 'bottom-center'});
        }, (err) => {
        console.log(err);
        })
    }
    
    return (
        <>
            <Toaster />
            <Sidebar />
            <div className="md:ml-64" />
            <div>
            <div className="bg-light-blue-500 px-3 md:px-8 h-40" />
            
            <div className="px-3 md:px-8 ml-64 -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                        <StatusCard
                            color="pink"
                            icon="trending_up"
                            title="Traffic"
                            amount="350"
                            percentage="3.48"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                        <StatusCard
                            color="orange"
                            icon="groups"
                            title="New Users"
                            amount="2,356"
                            percentage="3.48"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            date="Since last week"
                        />
                        <StatusCard
                            color="purple"
                            icon="paid"
                            title="Sales"
                            amount="924"
                            percentage="1.10"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            date="Since yesterday"
                        />
                        <StatusCard
                            color="blue"
                            icon="poll"
                            title="Perform"
                            amount="49%"
                            percentage="12"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="Since last month"
                        />
                    </div>
                </div>
            </div>

            <div className="px-3 md:px-8 ml-64 h-auto">
                <div className="container mx-auto max-w-full">
                    <Card>
                        <CardHeader color="purple" contentPosition="left">
                            <h2 className="text-white text-2xl">Data Toko</h2>
                            <div className='mb-4'>
                                <Button
                                onClick={() => openModalCreate()}
                                size={"regular"}
                                iconRight={PlusCircleIcon}
                                >
                                <span>Tambah Data</span>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-1 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                                No.
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                                Image
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                                Item Name
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                                Item Poin
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataTable.map((store, i) => (
                                        <tr key={i}>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-1 py-4 text-left">
                                                {i+1}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                <img className='object-center' src={store.image} alt="icon" />
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {store.item_name}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {store.item_poin}
                                            </th>
                                            <th>
                                                <div className='flex items-center space-x-4'>
                                                    <button onClick={() => openModalUpdate(store.id_item)} layout='link' size='icon' aria-label='Edit'>
                                                        <PencilIcon className='w-5 h-5' aria-hidden='true' />
                                                    </button>
                                                    <button onClick={() => deleteItem(store.id_item)} layout='link' size='icon' aria-label='Delete'>
                                                        <TrashIcon className='w-5 h-5' aria-hidden='true' />
                                                    </button>
                                                </div>
                                            </th>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <tfooter>
                                    <Pagination
                                        totalResults={totalResults}
                                        resultsPerPage={resultsPerPage}
                                        onChange={onPageChangeTable}
                                        label='Table navigation'
                                    />
                                </tfooter>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <Modal isOpen={modalCreate} onClose={closeModalCreate}>
                <form onSubmit={handleSubmit(createItem)}>
                <ModalHeader>Form Tambah Data Toko</ModalHeader>
                <ModalBody className='mt-4'>
                    <div>
                    <Label>
                        <span>Nama Item</span>
                        <Input
                        {...register("item_name", { required: 'Item Name is required' })}
                        type='text'
                        placeholder='Masukan nama item'
                        className='mt-2'
                        />
                    </Label>
                    {errors.item_name?.message && (
                        <HelperText valid={false}>{errors.item_name?.message}</HelperText>
                    )}

                    <Label className='mt-2'>
                        <span>Item Poin</span>
                        <Input
                        {...register("item_poin", { required: 'Item Poin is required' })}
                        type='text'
                        placeholder='Masukan poin item'
                        className='mt-2'
                        />
                    </Label>
                    {errors.item_poin?.message && (
                        <HelperText valid={false}>{errors.item_poin?.message}</HelperText>
                    )}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className='hidden sm:block'>
                    <button layout='outline' onClick={closeModalCreate}>
                        Batal
                    </button>
                    </div>
                    <div className='hidden sm:block'>
                    <button type='submit'>Simpan</button>
                    </div>
                    <div className='block w-full sm:hidden'>
                    <button block size='large' layout='outline' onClick={closeModalCreate}>
                        Batal
                    </button>
                    </div>
                    <div className='block w-full sm:hidden'>
                    <button type='submit' block size='large'>
                        Simpan
                    </button>
                    </div>
                </ModalFooter>
                </form>
            </Modal>
            {/* Modal update */}
            <Modal isOpen={modalUpdate} onClose={closeModalUpdate}>
                <form onSubmit={handleSubmit2(updateItem)}>
                <ModalHeader>Form Edit Data Toko</ModalHeader>
                <ModalBody className='mt-4'>
                    <div>
                    <Input {...register2('id_item')} type='hidden' />
                    <Label>
                        <span>Item Name</span>
                        <Input
                        {...register2("item_name", { required: 'Item Name is required' })}
                        type='text'
                        placeholder='Masukan nama item'
                        className='mt-2'
                        />
                    </Label>
                    {errors2.item_name?.message && (
                        <HelperText valid={false}>{errors2.item_name?.message}</HelperText>
                    )}

                    <Label>
                        <span>Item Poin</span>
                        <Input
                        {...register2("item_poin", { required: 'Item Poin is required' })}
                        type='text'
                        placeholder='Masukan poin item'
                        className='mt-2'
                        />
                    </Label>
                    {errors2.item_poin?.message && (
                        <HelperText valid={false}>{errors2.item_poin?.message}</HelperText>
                    )}

                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className='hidden sm:block'>
                    <button layout='outline' onClick={closeModalUpdate}>
                        Batal
                    </button>
                    </div>
                    <div className='hidden sm:block'>
                    <button type='submit'>Simpan</button>
                    </div>
                    <div className='block w-full sm:hidden'>
                    <button block size='large' layout='outline' onClick={closeModalUpdate}>
                        Batal
                    </button>
                    </div>
                    <div className='block w-full sm:hidden'>
                    <button type='submit' block size='large'>
                        Simpan
                    </button>
                    </div>
                </ModalFooter>
                </form>
            </Modal>
            <Footer />
            </div>
        </>
    );
}
