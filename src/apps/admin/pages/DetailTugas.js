import React, { useState, useEffect } from "react";
import { NavLink, Link, useParams, useHistory } from "react-router-dom";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/solid';
import toast, { Toaster } from "react-hot-toast";
import QuestionService from "../../admin/services/question.service";
import AuthService from "../../../services/auth.service";

function DetailTugas() {

  const { uid } = useParams();
  const history = useHistory();
  const [dataSoal, setdataSoal] = useState([]);
  const [namaTugas, setNamaTugas] = useState('');

  useEffect(() => {
    QuestionService.getQuestionByIdAssigment(uid).then(
      (response) => {
        setNamaTugas(response.data.data.length ? response.data.data[0].assigment_name : '');
        setdataSoal(response.data.data);
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
  }, [history, uid]);

  const getAllQuestions = () => {
    QuestionService.getQuestionByIdAssigment(uid).then(
      (response) => {
        setNamaTugas(response.data.data[0].assigment_name);
        setdataSoal(response.data.data);
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

  const deleteQuestion = (id) => {
    QuestionService.deleteQuestion({ id_question: id }).then(res => {
      getAllQuestions();
      toast.success('Data berhasil dihapus', { position: 'bottom-center' });
    }, (err) => {
      console.log(err);
    })
  }

  const navigate = (question_type, data) => {
    history.push(`/app/editsoal/${question_type}`, { data: data });
    // window.location.reload();
  }

  return (
    <>
      <Toaster />

      <div className='mb-4'>
        <Button
          tag={Link}
          to={`/app/tambahsoal/${uid}`}
          size={"regular"}
          iconRight={PlusCircleIcon}
        >
          <span>Tambah Data</span>
        </Button>
      </div>

      <div className='flex flex-wrap py-3 mb-8'>

        {/* Card */}
        {dataSoal.map((el, index) => (
          <div key={index} className='w-full md:w-1/4 md:mr-4 mb-4 text-left bg-blue-300 shadow-md rounded-lg dark:bg-gray-800'>
            <div className='flex justify-end'>
              <Button onClick={() => navigate(el.question_type, el)} size='small' layout='link' icon={PencilIcon} />
              <Button onClick={() => deleteQuestion(el.id_question)} size='small' layout='link' icon={TrashIcon} />
            </div>
            <div className="px-6 pb-4">
              <h2 className='text-xl font-medium text-white dark:text-gray-300'>
                Soal {index + 1}
              </h2>
              <p className='text-gray-100 dark:text-gray-400 my-2'>
                Kategori Game :{" "}
              </p>
              <div className='flex'>
                <img
                  className='w-10 mr-2'
                  src={`/ilustrasi_${el.question_type}.svg`}
                  alt='ilustrasi'
                />
              </div>
            </div>
          </div>
        ))}

      </div>
    </>
  );
}

export default DetailTugas;
