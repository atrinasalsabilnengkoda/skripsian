import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthService from "../../../services/auth.service";
import AssigmentService from "../../admin/services/assigment.service";
import StatusCard from 'components/StatusCard';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, HelperText } from "@windmill/react-ui";
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/solid';
import toast, { Toaster } from "react-hot-toast";

function DataTugas() {
    const [dataTugas, setDataTugas] = useState([]);
    const [dataSoal, setdataSoal] = useState([]);

    const [modalCreate, setModalCreate] = useState(false)
    const [modalUpdate, setModalUpdate] = useState(false)

    const history = useHistory();
    const { register, formState: { errors }, handleSubmit,resetField } = useForm();
    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, setValue: setValue2 } = useForm();

    useEffect(() => {
        AssigmentService.getAllAssigments().then(
        (response) => {
            setDataTugas(response.data.assigment);
            setdataSoal(response.data.question);
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
        resetField('assigment_name');
        setModalCreate(false);
    }

    function openModalUpdate(id) {
        id && setValue2('id_assigment', id);
        id && setValue2('assigment_name', dataTugas.filter(e => e.id_assigment === id).map(e => e.assigment_name));
        setModalUpdate(true);
    }

    function closeModalUpdate() {
        setModalUpdate(false);
    }

    const getAllAssigments = () => {
        AssigmentService.getAllAssigments().then(
        (response) => {
            setDataTugas(response.data.assigment);
            setdataSoal(response.data.question);
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

    const createAssigment = (data) => {
        AssigmentService.createAssigment(data).then(res => {
        getAllAssigments();
        closeModalCreate();
        toast.success('Data berhasil dibuat', { position: 'bottom-center'});
        }, (err) => {
        console.log(err);
        })
    }

    const updateAssigment = (data) => {
        AssigmentService.updateAssigment(data).then(res => {
        getAllAssigments();
        closeModalUpdate();
        toast.success('Data berhasil diedit', { position: 'bottom-center'});
        }, (err) => {
        console.log(err);
        })
    }

    const deleteAssigment = (id) => {
        AssigmentService.deleteAssigment({id_assigment: id}).then(res => {
        getAllAssigments();
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
                                {/* Card */}

                                {dataTugas.map((el, index) => (
                                <div key={index} className='w-full md:w-1/4 md:mr-4 mb-4 text-left bg-blue-600 shadow-md rounded-lg dark:bg-gray-800'>
                                    <div className='flex justify-end'>
                                    <Button onClick={() => openModalUpdate(el.id_assigment)} size='small' icon={PencilIcon} />
                                    <Button onClick={() => deleteAssigment(el.id_assigment)} size='small' icon={TrashIcon} />
                                    </div>

                                    <Link to={`/app/detailtugas/${el.id_assigment}`}>
                                    <div className="px-6 pb-4">
                                        <h2 className='text-xl font-medium text-white dark:text-gray-300'>
                                            {el.assigment_name}
                                        </h2>
                                        <p className='text-gray-100 dark:text-gray-400 my-2'>
                                            Kategori Game :{" "}
                                        </p>
                                        <div className='flex'>
                                            {dataSoal.filter((e) => e.id_assigment === el.id_assigment).some((e) => e.question_type === '1') ?
                                            <img
                                                className='w-10 mr-2'
                                                src='/ilustrasi_1.svg'
                                                alt='ilustrasibuku'
                                            /> : ''
                                            }

                                            {dataSoal.filter((e) => e.id_assigment === el.id_assigment).some((e) => e.question_type === '2') ?
                                            <img
                                                className='w-10 mr-2'
                                                src='/ilustrasi_2.svg'
                                                alt='ilustrasiheadphone'
                                            /> : ''
                                            }
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            {/* Modal Create */}
            <Modal isOpen={modalCreate} onClose={closeModalCreate}>
                <form onSubmit={handleSubmit(createAssigment)}>
                <ModalHeader>Form Tambah Tugas Baru</ModalHeader>
                <ModalBody className="mt-4">
                <div>
                    <Label>
                    <span>Nama Tugas</span>
                    <Input {...register('assigment_name', { required: 'Nama Tugas is required' })} type="text" placeholder="Masukan Nama Tugas" className="mt-2" />
                    </Label>
                    {errors.assigment_name?.message && (
                    <HelperText valid={false}>{errors.assigment_name?.message}</HelperText>
                    )}

                </div>
                </ModalBody>
                <ModalFooter>
                <div className="hidden sm:block">
                    <Button layout="outline" onClick={closeModalCreate}>
                    Batal
                    </Button>
                </div>
                <div className="hidden sm:block">
                    <Button type="submit">Buat</Button>
                </div>
                <div className="block w-full sm:hidden">
                    <Button block size="large" layout="outline" onClick={closeModalCreate}>
                    Batal
                    </Button>
                </div>
                <div className="block w-full sm:hidden">
                    <Button type="submit" block size="large">
                    Buat
                    </Button>
                </div>
                </ModalFooter>
                </form>
            </Modal>
            {/* Modal Update */}
            <Modal isOpen={modalUpdate} onClose={closeModalUpdate}>
                <form onSubmit={handleSubmit2(updateAssigment)}>
                <ModalHeader>Form Edit Tugas</ModalHeader>
                <ModalBody className="mt-4">
                <div>
                    <Input {...register2('id_assigment')} type="hidden" />
                    <Label>
                    <span>Nama Tugas</span>
                    <Input {...register2('assigment_name', { required: 'Nama Tugas is required' })} type="text" placeholder="Masukan Nama Tugas" className="mt-2" />
                    </Label>
                    {errors2.assigment_name?.message && (
                    <HelperText valid={false}>{errors2.assigment_name?.message}</HelperText>
                    )}

                </div>
                </ModalBody>
                <ModalFooter>
                <div className="hidden sm:block">
                    <Button layout="outline" onClick={closeModalUpdate}>
                    Batal
                    </Button>
                </div>
                <div className="hidden sm:block">
                    <Button type="submit">Simpan</Button>
                </div>
                <div className="block w-full sm:hidden">
                    <Button block size="large" layout="outline" onClick={closeModalUpdate}>
                    Batal
                    </Button>
                </div>
                <div className="block w-full sm:hidden">
                    <Button type="submit" block size="large">
                    Simpan
                    </Button>
                </div>
                </ModalFooter>
                </form>
            </Modal>
            <Footer />
            </div>
        </>
    );
}
export default DataTugas;