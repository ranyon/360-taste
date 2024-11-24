import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CategorySection = ({ categories, selectedCategory, handleCategoryChange }) => {
  return (
    <Card className="mb-4">
      <Card.Header>Categories</Card.Header>
      <Card.Body>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'primary' : 'outline-primary'}
            className="mb-2 w-100"
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </Card.Body>
    </Card>
  );
};

export default CategorySection;