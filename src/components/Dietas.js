import React from 'react';

function Secao({ titulo, itens }) {
  return (
    <div style={{ marginTop: 12 }}>
      <h3 style={{ margin: '8px 0' }}>{titulo}</h3>
      <ul>
        {itens.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function BlocoDieta({ titulo, secoes }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.10)', borderRadius: 12, padding: 16, marginTop: 16 }}>
      <h2 style={{ marginTop: 0 }}>{titulo}</h2>
      {secoes.map((s, idx) => (
        <Secao key={idx} titulo={s.titulo} itens={s.itens} />
      ))}
    </div>
  );
}

function Dietas() {
  const dicas = ['Beber água', 'Evitar longos períodos sem comer', 'Não aumentar porções de forma repentina'];

  const dietaBaixa = [
    { titulo: 'Primeiro socorro', itens: ['1 copo de suco (150 ml) OU', '1 colher de açúcar na água OU', '1 sachê de mel OU', '3 balas / 1 tablete de glicose', 'Aguardar 15 minutos e medir novamente.'] },
    { titulo: 'Café da manhã', itens: ['Pão integral ou tapioca', 'Ovo/queijo/frango desfiado', '1 fruta (banana/maçã)'] },
    { titulo: 'Lanche da manhã', itens: ['Iogurte natural ou banana com aveia'] },
    { titulo: 'Almoço', itens: ['Arroz ou macaxeira (pouco)', 'Feijão', 'Carne/frango/peixe', 'Verduras e legumes'] },
    { titulo: 'Lanche da tarde', itens: ['Castanhas + uva-passa OU fruta + queijo'] },
    { titulo: 'Jantar', itens: ['Omelete com legumes OU salada + frango/peixe', 'Pequena porção de carboidrato'] },
    { titulo: 'Antes de dormir', itens: ['Leite ou iogurte + aveia'] },
  ];

  const dietaAlta = [
    { titulo: 'Evitar', itens: ['Açúcares, doces, refrigerantes', 'Pães brancos, massas', 'Suco de fruta', 'Arroz branco em excesso'] },
    { titulo: 'Café da manhã', itens: ['2 ovos', '1 fatia de queijo', 'Fruta de baixo índice glicêmico (maçã, pera, morango)', 'Chá/café sem açúcar'] },
    { titulo: 'Lanche da manhã', itens: ['Castanhas ou amendoim sem açúcar'] },
    { titulo: 'Almoço', itens: ['Salada variada', 'Frango/peixe/carne magra', '3 colheres de arroz integral OU 1 batata doce pequena'] },
    { titulo: 'Lanche da tarde', itens: ['Iogurte natural sem açúcar OU maçã + pasta de amendoim'] },
    { titulo: 'Jantar', itens: ['Sopa de legumes com frango OU salada + omelete', 'Evitar carboidratos à noite.'] },
    { titulo: 'Antes de dormir', itens: ['Chá sem açúcar', 'Queijo ou ovo cozido'] },
  ];

  const bgGradient = `linear-gradient(135deg, #7a183a 60%, #6dbf6d 100%)`;

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 24, borderRadius: 18, boxShadow: '0 4px 24px 0 rgba(122,24,58,0.15)', background: bgGradient, color: '#fff', marginTop: 24 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 12 }}>Dietas</h1>
      <BlocoDieta titulo="Mini Dieta para Glicemia Baixa" secoes={dietaBaixa} />
      <BlocoDieta titulo="Mini Dieta para Glicemia Alta" secoes={dietaAlta} />
      <div style={{ background: 'rgba(255,255,255,0.10)', borderRadius: 12, padding: 16, marginTop: 16 }}>
        <h2>Dicas para ambas</h2>
        <ul>
          {dicas.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
      <p style={{ textAlign: 'center', marginTop: 12, color: '#fff' }}>Consulte um profissional de saúde para personalização.</p>
    </div>
  );
}

export default Dietas;
