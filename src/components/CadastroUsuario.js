import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CadastroUsuario({ onLogin }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const navigate = useNavigate();
  const [modo, setModo] = useState('entrar');
  // Verifica se já existe usuário cadastrado
  React.useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
    if (Object.keys(usuarios).length > 0) {
      setModo('entrar');
    } else {
      setModo('cadastrar');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login || !senha) {
      setMensagem('Preencha todos os campos.');
      return;
    }
    const key = 'usuarios';
    const usuarios = JSON.parse(localStorage.getItem(key) || '{}');
    if (modo === 'cadastrar') {
      if (usuarios[login]) {
        window.alert('Já existe um cadastro com esse usuário. Faça login.');
        setMensagem('Usuário já existe. Faça login.');
        setModo('entrar');
        return;
      }
      usuarios[login] = { senha };
      localStorage.setItem(key, JSON.stringify(usuarios));
      setMensagem('Usuário cadastrado com sucesso! Faça login.');
      setModo('entrar');
      setLogin('');
      setSenha('');
      return;
    } else {
      if (!usuarios[login] || usuarios[login].senha !== senha) {
        setMensagem('Credenciais inválidas.');
        return;
      }
      setMensagem('Login realizado com sucesso!');
      if (onLogin) onLogin(login);
      navigate('/registro');
    }
  };

  // Cores baseadas na imagem: vinho (#7a183a), branco, verde suave (#6dbf6d)
  const mainColor = '#7a183a';
  const accentColor = '#6dbf6d'; // verde mais suave
  const bgGradient = `linear-gradient(135deg, #7a183a 60%, #6dbf6d 100%)`;

  return (
    <div style={{
      maxWidth: 400,
      margin: '40px auto auto',
      padding: 24,
      borderRadius: 18,
      boxShadow: '0 4px 24px 0 rgba(122,24,58,0.15)',
      background: bgGradient,
      color: '#fff'
    }}>
      <img
        src="/img/imagem-glicemia.jpg"
        alt="Glicemia"
        style={{ width: '120px', display: 'block', margin: '0 auto 16px', borderRadius: '50%', boxShadow: '0 2px 8px #0002' }}
        onError={e => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/120x120?text=Sem+Imagem';
        }}
      />
  <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#fff', letterSpacing: 1 }}>GlucCare</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button type="button" onClick={() => setModo('entrar')} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: modo === 'entrar' ? accentColor : 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Entrar</button>
        <button type="button" onClick={() => { setModo('cadastrar'); navigate('/cadastro-completo'); }} style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: modo === 'cadastrar' ? accentColor : 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Cadastrar</button>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="login" style={{ color: '#fff', fontWeight: 500 }}>Login:</label>
          <input
            id="login"
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: 8,
              border: '1.5px solid #fff',
              outline: 'none',
              fontSize: 16,
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              transition: 'border 0.2s',
            }}
            onFocus={e => e.target.style.border = `1.5px solid ${accentColor}`}
            onBlur={e => e.target.style.border = '1.5px solid #fff'}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' }}>
          <label htmlFor="senha" style={{ color: '#fff', fontWeight: 500 }}>Senha:</label>
          <input
            id="senha"
            type={showSenha ? 'text' : 'password'}
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: 8,
              border: '1.5px solid #fff',
              outline: 'none',
              fontSize: 16,
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              transition: 'border 0.2s',
            }}
            onFocus={e => e.target.style.border = `1.5px solid ${accentColor}`}
            onBlur={e => e.target.style.border = '1.5px solid #fff'}
          />
          <button
            type="button"
            onClick={() => setShowSenha(s => !s)}
            style={{
              position: 'absolute',
              right: 10,
              top: 32,
              background: 'none',
              border: 'none',
              color: accentColor,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600
            }}
            tabIndex={-1}
            aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showSenha ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        <button type="submit" style={{ marginTop: 8, padding: '12px', borderRadius: 8, border: 'none', background: accentColor, color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #0002', transition: 'background 0.2s, transform 0.1s' }} onMouseOver={e => e.target.style.background = mainColor} onMouseOut={e => e.target.style.background = accentColor} onMouseDown={e => e.target.style.transform = 'scale(0.97)'} onMouseUp={e => e.target.style.transform = 'scale(1)'}>
          {modo === 'entrar' ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>
      {mensagem && <p style={{ textAlign: 'center', marginTop: 18, color: '#fff', background: 'rgba(53,122,56,0.7)', borderRadius: 8, padding: 8 }}>{mensagem}</p>}
    </div>
  );
}

export default CadastroUsuario;
