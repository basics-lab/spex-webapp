import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent, {colorTokens, colorPatches, setTokens} from './components/MainContent';
import {fetchCoefficients, calculateFeatureValues} from './backend/Backend';

function App() {
  const [config, setConfig] = useState({
    contextData: null,
    task: null,
    selectedContextID: null,
    selectedPromptID: null,
    numContexts: null,
    contextText: [],
    numPrompts: null,
    promptText: [],
    responseText: [],
    tokens: [],
    numFeatures: null,
    numFeatureColumns: null,
    triggerTokenSet: false,
    triggerFetchCoefficients: false,
    triggerFeatureValueCalculation: false,
    triggerTokenVisualization: false,
  });

  const [appData, setAppData] = useState({
    coefficients: null,
    selectedFeatures: new Set(),
    featureValues: null,
  })

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/assets/config.json`)
      .then((response) => response.json())
      .then((data) => {
        setConfig((prevConfig) => ({
          ...prevConfig,
          contextData: data,
        }));
      });
  }, []);

  useEffect(() => {
    if (config.triggerTokenSet) {
      console.log("token set");
      config.triggerTokenSet = false;
      setTokens(config.tokens);
    }
  }, [config.triggerTokenSet, config.tokens]);

  useEffect(() => {
    if (config.triggerFetchCoefficients) {
      console.log("fetch coefficients");
      config.triggerFetchCoefficients = false;
      fetchCoefficients(config.task, config.selectedContextID, config.selectedPromptID)
        .then((data) => {
          setAppData((prevConfig) => ({
        coefficients: data,
        selectedFeatures: new Set(),
        featureValues: null,
          }));
          setConfig((prevConfig) => ({
        ...prevConfig,
        triggerFeatureValueCalculation: true,
          }));
        });
    }
  }, [config.triggerFetchCoefficients, config.task, config.selectedContextID, config.selectedPromptID]);

  useEffect(() => {
    if (config.triggerFeatureValueCalculation) {
      console.log("calculate feature values");
      config.triggerFeatureValueCalculation = false;
      calculateFeatureValues(appData.coefficients, appData.selectedFeatures, config.numFeatures)
        .then((data) => {
          setAppData((prevConfig) => ({
        ...prevConfig,
        featureValues: data,
          }));
          setConfig((prevConfig) => ({
        ...prevConfig,
        triggerTokenVisualization: true,
          }));
        });
    }
  }, [config.triggerFeatureValueCalculation, appData.coefficients, appData.selectedFeatures, config.numFeatures]);

  useEffect(() => {
    if (config.triggerTokenVisualization) {
      console.log("visualize tokens");
      config.triggerTokenVisualization = false;
      if (config.task === 'text') {
        colorTokens(config.numFeatures, appData.selectedFeatures, appData.featureValues, config.selectedPromptID !== null);
      } else if (config.task === 'image') {
        colorPatches(config.numFeatures, appData.selectedFeatures, appData.featureValues, config.selectedPromptID !== null);
      }
    }
  }, [config.triggerTokenVisualization, config.task, config.numFeatures, appData.selectedFeatures, appData.featureValues, config.selectedPromptID]);

  const updateConfig = (key, value) => {
    setConfig((prevConfig) => {
      const newConfig = { ...prevConfig, [key]: value };

      if (key === 'task') {
        const taskData = newConfig.contextData[value];
        newConfig.numContexts = taskData.length;
        newConfig.contextText = taskData.map((item) => item.context_title);
        newConfig.selectedContextID = null;
        newConfig.selectedPromptID = null;
        newConfig.numPrompts = null;
        newConfig.promptText = [];
      }

      if (key === 'selectedContextID') {
        const taskData = newConfig.contextData[newConfig.task];
        const contextData = taskData[value];
        newConfig.numPrompts = contextData.prompts.length;
        newConfig.promptText = contextData.prompts;
        newConfig.responseText = contextData.responses;
        newConfig.selectedPromptID = null;
        if (newConfig.task === 'text') {
          newConfig.tokens = contextData.context.split(' ');
          newConfig.numFeatures = newConfig.tokens.length;
          newConfig.numFeatureColumns = null;
        } else if (newConfig.task === 'image') {
          newConfig.tokens = [];
          newConfig.numFeatures = contextData.nx * contextData.ny;
          newConfig.numFeatureColumns = contextData.nx;
        }
        newConfig.triggerTokenSet = true;
        newConfig.triggerTokenVisualization = true;
      }

      if (key === 'selectedPromptID') {
        newConfig.triggerFetchCoefficients = true;
      }

      return newConfig;
    });
  };

  const changeSelection = (clickedFeature) => {

    if (config.selectedContextID !== null && config.selectedPromptID !== null) {

      const hasFeature = appData.selectedFeatures.has(clickedFeature);

      setAppData((prevConfig) => {

        if (clickedFeature === null) return prevConfig;

        const newConfig = { ...prevConfig, selectedFeatures: new Set(prevConfig.selectedFeatures) };
        if (hasFeature) {
          newConfig.selectedFeatures.delete(clickedFeature);
        } else {
          newConfig.selectedFeatures.add(clickedFeature);
        }

        return newConfig;
      });
    }

    config.triggerFeatureValueCalculation = true;

  };

  return (
    <div className="App">
      <Sidebar config={config} updateConfig={updateConfig} />
      <MainContent config={config} changeSelection={changeSelection}/>
    </div>
  );
}

export default App;