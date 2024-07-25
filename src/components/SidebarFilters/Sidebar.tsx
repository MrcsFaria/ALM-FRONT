import Category from "./Category/Category";
import Price from "./Price/Price";
import "./Sidebar.css";

type SidebarProps = {
  onPriceFilterChange: (filter: string) => void;
  onCategoryFilterChange: (categoryId: number | null) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onPriceFilterChange, onCategoryFilterChange }) => {
  return (
    <section className="sidebar">
      <Category onCategoryFilterChange={onCategoryFilterChange}/>
      <Price onPriceFilterChange={onPriceFilterChange} />
    </section>
  );
};

export default Sidebar;
