import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function FormularioCadastral({ usuario, onFinish }) {
  const [form, setForm] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    cpf: '',
    nascimento: '',
    sexo: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    senha: '',
    confirmarSenha: '',
    consentimento: false,
  });
  const [mensagem, setMensagem] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastAttempt, setLastAttempt] = useState(0);
  const navigate = useNavigate();
  const mainColor = '#7a183a';
  const accentColor = '#6dbf6d';
  const bgGradient = `linear-gradient(135deg, #7a183a 60%, #6dbf6d 100%)`;

  const setField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const now = Date.now();
    if (now - lastAttempt < 60000) {
      setMensagem('Aguarde 60 segundos antes de tentar novamente.');
      return;
    }
    setIsSubmitting(true);
    setLastAttempt(now);
    if (form.senha !== form.confirmarSenha) {
      setMensagem('Senhas não conferem.');
      setIsSubmitting(false);
      return;
    }
    if (!form.consentimento) {
      setMensagem('É necessário aceitar o consentimento.');
      setIsSubmitting(false);
      return;
    }
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: form.email.trim().toLowerCase(),
        password: form.senha,
        options: { emailRedirectTo: window.location.origin }
      });
      if (signUpError) {
        setMensagem('Erro ao criar usuário: ' + signUpError.message);
        return;
      }
      if (!signUpData || !signUpData.session) {
        setMensagem('Cadastro iniciado. Confirme o e-mail e faça login para concluir.');
        return;
      }
      const userId = signUpData && signUpData.user ? signUpData.user.id : null;
      const { error: insertError } = await supabase.from('usuarios').insert([
        {
          user_id: userId,
          nome: form.nomeCompleto,
          email: form.email,
          telefone: form.telefone,
          cpf: form.cpf,
          nascimento: form.nascimento,
          sexo: form.sexo,
          cep: form.cep,
          logradouro: form.logradouro,
          numero: form.numero,
          complemento: form.complemento,
          bairro: form.bairro,
          cidade: form.cidade,
          estado: form.estado
        }
      ]);
      if (insertError) {
        setMensagem('Erro ao cadastrar: ' + insertError.message);
        return;
      }
      setMensagem('Cadastro completo realizado com sucesso!');
      if (onFinish) onFinish(form.email);
      setTimeout(() => navigate('/registro'), 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      maxWidth: 640,
      margin: 'auto',
      padding: 24,
      borderRadius: 18,
      boxShadow: '0 4px 24px 0 rgba(122,24,58,0.15)',
      background: bgGradient,
      color: '#fff',
      marginTop: 24
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: 16, color: '#fff', letterSpacing: 1 }}>Cadastro Completo</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="nomeCompleto" style={{ color: '#fff', fontWeight: 500 }}>Nome Completo</label>
          <input id="nomeCompleto" type="text" required value={form.nomeCompleto} onChange={e => setField('nomeCompleto', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="email" style={{ color: '#fff', fontWeight: 500 }}>Email</label>
          <input id="email" type="email" required value={form.email} onChange={e => setField('email', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="telefone" style={{ color: '#fff', fontWeight: 500 }}>Telefone</label>
          <input id="telefone" type="tel" required value={form.telefone} onChange={e => setField('telefone', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="cpf" style={{ color: '#fff', fontWeight: 500 }}>CPF</label>
          <input id="cpf" type="text" required pattern="\d{11}" value={form.cpf} onChange={e => setField('cpf', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="nascimento" style={{ color: '#fff', fontWeight: 500 }}>Data de Nascimento</label>
          <input id="nascimento" type="date" required value={form.nascimento} onChange={e => setField('nascimento', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="sexo" style={{ color: '#fff', fontWeight: 500 }}>Sexo</label>
          <select id="sexo" required value={form.sexo} onChange={e => setField('sexo', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#000' }}>
            <option value="">Selecione</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="cep" style={{ color: '#fff', fontWeight: 500 }}>CEP</label>
          <input id="cep" type="text" required pattern="\d{8}" value={form.cep} onChange={e => setField('cep', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="logradouro" style={{ color: '#fff', fontWeight: 500 }}>Logradouro</label>
          <input id="logradouro" type="text" required value={form.logradouro} onChange={e => setField('logradouro', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="numero" style={{ color: '#fff', fontWeight: 500 }}>Número</label>
          <input id="numero" type="text" required value={form.numero} onChange={e => setField('numero', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="complemento" style={{ color: '#fff', fontWeight: 500 }}>Complemento</label>
          <input id="complemento" type="text" value={form.complemento} onChange={e => setField('complemento', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="bairro" style={{ color: '#fff', fontWeight: 500 }}>Bairro</label>
          <input id="bairro" type="text" required value={form.bairro} onChange={e => setField('bairro', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="cidade" style={{ color: '#fff', fontWeight: 500 }}>Cidade</label>
          <input id="cidade" type="text" required value={form.cidade} onChange={e => setField('cidade', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="estado" style={{ color: '#fff', fontWeight: 500 }}>Estado</label>
          <select id="estado" required value={form.estado} onChange={e => setField('estado', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#000' }}>
            <option value="">Selecione</option>
            {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="senha" style={{ color: '#fff', fontWeight: 500 }}>Senha</label>
          <input id="senha" type="password" required value={form.senha} onChange={e => setField('senha', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <label htmlFor="confirmarSenha" style={{ color: '#fff', fontWeight: 500 }}>Confirmar Senha</label>
          <input id="confirmarSenha" type="password" required value={form.confirmarSenha} onChange={e => setField('confirmarSenha', e.target.value)} style={{ padding: '10px', borderRadius: 8, border: '1.5px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff' }} />
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <input id="consentimento" type="checkbox" checked={form.consentimento} onChange={e => setField('consentimento', e.target.checked)} />
          <label htmlFor="consentimento" style={{ color: '#fff' }}>Aceito o tratamento de dados conforme LGPD</label>
        </div>
        <button type="submit" disabled={isSubmitting} style={{ gridColumn: '1 / -1', marginTop: 8, padding: '12px', borderRadius: 8, border: 'none', background: accentColor, color: '#fff', fontWeight: 700, fontSize: 16, cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 2px 8px #0002', transition: 'background 0.2s, transform 0.1s', opacity: isSubmitting ? 0.7 : 1 }} onMouseOver={e => e.target.style.background = mainColor} onMouseOut={e => e.target.style.background = accentColor} onMouseDown={e => e.target.style.transform = 'scale(0.97)'} onMouseUp={e => e.target.style.transform = 'scale(1)'}>
          Salvar Cadastro
        </button>
      </form>
      {mensagem && <p style={{ textAlign: 'center', marginTop: 18, color: '#fff', background: 'rgba(53,122,56,0.7)', borderRadius: 8, padding: 8 }}>{mensagem}</p>}
    </div>
  );
}

export default FormularioCadastral;

