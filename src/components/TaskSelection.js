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
            🖼️ Image
        </button>
        <button
            type="button"
            className={`task-button ${taskType === 'text' ? 'selected' : ''}`}
            onClick={() => updateConfig('task', 'text')}
        >
            📄 Text
        </button>
      </div>
    </div>
  );
}

export default TaskSelection;