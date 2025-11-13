

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import CadastroUsuario from './components/CadastroUsuario';
import ContatosEmergencia from './components/ContatosEmergencia';
import GraficoGlicemia from './components/GraficoGlicemia';
import MiniDietaAutomatica from './components/MiniDietaAutomatica';
import RegistroGlicemia from './components/RegistroGlicemia';
import FormularioCadastral from './components/FormularioCadastral';


import { useNavigate } from 'react-router-dom';

function Menu({ onLogout }) {
  const navigate = useNavigate();
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      gap: 16,
      background: '#7a183a',
      padding: 12,
      borderRadius: 8,
      margin: '24px auto 24px auto',
      maxWidth: 600
    }}>
      <Link to="/registro" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Registro</Link>
      <Link to="/grafico" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Gráfico</Link>
      <Link to="/mini-dieta" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Mini Dieta</Link>
      <Link to="/contatos" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Contatos Emergência</Link>
      <button
        onClick={() => { onLogout(); navigate('/'); }}
        style={{ color: '#fff', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: 16 }}
      >Sair</button>
    </nav>
  );
}

function App() {
  const [usuario, setUsuario] = useState(null);
  const [registros, setRegistros] = useState([]);

  // Função para logout
  const handleLogout = () => {
    setUsuario(null);
    setRegistros([]);
  };

  // Wrapper para proteger rotas
  function PrivateRoute({ children }) {
    return usuario ? children : <Navigate to="/" />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            usuario ? <Navigate to="/registro" /> :
            <CadastroUsuario onLogin={user => setUsuario(user)} />
          } />
          <Route path="/*" element={
            <PrivateRoute>
              <>
                <Menu onLogout={handleLogout} />
                <Routes>
                  <Route path="registro" element={
                    <RegistroGlicemia usuario={usuario} registros={registros} setRegistros={setRegistros} />
                  } />
                  <Route path="grafico" element={
                    <GraficoGlicemia registros={registros} />
                  } />
                  <Route path="cadastro-completo" element={
                    <FormularioCadastral usuario={usuario} />
                  } />
                  <Route path="mini-dieta" element={
                    <MiniDietaAutomatica ultimoValor={0} />
                  } />
                  <Route path="contatos" element={
                    <ContatosEmergencia usuario={usuario} risco={"-"} />
                  } />
                  <Route path="*" element={<Navigate to="/registro" />} />
                </Routes>
              </>
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
