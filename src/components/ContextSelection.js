import React from 'react';

function ContextSelection({ selectedContextId, numContexts, taskType, contextText, updateConfig }) {
  if (!taskType) return null;

  if (taskType === 'image') {
    return (
        <div id="context-container">
            <h3>Select an Image</h3>
            <div className="image-selection-grid" id='image-context-selection-grid'>
                {[...Array(numContexts).keys()].map((contextId) => (
                <div 
                    key={contextId}
                    className={`context-image-button ${selectedContextId === contextId ? 'selected' : ''}`}
                    onClick={() => updateConfig('selected_context_id', contextId)}
                >
                    <img src={`${process.env.PUBLIC_URL}/assets/image_${contextId}.png`} alt="Image Option"/>
                </div>
                ))}
            </div>
        </div>
      );
  } 
  
  if (taskType === 'text') {
    return (
        <div id="context-container">
            <h3>Select a Context</h3>
            <div className={`text-selection-grid`}>
                {[...Array(numContexts).keys()].map((contextId) => (
                <button
                    key={contextId}
                    type="button"
                    className={`context-text-button ${selectedContextId === contextId ? 'selected' : ''}`}
                    onClick={() => updateConfig('selected_context_id', contextId)}
                >
                    {contextText[contextId]}
                </button>
                ))}
            </div>
        </div>
      );
  }

  return null;

}

export default ContextSelection;