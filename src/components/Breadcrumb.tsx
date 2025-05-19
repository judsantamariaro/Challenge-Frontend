import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  categories: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories }) => {
  return (
    <nav className="breadcrumb">
      <ul>
        {categories.map((category: string) => (
          <li key={category}>
            <Link to={`/items?search=${encodeURIComponent(category)}`}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
