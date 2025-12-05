

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import CadastroUsuario from './components/CadastroUsuario';
import ContatosEmergencia from './components/ContatosEmergencia';
import GraficoGlicemia from './components/GraficoGlicemia';
import MiniDietaAutomatica from './components/MiniDietaAutomatica';
import Dietas from './components/Dietas';
import RegistroGlicemia from './components/RegistroGlicemia';
import FormularioCadastral from './components/FormularioCadastral';
import { supabase } from './supabaseClient';


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
      <Link to="/dietas" style={{ color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Dietas</Link>
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

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (data && data.session && data.session.user) {
        setUsuario(data.session.user.email || data.session.user.id);
      }
    };
    init();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && session.user) {
        setUsuario(session.user.email || session.user.id);
      } else {
        setUsuario(null);
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Função para logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
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
          <Route path="/cadastro-completo" element={
            <FormularioCadastral usuario={usuario} onFinish={user => setUsuario(user)} />
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
                  <Route path="mini-dieta" element={
                    <MiniDietaAutomatica ultimoValor={0} />
                  } />
                  <Route path="dietas" element={<Dietas />} />
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
