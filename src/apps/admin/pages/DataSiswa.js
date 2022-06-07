import StatusCard from 'components/StatusCard';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthService from '../../../services/auth.service';
import UserService from '../../../services/user.service';
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/solid';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { Button, Pagination, HelperText, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from '@windmill/react-ui';

export default function DataSiswa() {
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

    function openModalCreate() {
        setModalCreate(true);
    }

    function closeModalCreate() {
        resetField('name');
        resetField('username');
        resetField('class');
        resetField('attendees_no');
        resetField('password');
        setModalCreate(false);
    }

    function openModalUpdate(id) {
        setValue2('id_user', id);
        setValue2('edit_name', dataTable.filter(e => e.id_user === id).map(e => e.name));
        setValue2('edit_username', dataTable.filter(e => e.id_user === id).map(e => e.username));
        setValue2('edit_class', dataTable.filter(e => e.id_user === id).map(e => e.class));
        setValue2('edit_attendees_no', dataTable.filter(e => e.id_user === id).map(e => e.attendees_no));
        setModalUpdate(true);
    }

    function closeModalUpdate() {
        setModalUpdate(false);
    }

    // on page change, load new sliced data
    // here you would make another server request for new data

    useEffect(() => {
        UserService.getAllUsers().then(
        (response) => {
            const data = response.data.data.filter(e => e.role === '2');

            setTotalResults(data.length);
            setDataTable(
            data.slice(
                (pageTable - 1) * resultsPerPage,
                pageTable * resultsPerPage
            )
            );
        },
        (error) => {
            toast.error(error, { position: 'bottom-center' })
            console.log("Private page", error.response);
            // Invalid token
            if (error.response && error.response.status === 401) {
            AuthService.logout();
            history.push("/login");
            window.location.reload();
            }
        }
        );
    }, [history, pageTable]);

    const getAllUsers = () => {
        UserService.getAllUsers().then(
        (response) => {
            const data = response.data.data.filter(e => e.role === '1');

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

    const createUser = (data) => {
        UserService.createUser({...data, role: 1}).then(res => {
        getAllUsers();
        closeModalCreate();
        toast.success('Data berhasil dibuat', { position: 'bottom-center'});
        }, (err) => {
        console.log(err);
        })
    };

    const updateUser = (data) => {
        const sendData = {
        id_user: data.id_user,
        name: data.edit_name,
        username: data.edit_username,
        class: data.edit_class,
        attendees_no: data.edit_attendees_no,
        }

        console.log(data);
        console.log(sendData);
        console.log(JSON.stringify(sendData));
        console.log(JSON.parse(JSON.stringify(sendData)));

        UserService.updateUser(sendData).then(res => {
        getAllUsers();
        closeModalUpdate();
        toast.success('Data berhasil diedit', { position: 'bottom-center'});
        }, (err) => {
        console.log(err);
        })
    }

    const deleteUser = (id) => {
        UserService.deleteUser({id_user: id}).then(res => {
        console.log(res);
        getAllUsers();
        toast.success('Data berhasil dihapus', { position: 'bottom-center'});
        }, (err) => {
        console.log(err);
        })
    }

    useEffect(() => {
        // console.log(totalResults);
        // console.log(errors);
        // console.log(register);
        // console.log(dataTable);
    }, [totalResults, dataTable, errors, register]);
    
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
                            <h2 className="text-white text-2xl">Data Siswa</h2>
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
                                                Name
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                                Username
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                                Class
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                                Attendees No
                                            </th>
                                            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataTable.map((user, i) => (
                                        <tr key={i}>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-1 py-4 text-left">
                                                {i+1}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                <img className='object-center' src="../cewe.png" alt="icon" />
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {user.name}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {user.username}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {user.class}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {user.attendees_no}
                                            </th>
                                            <th>
                                                <div className='flex items-center space-x-4'>
                                                    <button onClick={() => openModalUpdate(user.id_user)} layout='link' size='icon' aria-label='Edit'>
                                                        <PencilIcon className='w-5 h-5' aria-hidden='true' />
                                                    </button>
                                                    <button onClick={() => deleteUser(user.id_user)} layout='link' size='icon' aria-label='Delete'>
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
                <form onSubmit={handleSubmit(createUser)}>
                <ModalHeader>Form Tambah Data Siswa</ModalHeader>
                <ModalBody className='mt-4'>
                    <div>
                    <Label>
                        <span>Nama</span>
                        <Input
                        {...register("name", { required: 'name is required' })}
                        type='text'
                        placeholder='Masukan name'
                        className='mt-2'
                        />
                    </Label>
                    {errors.name?.message && (
                        <HelperText valid={false}>{errors.name?.message}</HelperText>
                    )}

                    <Label className='mt-2'>
                        <span>Username</span>
                        <Input
                        {...register("username", { required: 'Username is required' })}
                        type='text'
                        placeholder='Masukan Username'
                        className='mt-2'
                        />
                    </Label>
                    {errors.username?.message && (
                        <HelperText valid={false}>{errors.username?.message}</HelperText>
                    )}

                    <Label className='mt-2'>
                        <span>Password</span>
                        <Input
                        {...register("password", { required: 'Password is required' })}
                        type='password'
                        placeholder='Masukan Password'
                        className='mt-2'
                        />
                    </Label>
                    {errors.password?.message && (
                        <HelperText valid={false}>{errors.password?.message}</HelperText>
                    )}

                    <Label className='mt-2'>
                        <span>Class</span>
                        <Input
                        {...register("class", { required: 'Class is required' })}
                        type='text'
                        placeholder='Masukan Class'
                        className='mt-2'
                        />
                    </Label>
                    {errors.class?.message && (
                        <HelperText valid={false}>{errors.class?.message}</HelperText>
                    )}

                    <Label className='mt-2'>
                        <span>Attendees No</span>
                        <Input
                        {...register("attendees_no", { required: 'Attendees No is required' })}
                        type='text'
                        placeholder='Masukan Attendees No'
                        className='mt-2'
                        />
                    </Label>
                    {errors.attendees_no?.message && (
                        <HelperText valid={false}>{errors.attendees_no?.message}</HelperText>
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
                <form onSubmit={handleSubmit2(updateUser)}>
                <ModalHeader>Form Edit Data Siswa</ModalHeader>
                <ModalBody className='mt-4'>
                    <div>
                    <Input {...register2('id_user')} type='hidden' />
                    <Label>
                        <span>Nama</span>
                        <Input
                        {...register2("edit_name", { required: 'Name is required' })}
                        type='text'
                        placeholder='Masukan name'
                        className='mt-2'
                        />
                    </Label>
                    {errors2.edit_name?.message && (
                        <HelperText valid={false}>{errors2.edit_name?.message}</HelperText>
                    )}

                    <Label>
                        <span>Username</span>
                        <Input
                        {...register2("edit_username", { required: 'Username is required' })}
                        type='text'
                        placeholder='Masukan Username'
                        className='mt-2'
                        />
                    </Label>
                    {errors2.edit_username?.message && (
                        <HelperText valid={false}>{errors2.edit_username?.message}</HelperText>
                    )}

                    <Label>
                        <span>Class</span>
                        <Input
                        {...register2("edit_class", { required: 'Class is required' })}
                        type='text'
                        placeholder='Masukan Class'
                        className='mt-2'
                        />
                    </Label>
                    {errors2.edit_class?.message && (
                        <HelperText valid={false}>{errors2.edit_class?.message}</HelperText>
                    )}

                    <Label>
                        <span>Attendees No</span>
                        <Input
                        {...register2("edit_attendees_no", { required: 'Attendees No is required' })}
                        type='text'
                        placeholder='Masukan Attendees No'
                        className='mt-2'
                        />
                    </Label>
                    {errors2.edit_attendees_no?.message && (
                        <HelperText valid={false}>{errors2.edit_attendees_no?.message}</HelperText>
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
