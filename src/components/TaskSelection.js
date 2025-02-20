import React from 'react';

function TaskSelection({ taskType, updateConfig }) {
  return (
    <div id="task-container">
      <h3>Select a Task</h3>
      <div className="image-selection-grid">
        <button
            type="button"
            className={`task-button ${taskType === 'image' ? 'selected' : ''}`}
            onClick={() => updateConfig('task', 'image')}
        >
            <span role="img" aria-label="image">🖼️</span> Image
        </button>
        <button
            type="button"
            className={`task-button ${taskType === 'text' ? 'selected' : ''}`}
            onClick={() => updateConfig('task', 'text')}
        >
            <span role="img" aria-label="text">📄</span> Text
        </button>
      </div>
    </div>
  );
}

export default TaskSelection;