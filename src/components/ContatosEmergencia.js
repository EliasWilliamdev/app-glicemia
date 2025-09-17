import React, { useState } from 'react';


function ContatosEmergencia({ usuario, risco }) {
  const [contatos, setContatos] = useState(['', '', '']);
  const [mensagem, setMensagem] = useState('');

  const mainColor = '#7a183a';
  const accentColor = '#a3d9a5';
  const bgGradient = `linear-gradient(135deg, #7a183a 60%, #a3d9a5 100%)`;

  const handleChange = (index, value) => {
    const novosContatos = [...contatos];
    novosContatos[index] = value;
    setContatos(novosContatos);
  };

  const mensagemPadrao = `Alerta: O usuário ${usuario} está com risco de ${risco} de glicemia. Fique atento para possíveis sintomas de hiperglicemia ou hipoglicemia.`;

  const enviarWhatsApp = (numero) => {
    const texto = encodeURIComponent(mensagemPadrao);
    window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
  };

  const handleEnviar = () => {
    contatos.forEach(numero => {
      if (numero) enviarWhatsApp(numero);
    });
    setMensagem('Alertas enviados via WhatsApp!');
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
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#fff', letterSpacing: 1 }}>Contatos de Emergência</h2>
      <form onSubmit={e => { e.preventDefault(); handleEnviar(); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ color: '#fff', fontWeight: 500 }}>Contato {i+1} (WhatsApp):</label>
            <input
              type="tel"
              value={contatos[i]}
              onChange={e => handleChange(i, e.target.value)}
              placeholder="Ex: 5511999999999"
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
        ))}
        <button
          type="submit"
          style={{
            marginTop: 8,
            padding: '12px',
            borderRadius: 8,
            border: 'none',
            background: accentColor,
            color: mainColor,
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #0002',
            transition: 'background 0.2s, transform 0.1s',
          }}
          onMouseOver={e => { e.target.style.background = mainColor; e.target.style.color = '#fff'; }}
          onMouseOut={e => { e.target.style.background = accentColor; e.target.style.color = mainColor; }}
          onMouseDown={e => e.target.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.target.style.transform = 'scale(1)'}
        >
          Enviar Alerta via WhatsApp
        </button>
      </form>
      {mensagem && <p style={{ textAlign: 'center', marginTop: 18, color: '#fff', background: 'rgba(53,122,56,0.7)', borderRadius: 8, padding: 8 }}>{mensagem}</p>}
      <p style={{fontSize: '0.9em', textAlign: 'center', marginTop: 12}}>Os contatos receberão uma mensagem automática via WhatsApp em caso de risco.</p>
    </div>
  );
}

export default ContatosEmergencia;
