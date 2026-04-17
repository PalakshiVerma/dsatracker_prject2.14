import React from 'react';
import ProblemCard from './ProblemCard';

const ProblemList = ({ problems, onEdit, onDelete, apiUrl }) => {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
      gap: '2rem' 
    }}>
      {problems.map(problem => (
        <ProblemCard 
          key={problem._id} 
          problem={problem} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          apiUrl={apiUrl}
        />
      ))}
    </div>
  );
};

export default ProblemList;
