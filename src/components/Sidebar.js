import React from 'react';
import TaskSelection from './TaskSelection';
import ContextSelection from './ContextSelection';
import PromptSelection from './PromptSelection';

function Sidebar({ config, updateConfig }) {
  return (
    <div className="sidebar">
      <h2><span role="img" aria-label="sunglasses">🕶️</span> SPEX</h2>
      <TaskSelection taskType={config.task} updateConfig={updateConfig} />
      <ContextSelection
        selectedContextId={config.selected_context_id}
        numContexts={config.num_contexts}
        taskType={config.task}
        contextText={config.context_text}
        updateConfig={updateConfig}
      />
      <PromptSelection
        selectedPromptId={config.selected_prompt_id}
        numPrompts={config.num_prompts}
        taskType={config.task}
        promptText={config.prompt_text}
        updateConfig={updateConfig}
      />
    </div>
  );
}

export default Sidebar;