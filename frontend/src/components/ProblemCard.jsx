import React from 'react';
import { ExternalLink, Edit3, Trash2, Calendar, Tag, Globe } from 'lucide-react';

const ProblemCard = ({ problem, onEdit, onDelete, apiUrl }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Solved': return 'var(--success)';
      case 'Revise Later': return 'var(--warning)';
      case 'Important': return 'var(--danger)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {problem.screenshot && (
        <div style={{ width: '100%', height: '200px', backgroundColor: '#000', overflow: 'hidden' }}>
          <img 
            src={`${apiUrl}${problem.screenshot}`} 
            alt={problem.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>
      )}
      
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
          <span style={{ fontSize: '0.8rem', color: getStatusColor(problem.status), fontWeight: '600', border: `1px solid ${getStatusColor(problem.status)}`, padding: '2px 8px', borderRadius: '4px' }}>
            {problem.status}
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', lineHeight: '1.3' }}>{problem.title}</h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Tag size={14} />
            {problem.type}
          </div>
          {problem.platform && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Globe size={14} />
              {problem.platform}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={14} />
            {formatDate(problem.dateSolved)}
          </div>
        </div>

        {problem.notes && (
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.03)', 
            padding: '1rem', 
            borderRadius: '8px', 
            fontSize: '0.9rem', 
            color: 'var(--text-secondary)',
            borderLeft: `3px solid var(--accent-primary)`,
            marginBottom: '1.5rem',
            whiteSpace: 'pre-wrap'
          }}>
            {problem.notes}
          </div>
        )}

        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => onEdit(problem)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', padding: '0.2rem' }}
              title="Edit"
            >
              <Edit3 size={18} />
            </button>
            <button 
              onClick={() => onDelete(problem._id)}
              style={{ background: 'transparent', border: 'none', color: 'var(--danger)', padding: '0.2rem' }}
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          {problem.problemUrl && (
            <a 
              href={problem.problemUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: 'var(--accent-primary)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                fontSize: '0.9rem', 
                fontWeight: '500', 
                textDecoration: 'none' 
              }}
            >
              View Problem
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemCard;
