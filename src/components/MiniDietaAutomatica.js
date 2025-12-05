import React from 'react';

function gerarDieta(valorGlicemia) {
  if (valorGlicemia >= 180) {
    return {
      risco: 'Alta',
      secoes: [
        {
          titulo: 'Evitar',
          itens: [
            'Açúcares, doces, refrigerantes',
            'Pães brancos, massas',
            'Suco de fruta',
            'Arroz branco em excesso'
          ]
        },
        {
          titulo: 'Café da manhã',
          itens: [
            '2 ovos',
            '1 fatia de queijo',
            'Fruta de baixo índice glicêmico (maçã, pera, morango)',
            'Chá/café sem açúcar'
          ]
        },
        {
          titulo: 'Lanche da manhã',
          itens: ['Castanhas ou amendoim sem açúcar']
        },
        {
          titulo: 'Almoço',
          itens: [
            'Salada variada',
            'Frango/peixe/carne magra',
            '3 colheres de arroz integral OU 1 batata doce pequena'
          ]
        },
        {
          titulo: 'Lanche da tarde',
          itens: ['Iogurte natural sem açúcar OU maçã + pasta de amendoim']
        },
        {
          titulo: 'Jantar',
          itens: ['Sopa de legumes com frango OU salada + omelete', 'Evitar carboidratos à noite.']
        },
        {
          titulo: 'Antes de dormir',
          itens: ['Chá sem açúcar', 'Queijo ou ovo cozido']
        }
      ],
      dicas: ['Beber água', 'Evitar longos períodos sem comer', 'Não aumentar porções de forma repentina']
    };
  } else if (valorGlicemia <= 70) {
    return {
      risco: 'Baixa',
      secoes: [
        {
          titulo: ' Primeiro',
          itens: [
            '1 copo de suco (150 ml) OU',
            '1 colher de açúcar na água OU',
            '1 sachê de mel OU',
            '3 balas / 1 tablete de glicose',
            'Aguardar 15 minutos e medir novamente.'
          ]
        },
        {
          titulo: 'Café da manhã',
          itens: ['Pão integral ou tapioca', 'Ovo/queijo/frango desfiado', '1 fruta (banana/maçã)']
        },
        {
          titulo: 'Lanche da manhã',
          itens: ['Iogurte natural ou banana com aveia']
        },
        {
          titulo: 'Almoço',
          itens: ['Arroz ou macaxeira (pouco)', 'Feijão', 'Carne/frango/peixe', 'Verduras e legumes']
        },
        {
          titulo: 'Lanche da tarde',
          itens: ['Castanhas + uva-passa OU fruta + queijo']
        },
        {
          titulo: 'Jantar',
          itens: ['Omelete com legumes OU salada + frango/peixe', 'Pequena porção de carboidrato']
        },
        {
          titulo: 'Antes de dormir',
          itens: ['Leite ou iogurte + aveia']
        }
      ],
      dicas: ['Beber água', 'Evitar longos períodos sem comer', 'Não aumentar porções de forma repentina']
    };
  } else {
    return {
      risco: 'Normal',
      secoes: [
        {
          titulo: 'Orientação geral',
          itens: ['Mantenha alimentação equilibrada', 'Continue monitorando a glicemia']
        }
      ],
      dicas: ['Beber água', 'Evitar longos períodos sem comer', 'Não aumentar porções de forma repentina']
    };
  }
}

function MiniDietaAutomatica({ ultimoValor }) {
  const info = gerarDieta(ultimoValor);

  return (
    <div style={{ maxWidth: 640, margin: 'auto', padding: 20 }}>
      <h2>Mini Dieta Automática</h2>
      <p>Nível de glicemia: <strong>{info.risco}</strong></p>
      {info.secoes.map((secao, idx) => (
        <div key={idx} style={{ marginTop: 12 }}>
          <h3 style={{ margin: '8px 0' }}>{secao.titulo}</h3>
          <ul>
            {secao.itens.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      <div style={{ marginTop: 16 }}>
        <h3>Dicas para ambas</h3>
        <ul>
          {info.dicas.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MiniDietaAutomatica;
