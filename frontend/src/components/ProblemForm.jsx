import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProblemForm = ({ onClose, onSuccess, editingProblem, apiUrl }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    difficulty: 'Easy',
    platform: '',
    problemUrl: '',
    dateSolved: new Date().toISOString().split('T')[0],
    notes: '',
    status: 'Solved',
  });
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProblem) {
      setFormData({
        title: editingProblem.title || '',
        type: editingProblem.type || '',
        difficulty: editingProblem.difficulty || 'Easy',
        platform: editingProblem.platform || '',
        problemUrl: editingProblem.problemUrl || '',
        dateSolved: editingProblem.dateSolved ? new Date(editingProblem.dateSolved).toISOString().split('T')[0] : '',
        notes: editingProblem.notes || '',
        status: editingProblem.status || 'Solved',
      });
    }
  }, [editingProblem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    if (screenshot) {
      data.append('screenshot', screenshot);
    }

    try {
      if (editingProblem) {
        await axios.put(`${apiUrl}/problems/${editingProblem._id}`, data);
      } else {
        await axios.post(`${apiUrl}/problems`, data);
      }
      onSuccess();
    } catch (err) {
      alert('Error saving problem. Please check all fields.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
      <div style={{ gridColumn: 'span 2' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Problem Title *</label>
        <input 
          type="text" name="title" value={formData.title} onChange={handleChange} required 
          placeholder="e.g. Reverse a Linked List" style={{ width: '100%' }} 
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Topic/Type *</label>
        <input 
          type="text" name="type" value={formData.type} onChange={handleChange} required 
          placeholder="e.g. Linked List, DP, Graph" style={{ width: '100%' }} 
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Difficulty *</label>
        <select name="difficulty" value={formData.difficulty} onChange={handleChange} style={{ width: '100%' }}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Platform</label>
        <input 
          type="text" name="platform" value={formData.platform} onChange={handleChange} 
          placeholder="e.g. LeetCode, GFG" style={{ width: '100%' }} 
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Problem URL</label>
        <input 
          type="url" name="problemUrl" value={formData.problemUrl} onChange={handleChange} 
          placeholder="https://leetcode.com/..." style={{ width: '100%' }} 
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Date Solved</label>
        <input type="date" name="dateSolved" value={formData.dateSolved} onChange={handleChange} style={{ width: '100%' }} />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Status</label>
        <select name="status" value={formData.status} onChange={handleChange} style={{ width: '100%' }}>
          <option value="Solved">Solved</option>
          <option value="Revise Later">Revise Later</option>
          <option value="Important">Important</option>
        </select>
      </div>

      <div style={{ gridColumn: 'span 2' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Notes</label>
        <textarea 
          name="notes" value={formData.notes} onChange={handleChange} rows="4" 
          placeholder="Tricks, time complexity, or thoughts..." style={{ width: '100%', resize: 'vertical' }} 
        />
      </div>

      <div style={{ gridColumn: 'span 2' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Screenshot/Image</label>
        <input type="file" onChange={handleFileChange} accept="image/*" style={{ width: '100%', padding: '10px' }} />
        {editingProblem && editingProblem.screenshot && !screenshot && (
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>Keep empty to retain existing screenshot.</p>
        )}
      </div>

      <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button type="button" onClick={onClose} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '0.75rem 1.5rem', borderRadius: '6px' }}>
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading}
          style={{ background: 'var(--accent-primary)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: '600' }}
        >
          {loading ? 'Saving...' : editingProblem ? 'Update Problem' : 'Save Problem'}
        </button>
      </div>
    </form>
  );
};

export default ProblemForm;
