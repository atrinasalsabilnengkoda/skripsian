import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Icon from '@material-tailwind/react/Icon';
import H6 from '@material-tailwind/react/Heading6';
import React from 'react';

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    return (
        <>
            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <a
                        href="https://material-tailwind.com?ref=mtd"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-center w-full inline-block"
                    >
                        <H6 color="gray">Admin Dashboard</H6>
                    </a>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/dashboard"
                                    exact
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 ">
                                <NavLink
                                    to="/dataGuru"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="group" size="2xl" />
                                    Data Guru
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/dataSiswa"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="class" size="2xl" />
                                    Data Siswa
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/maps"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="grade" size="2xl" />
                                    Data Nilai Siswa
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 ">
                                <NavLink
                                    to="/dataTugas"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="assignment" size="2xl" />
                                    Data Tugas
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 ">
                                <NavLink
                                    to="/dataSoal"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="question_answer" size="2xl" />
                                    Data Soal
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/dataToko"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="store" size="2xl" />
                                    Data Toko
                                </NavLink>
                            </li>
                            <li className="px-4 rounded-lg mb-2 text-gray-700">
                                <a
                                    href="https://demos.creative-tim.com/material-tailwind-kit-react/#/profile"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3"
                                >
                                    <Icon name="account_circle" size="2xl" />
                                    Profile Page
                                </a>
                            </li>
                            <li className="rounded-lg mb-2 text-gray-700">
                                <NavLink
                                    to="/logout"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="logout" size="2xl" />
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
