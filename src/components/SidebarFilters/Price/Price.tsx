import React, { useState } from 'react';
import "./Price.css";

type PriceProps = {
  onPriceFilterChange: (filter: string) => void;
};

const Price: React.FC<PriceProps> = ({ onPriceFilterChange }) => {
  const [selectedPrice, setSelectedPrice] = useState<string>('');

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (selectedPrice === value) {
      // Se o preço já está selecionado, desmarque-o
      setSelectedPrice('');
      onPriceFilterChange(''); // Passa uma string vazia para limpar o filtro de preço
    } else {
      // Se não está selecionado, selecione-o
      setSelectedPrice(value);
      onPriceFilterChange(value);
    }
  };



  return (
    <div className="ml">
      <h2 className="sidebar-title price-title">Preços</h2>

      <label className="sidebar-label-container">
        <input type="checkbox" value="0-250" name="price" checked={selectedPrice === '0-250'} onChange={handlePriceChange} />
        <span className="checkmark"></span>R$0-R$250
      </label>

      <label className="sidebar-label-container">
        <input type="checkbox" value="250-600" name="price" checked={selectedPrice === '250-600'} onChange={handlePriceChange} />
        <span className="checkmark"></span>R$250-R$600
      </label>

      <label className="sidebar-label-container">
        <input type="checkbox" value="600-1000" name="price" checked={selectedPrice === '600-1000'} onChange={handlePriceChange} />
        <span className="checkmark"></span>R$600-R$1000
      </label>

      <label className="sidebar-label-container">
        <input type="checkbox" value="1000+" name="price" checked={selectedPrice === '1000+'} onChange={handlePriceChange} />
        <span className="checkmark"></span>R$1000+
      </label>
    </div>
  );
};

export default Price;