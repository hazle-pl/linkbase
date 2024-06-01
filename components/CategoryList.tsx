import Link from 'next/link';
import React from 'react';

const CategoryList: React.FC = () => {
  const categories = [
    { value: "horror", label: "Horror" },
    { value: "thriller", label: "Thriller" },
    { value: "comedy", label: "Comedy" },
    { value: "drama", label: "Drama" },
    { value: "action", label: "Action" },
    { value: "adventure", label: "Adventure" },
    { value: "science-fiction", label: "Science Fiction" },
    { value: "fantasy", label: "Fantasy" },
    { value: "romance", label: "Romance" },
    { value: "animation", label: "Animation" },
    { value: "crime", label: "Crime" },
    { value: "mystery", label: "Mystery" },
    { value: "documentary", label: "Documentary" },
    { value: "family", label: "Family" },
    { value: "history", label: "History" },
    { value: "war", label: "War" },
    { value: "music", label: "Music" },
    { value: "western", label: "Western" },
    { value: "sport", label: "Sport" },
    { value: "biography", label: "Biography" },
    { value: "musical", label: "Musical" }
  ];

  return (
    <div className="category-list">
      {categories.map(category => (
        <Link className="category-element" key={category.value} href={category.value}>{category.label}</Link>
      ))}
    </div>
  );
};

export default CategoryList;
