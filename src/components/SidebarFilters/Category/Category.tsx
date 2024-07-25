import React, { useState } from 'react';
import './Category.css';

type CategoryProps = {
  onCategoryFilterChange: (categoryId: number | null) => void; // Mantém o tipo como number
};

const Category: React.FC<CategoryProps> = ({ onCategoryFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryChange = (categoryId: number) => {
    if (selectedCategory === categoryId) {
      // Se a categoria já está selecionada, desmarque-a
      setSelectedCategory(null);
      onCategoryFilterChange(null);
    } else {
      // Se não está selecionada, selecione-a
      setSelectedCategory(categoryId);
      // Aqui você decide o que fazer quando a categoria é selecionada.
      onCategoryFilterChange(categoryId);
    }
  };

  return (
    <div>
      <h2 className="sidebar-title">Categorias</h2>
      <div>
        <label className="sidebar-label-container">
          <input
            type="checkbox"
            value="1"
            name="category"
            checked={selectedCategory === 1}
            onChange={() => handleCategoryChange(1)}
          />
          <span className="checkmark"></span>Novidades
        </label>
        <label className="sidebar-label-container">
          <input
            type="checkbox"
            value="2"
            name="category"
            checked={selectedCategory === 2}
            onChange={() => handleCategoryChange(2)}
          />
          <span className="checkmark"></span>Masculino
        </label>
        <label className="sidebar-label-container">
          <input
            type="checkbox"
            value="3"
            name="category"
            checked={selectedCategory === 3}
            onChange={() => handleCategoryChange(3)}
          />
          <span className="checkmark"></span>Feminino
        </label>
        <label className="sidebar-label-container">
          <input
            type="checkbox"
            value="4"
            name="category"
            checked={selectedCategory === 4}
            onChange={() => handleCategoryChange(4)}
          />
          <span className="checkmark"></span>Infantil
        </label>
      </div>
    </div>
  );
};

export default Category;