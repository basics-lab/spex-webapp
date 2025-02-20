import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent, { colorTokens, colorPatches, setTokens} from './components/MainContent';

function App() {
  const [config, setConfig] = useState({
    task: null,
    selected_context_id: null,
    selected_prompt_id: null,
    num_contexts: null,
    context_text: [],
    num_prompts: null,
    prompt_text: [],
    tokens: [],
    num_features: 12,
    selected_features: new Set(),
    feature_values: [],
  });

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/assets/config.json`)
      .then((response) => response.json())
      .then((data) => {
        setConfig((prevConfig) => ({
          ...prevConfig,
          context_data: data,
        }));
      });
  }, []);

  useEffect(() => {
    if (config.selected_context_id !== null){
      if (config.task === 'text') {
        colorTokens(config.num_features, Array.from(config.selected_features), config.feature_values, config.selected_prompt_id !== null);
      } else if (config.task === 'image') {
        colorPatches(config.num_features, config.selected_features, config.feature_values, config.selected_prompt_id !== null);
      }
    }
    console.log('config', config);
  }, [config]);

  useEffect(() => {
    if (config.task === 'text' && config.selected_context_id !== null){
        setTokens(config.tokens);
    }
  }, [config.selected_context_id, config.task, config.tokens]);

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
        if (newConfig.task === 'text') {
          newConfig.tokens = contextData.tokens;
          newConfig.num_features = contextData.tokens.length;
        } else if (newConfig.task === 'image') {
          newConfig.tokens = [];
          newConfig.num_features = 12;
        }
        newConfig.feature_values = Array(newConfig.num_features).fill(0);
      }

      if (key === 'selected_prompt_id') {
        // const taskData = newConfig.context_data[newConfig.task];
        // const contextData = taskData[newConfig.selected_context_id];
        // const promptData = contextData.prompts[value];
      }

      newConfig.selected_features = new Set();
      return newConfig;
    });
  };

  const changeSelection = (clickedFeature) => {

    if (config.selected_context_id !== null && config.selected_prompt_id !== null) {

      console.log('clicked patch', clickedFeature);
      const hasFeature = config.selected_features.has(clickedFeature);

      setConfig((prevConfig) => {

        if (clickedFeature === null) return prevConfig;

        const newConfig = { ...prevConfig, selected_features: new Set(prevConfig.selected_features) };
        if (hasFeature) {
          newConfig.selected_features.delete(clickedFeature);
        } else {
          newConfig.selected_features.add(clickedFeature);
        }

        return newConfig;
      });
    }

  };

  return (
    <div className="App">
      <Sidebar config={config} updateConfig={updateConfig} />
      <MainContent config={config} changeSelection={changeSelection}/>
    </div>
  );
}

export default App;