import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails(){
      try{
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        console.log(data);

        if(data){
          const {description, title, covers, subject_places, subject_times, subjects, key} = data;
          const newBook = {
            description: description ? description.value : "No se encontró descripción",
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(", ") : "No se encontraron lugares",
            subject_times : subject_times ? subject_times.join(", ") : "No se encontraron periodos de tiempo",
            subjects: subjects ? subjects.join(", ") : "No se encontraron temas",
            key: key ? key : null
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if(loading) return <Loading />;

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size = {22} />
          <span className='fs-18 fw-6'>Volver</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src = {book?.cover_img} alt = "Portada" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Lugares Temáticos: </span>
              <span className='text-italic'>{book?.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Peridos de tiempo: </span>
              <span className='text-italic'>{book?.subject_times}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Temas: </span>
              <span>{book?.subjects}</span>
            </div>
            
            
            <div className='book-details-item'>
              <span className='fw-6'>Enlace: </span>
              <span>
                {book?.key ? (
                  <a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">
                    {`https://openlibrary.org${book.key}`}
                  </a>
                ) : "Enlace no encontrado"}
              </span>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookDetails
