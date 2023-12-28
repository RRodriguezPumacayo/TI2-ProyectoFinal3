import React from 'react';
import "./About.css";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>Acerca de nosotros</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-text'>
            <p className='fs-17'>Este proyecto tiene como objetivo brindar a estudiantes de diversas regiones una educación más accesible al proporcionar un fácil acceso a libros virtuales. La aplicación de biblioteca de libros está construida en React y utiliza las APIs de Open Library Subjects y Search.</p>
            <p className='fs-17'></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
