import React from 'react';

function PromptSelection({ selectedPromptId, numPrompts, taskType, promptText, updateConfig }) {
  if (!taskType || numPrompts === null) return null;

  return (
    <div id="prompt-container">
      <h3>Select a Prompt</h3>
      <div className="text-selection-grid">
        {[...Array(numPrompts).keys()].map((promptId) => (
          <button
            key={promptId}
            type="button"
            className={`prompt-button ${selectedPromptId === promptId ? 'selected' : ''}`}
            onClick={() => updateConfig('selectedPromptID', promptId)}
          >
            {promptText[promptId]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PromptSelection;