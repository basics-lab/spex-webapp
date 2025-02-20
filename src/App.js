import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent, { colorTokens, colorPatches } from './components/MainContent';

function App() {
  const [config, setConfig] = useState({
    task: null,
    selected_context_id: null,
    selected_prompt_id: null,
    num_contexts: null,
    context_text: [],
    num_prompts: null,
    prompt_text: [],
    num_features: 12,
    selected_features: new Set(),
    feature_values: [],
  });

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/config.json`)
      .then((response) => response.json())
      .then((data) => {
        setConfig((prevConfig) => ({
          ...prevConfig,
          context_data: data,
        }));
      });
  }, []);

  const updateConfig = (key, value) => {
    setConfig((prevConfig) => {
      const newConfig = { ...prevConfig, [key]: value };

      if (key === 'task') {
        const taskData = newConfig.context_data[value];
        newConfig.num_contexts = taskData.length;
        newConfig.context_text = taskData.map((item) => item.context);
        newConfig.selected_context_id = null;
        newConfig.selected_prompt_id = null;
        newConfig.num_prompts = null;
        newConfig.prompt_text = [];
      }

      if (key === 'selected_context_id') {
        const taskData = newConfig.context_data[newConfig.task];
        const contextData = taskData[value];
        newConfig.num_prompts = contextData.prompts.length;
        newConfig.prompt_text = contextData.prompts;
        newConfig.selected_prompt_id = null;
      }

      if (key === 'selected_prompt_id') {
        const taskData = newConfig.context_data[newConfig.task];
        const contextData = taskData[newConfig.selected_context_id];
        const promptData = contextData.prompts[value];
        newConfig.num_features = 12;
        newConfig.selected_features = new Set();
        newConfig.feature_values = Array(newConfig.num_features).fill(0);
      }

      console.log('Updated config:', key, value);

      return newConfig;
    });
  };

  const changeSelection = (clickedFeature) => {

    setConfig((prevConfig) => {
      if (clickedFeature === null) return prevConfig;

      const newConfig = prevConfig;
      if (newConfig.selected_features.has(clickedFeature)) {
        newConfig.selected_features.delete(clickedFeature);
      } else {
        newConfig.selected_features.add(clickedFeature);
      }

      return newConfig;
    });

    console.log('feature_values:', config.feature_values);

    colorPatches(config.num_features, config.selected_features, config.feature_values);

  };

  return (
    <div className="App">
      <Sidebar config={config} updateConfig={updateConfig} />
      <MainContent config={config} changeSelection={changeSelection}/>
    </div>
  );
}

export default App;