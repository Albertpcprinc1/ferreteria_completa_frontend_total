import React from 'react'

const FooterComponent = () => {
  return (
    <footer className='footer mt-auto'>
        <div className='container text-center'>
            <span className='text-muted small'>
                &copy; {new Date().getFullYear()} Sistema de Gestión — 
                <strong> Ing. Albert Huerta Morales</strong>
            </span>
        </div>
    </footer>
  )
}


export default FooterComponent
