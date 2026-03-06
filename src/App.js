import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ListClientesComponent from './components/ListClientesComponent';
import HeaderComponent from './components/HeaderComponent';
import AddClienteComponent from './components/AddClienteComponent';
import AddArticuloComponent from './components/AddArticuloComponent';
import HeaderArticuloComponent from './components/HeaderArticuloComponent';
import ListArticulosComponent from './components/ListArticulosComponent';


const AppLayout = ({ children }) => {
  const location = useLocation(); 
  const esRutaArticulos = location.pathname.includes('articulo');

  return (
    <div className="d-flex flex-column min-vh-100 bg-light"> {}
      <header className="sticky-top shadow-sm bg-white">
        <HeaderComponent />
        {}
        {esRutaArticulos && (
          <div className="bg-white border-top border-bottom py-2 shadow-sm animate__animated animate__fadeInDown">
            <HeaderArticuloComponent />
          </div>
        )}
      </header>
      
      <main className="container flex-grow-1 py-4">
        {}
        <section className="bg-white rounded shadow-sm p-4 border">
          {children}
        </section>
      </main>

      
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          {/* Rutas de Clientes (Backend 8080) */}
          <Route exact path='/' element={<ListClientesComponent />} />
          <Route path='/clientes' element={<ListClientesComponent />} />
          <Route path='/add-cliente' element={<AddClienteComponent />} />
          <Route path='/edit-cliente/:id' element={<AddClienteComponent />} />

          {/* Rutas de Artículos (Backend 8081) */}
          <Route path='/articulos' element={<ListArticulosComponent />} /> 
          <Route path='/add-articulo' element={<AddArticuloComponent />} />
          <Route path='/edit-articulo/:id' element={<AddArticuloComponent />} /> 
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
