import React from 'react';
import TaskSelection from './TaskSelection';
import ContextSelection from './ContextSelection';
import PromptSelection from './PromptSelection';
import About from './About';

function Sidebar({ config, updateConfig }) {
  return (
    <div className="sidebar">
      <div className='config'>
        <h2><span role="img" aria-label="sunglasses">🕶️</span> SPEX</h2>
        <TaskSelection taskType={config.task} updateConfig={updateConfig} />
        <ContextSelection
          selectedContextId={config.selectedContextID}
          numContexts={config.numContexts}
          taskType={config.task}
          contextText={config.contextText}
          updateConfig={updateConfig}
        />
        <PromptSelection
          selectedPromptId={config.selectedPromptID}
          numPrompts={config.numPrompts}
          taskType={config.task}
          promptText={config.promptText}
          updateConfig={updateConfig}
        />
      </div>
    </div>
  );
}

export default Sidebar;