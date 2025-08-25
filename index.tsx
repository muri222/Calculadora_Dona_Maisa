
import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [finalPrice, setFinalPrice] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFinalPrice(event.target.value);
  };

  const calculations = useMemo(() => {
    const price = parseFloat(finalPrice);
    if (isNaN(price) || price <= 0) {
      return {
        custoMaterial: 0,
        maoDeObra: 0,
        lucro: 0,
      };
    }

    // A soma dos componentes deve ser o preço final:
    // CustoMaterial (x) + Mão de Obra (0.6x) + Lucro (3x) = Preço Final
    // Portanto, 4.6x = Preço Final
    const custoMaterial = price / 4.6;
    const maoDeObra = 0.6 * custoMaterial;
    // O lucro é o que sobra do preço final
    const lucro = price - custoMaterial - maoDeObra;
    
    return {
      custoMaterial,
      maoDeObra,
      lucro,
    };
  }, [finalPrice]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <main className="calculator-card">
      <header className="card-header">
        <h1>Calculadora de Custos e Lucro</h1>
        <p>Insira o preço de venda para decompor os custos</p>
      </header>
      
      <div className="input-group">
        <label htmlFor="finalPrice">Preço Final de Venda (R$)</label>
        <input
          type="number"
          id="finalPrice"
          value={finalPrice}
          onChange={handleInputChange}
          placeholder="Ex: 460,00"
          aria-label="Preço Final de Venda em Reais"
        />
      </div>

      <section className="results-area" aria-live="polite">
        <div className="result-item">
          <span className="label">Custo do Material</span>
          <span className="value" data-testid="custo-material">{formatCurrency(calculations.custoMaterial)}</span>
        </div>
        <div className="result-item">
          <span className="label">Custo da Mão de Obra</span>
          <span className="value" data-testid="mao-de-obra">{formatCurrency(calculations.maoDeObra)}</span>
        </div>
        <div className="result-item final-price">
          <span className="label">Lucro Líquido</span>
          <span className="value" data-testid="lucro">{formatCurrency(calculations.lucro)}</span>
        </div>
      </section>

      <section className="explanation-area">
        <h2>Como o Cálculo é Feito?</h2>
        <p>
          A calculadora utiliza a seguinte fórmula para decompor o preço de venda:
        </p>
        <ul>
          <li><strong>Custo do Material:</strong> Representado como <strong>x</strong>.</li>
          <li><strong>Custo da Mão de Obra:</strong> Definido como 60% do custo do material (<strong>0.6x</strong>).</li>
          <li><strong>Lucro:</strong> Definido como 3 vezes o custo do material (<strong>3x</strong>).</li>
        </ul>
        <p>
          O preço final de venda é a soma de todas essas partes:
        </p>
        <div className="formula-box">
          <code>Preço Final = x + 0.6x + 3x</code>
        </div>
        <p>
          Simplificando a equação, chegamos a:
        </p>
        <div className="formula-box">
          <code>Preço Final = 4.6x</code>
        </div>
        <p>
          Portanto, para encontrar o valor do <strong>Custo do Material (x)</strong>, nós invertemos a fórmula:
        </p>
        <div className="formula-box">
          <code>x = Preço Final / 4.6</code>
        </div>
      </section>
    </main>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
