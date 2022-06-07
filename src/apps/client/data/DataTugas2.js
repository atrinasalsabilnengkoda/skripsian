import { v4 } from "uuid";
import soal1 from '../assets/Bab6/audio_arabic/Apel.mp3'
import soal2 from '../assets/Bab6/audio_arabic/Kelapa.mp3'
import soal3 from '../assets/Bab6/audio_arabic/Matahari.mp3'
import soal4 from '../assets/Bab6/audio_arabic/Anggur.mp3'
import soal5 from '../assets/Bab6/audio_arabic/Jeruk.mp3'
import soal6 from '../assets/Bab6/audio_bahasa/SedapMalam.mp3'
import soal7 from '../assets/Bab6/audio_bahasa/Kebun.mp3'
import soal8 from '../assets/Bab6/audio_bahasa/Mawar.mp3'
import soal9 from '../assets/Bab6/audio_bahasa/Melati.mp3'
import soal10 from '../assets/Bab6/audio_bahasa/Mangga.mp3'


const SOAL = [
    {
        data_soal: { 'I_Apel': [] },
        audio: soal1,
        data_bank: [{
            id: v4(),
            content: '/ilustrasi/I_Anggur.png',
            kata: 'I_Anggur'
        },
        {
            id: v4(),
            content: '/ilustrasi/I_Apel.png',
            kata: 'I_Apel'
        },
        {
            id: v4(),
            content: '/ilustrasi/I_SedapMalam.png',
            kata: 'I_SedapMalam'
        }]
    },
    {
        data_soal: { 'I_Kelapa': [] },
        audio: soal2,
        data_bank: [{
            id: v4(),
            content: '/ilustrasi/I_Jeruk.png',
            kata: 'I_Jeruk'
        },
        {
            id: v4(),
            content: '/ilustrasi/I_Kelapa.png',
            kata: 'I_Kelapa'
        },
        {
            id: v4(),
            content: '/ilustrasi/I_Mangga.png',
            kata: 'I_Mangga'
        }]
    },
    {
        data_soal: { 'I_Matahari': [] },
        audio: soal3,
        data_bank: [{
            id: v4(),
            content: '/ilustrasi/I_Matahari.png',
            kata: 'I_Matahari'
        },
        {
            id: v4(),
            content: '/ilustrasi/I_Mawar.png',
            kata: 'I_Mawar'
        },
        {
            id: v4(),
            content: '/ilustrasi/I_Melati.png',
            kata: 'I_Melati'
        }]
    },
    {
        data_soal: { 'I_Anggur': [] },
        audio: soal4,
        data_bank: [{
            id: v4(),
            content: '/ilustrasi/I_Pepaya.png',
            kata: 'I_Pepaya'
        },
        {
            id: v4(),
            content: '/ilustrasi/I_Pisang.png',
            kata: 'I_Pisang'
        },
        {
            id: v4(),
            content: '/ilustrasi/I_Anggur.png',
            kata: 'I_Anggur'
        }]
    },
    {
        data_soal: { 'I_Jeruk': [] },
        audio: soal5,
        data_bank: [{
            id: v4(),
            content: '/ilustrasi/I_Apel.png',
            kata: 'I_Apel'
        },
        {
            id: v4(),
            content: '/ilustrasi/I_Jeruk.png',
            kata: 'I_Jeruk'
        },
        {
            id: v4(),
            content: '/ilustrasi/I_Mawar.png',
            kata: 'I_Mawar'
        }]
    },
    {
        data_soal: { 'V_SedapMalam': [] },
        audio: soal6,
        data_bank: [{
            id: v4(),
            content: '/ilustrasi/V_Anggur.png',
            kata: 'V_Anggur'
        },
        {
            id: v4(),
            content: '/ilustrasi/V_Apel.png',
            kata: 'V_Apel'
        },
        {
            id: v4(),
            content: '/ilustrasi/V_SedapMalam.png',
            kata: 'V_SedapMalam'
        }]
    },
    {
        data_soal: { 'V_Kebun': [] },
        audio: soal7,
        data_bank: [{
            id: v4(),
            content: '/ilustrasi/V_Kebun.png',
            kata: 'V_Kebun'
        },
        {
            id: v4(),
            content: '/ilustrasi/V_Jeruk.png',
            kata: 'V_Jeruk'
        },
        {
            id: v4(),
            content: '/ilustrasi/V_Matahari.png',
            kata: 'V_Matahari'
        }]
    },
    {
        data_soal: { 'V_Mawar': [] },
        audio: soal8,
        data_bank: [{
            id: v4(),
            content: '/ilustrasi/V_Kelapa.png',
            kata: 'V_Kelapa'
        },
        {
            id: v4(),
            content: '/ilustrasi/V_Mangga.png',
            kata: 'V_Mangga'
        },
        {
            id: v4(),
            content: '/ilustrasi/V_Mawar.png',
            kata: 'V_Mawar'
        }]
    },
    {
        data_soal: { 'V_Melati': [] },
        audio: soal9,
        data_bank: [{
            id: v4(),
            content: '/ilustrasi/V_Melati.png',
            kata: 'V_Melati'
        },
        {
            id: v4(),
            content: '/ilustrasi/V_Pepaya.png',
            kata: 'V_Pepaya'
        },
        {
            id: v4(),
            content: '/ilustrasi/V_Pisang.png',
            kata: 'V_Pisang'
        }]
    },
    {
        data_soal: { 'V_Mangga': [] },
        audio: soal10,
        data_bank: [{
            id: v4(),
            content: '/ilustrasi/V_SedapMalam.png',
            kata: 'V_SedapMalam'
        },
        {
            id: v4(),
            content: '/ilustrasi/V_Mangga.png',
            kata: 'V_Mangga'
        },
        {
            id: v4(),
            content: '/ilustrasi/V_Jeruk.png',
            kata: 'V_Jeruk'
        }]
    },
];

export default SOAL