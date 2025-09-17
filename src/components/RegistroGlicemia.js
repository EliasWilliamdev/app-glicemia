import React, { useState } from 'react';


function RegistroGlicemia({ usuario, registros, setRegistros }) {
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');

  const mainColor = '#7a183a';
  const accentColor = '#a3d9a5'; // verde mais suave
  const bgGradient = `linear-gradient(135deg, #7a183a 60%, #a3d9a5 100%)`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valor) {
      const novoRegistro = {
        usuario,
        valor: parseFloat(valor),
        data: new Date().toLocaleString()
      };
      setRegistros([...registros, novoRegistro]);
      setMensagem('Valor registrado com sucesso!');
      setValor('');
    } else {
      setMensagem('Informe o valor da glicemia.');
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: 'auto',
      padding: 24,
      borderRadius: 18,
      boxShadow: '0 4px 24px 0 rgba(122,24,58,0.15)',
      background: bgGradient,
      color: '#fff',
      marginTop: 40
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#fff', letterSpacing: 1 }}>Registro de Valor da Glicemia</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="valor" style={{ color: '#fff', fontWeight: 500 }}>Valor da Glicemia (mg/dL):</label>
          <input
            id="valor"
            type="number"
            value={valor}
            onChange={e => setValor(e.target.value)}
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
        <button
          type="submit"
          style={{
            marginTop: 8,
            padding: '12px',
            borderRadius: 8,
            border: 'none',
            background: accentColor,
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #0002',
            transition: 'background 0.2s, transform 0.1s',
          }}
          onMouseOver={e => e.target.style.background = mainColor}
          onMouseOut={e => e.target.style.background = accentColor}
          onMouseDown={e => e.target.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.target.style.transform = 'scale(1)'}
        >
          Registrar
        </button>
      </form>
      {mensagem && <p style={{ textAlign: 'center', marginTop: 18, color: '#fff', background: 'rgba(53,122,56,0.7)', borderRadius: 8, padding: 8 }}>{mensagem}</p>}
      <h3 style={{ marginTop: 32, color: '#fff', textAlign: 'center' }}>Histórico</h3>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
        {registros.map((r, i) => (
          <li key={i} style={{
            background: 'rgba(255,255,255,0.10)',
            borderRadius: 8,
            padding: 8,
            marginBottom: 6,
            color: '#fff',
            fontSize: 15
          }}>{r.data}: <strong>{r.valor} mg/dL</strong></li>
        ))}
      </ul>
    </div>
  );
}

export default RegistroGlicemia;
