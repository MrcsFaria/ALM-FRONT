import React, { useState } from 'react';
import './brands.css';

type BrandFiltersProps = {
  onBrandFilterChange: (brand: string) => void;
};

const BrandFilters: React.FC<BrandFiltersProps> = ({ onBrandFilterChange }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  const handleBrandChange = (brand: string) => {
    if (selectedBrand === brand) {
      // Se a marca clicada já está selecionada, remova o filtro de marca
      setSelectedBrand('');
      onBrandFilterChange('');
    } else {
      // Caso contrário, aplique o filtro de marca
      setSelectedBrand(brand);
      onBrandFilterChange(brand);
    }
  };

  return (
    <div>
      <h2 className="recommended-title">Marcas</h2>
      <div className="recommended-flex">
        {['Nike', 'Adidas', 'Puma', 'New Balance', 'Jordan'].map((brand) => (
          <button
            key={brand}
            className={`btns ${selectedBrand === brand ? 'active' : ''}`}
            onClick={() => handleBrandChange(brand)}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandFilters;