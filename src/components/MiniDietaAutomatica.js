import React from 'react';

function gerarDieta(valorGlicemia) {
  if (valorGlicemia >= 180) {
    return {
      risco: 'Alto',
      dieta: [
        'Evite açúcar e doces',
        'Prefira alimentos integrais',
        'Consuma vegetais e proteínas magras',
        'Evite refrigerantes e sucos industrializados',
        'Beba bastante água',
        'Evite pães e massas brancas',
        'Inclua frutas com baixo índice glicêmico'
      ]
    };
  } else if (valorGlicemia <= 70) {
    return {
      risco: 'Baixo',
      dieta: [
        'Consuma uma fonte rápida de açúcar (ex: suco de laranja)',
        'Evite jejum prolongado',
        'Inclua carboidratos complexos nas refeições',
        'Mantenha acompanhamento médico'
      ]
    };
  } else {
    return {
      risco: 'Normal',
      dieta: ['Mantenha alimentação equilibrada', 'Continue monitorando a glicemia']
    };
  }
}

function MiniDietaAutomatica({ ultimoValor }) {
  const info = gerarDieta(ultimoValor);

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Mini Dieta Automática</h2>
      <p>Nível de risco: <strong>{info.risco}</strong></p>
      <ul>
        {info.dieta.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      {info.risco !== 'Normal' && (
        <p style={{ color: 'red' }}>
          Atenção: Siga as recomendações para baixar ou elevar o nível de açúcar no sangue.
        </p>
      )}
    </div>
  );
}

export default MiniDietaAutomatica;
