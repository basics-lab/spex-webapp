import React from 'react';
import Chatbox from './Chatbox';
import About from './About';

function MainContent({ config, changeSelection}) {
  const { task, selectedContextID, numFeatures } = config;

  if (!task || selectedContextID === null) {
    return (
        <div className="main-area">
        <About/>
        </div>
    );
  }

  if (task === 'image') {
    return (
      <div className="main-area">
        <div className="main-content">
          <div className="image-container">
          <div className="message_title"> Context </div>
          <div className="grid-container" style={{ gridTemplateColumns: `repeat(${config.numFeatureColumns}, 1fr)` }}>
          {[...Array(numFeatures).keys()].map((feat) => (
              <div key={feat} className="patch" id={`patch-${feat}`} onClick={() => changeSelection(feat)}>
              <img src={`${process.env.PUBLIC_URL}/assets/image_${selectedContextID}/patches/patch_${feat}.png`} alt="Part" />
              <div className="patch-overlay"></div>
              <div className="patch-text" style={{ visibility: 'hidden' }}></div>
              </div>
          ))}
          </div>
          </div>
          {config.selectedPromptID !== null && <Chatbox prompt={config.promptText[config.selectedPromptID]} response={config.responseText[config.selectedPromptID]} />}
          </div>  
        <About/>
      </div>
    );
  }
  
  if (task === 'text') {
    return (
        <div className="main-area">
        <div className="main-content">
          <div className="text-container">
          <div className="message_title"> Context </div>
          {[...Array(numFeatures).keys()].map((feat) => (
              <div key={feat} className="token-wrapper" id={`token-${feat}`} onClick={() => changeSelection(feat)} style={{ visibility: 'hidden', display: 'block' }}>
              <div className="token-text">0</div>
              <span className="inline-token"></span>
              </div>
          ))}
          </div>
          {config.selectedPromptID !== null && <Chatbox prompt={config.promptText[config.selectedPromptID]} response={config.responseText[config.selectedPromptID]} />}
          </div>  
        <About/>
      </div>
    );
  }

    return null;

}

function colorTokens(numFeatures, selectedFeatures, featureValues, isConfigComplete){
    for (let feat = 0; feat < `${numFeatures}`; feat++) {
        let divElement = document.getElementById(`token-${feat}`);
        let tokenElement = divElement.getElementsByClassName("inline-token")[0];
        let scoreElement = divElement.getElementsByClassName("token-text")[0];

        let rootStyles = getComputedStyle(document.documentElement);
        let greenColor = rootStyles.getPropertyValue('--overlay-positive-color').trim();
        let redColor = rootStyles.getPropertyValue('--overlay-negative-color').trim();
        let overlayDefaultColor = rootStyles.getPropertyValue('--overlay-default-color').trim();
        let selectedColor = rootStyles.getPropertyValue('--border-selected-color').trim();
        let borderDefaultColor = rootStyles.getPropertyValue('--border-default-color').trim();

        if (!isConfigComplete) {
            scoreElement.textContent = "";
            scoreElement.style.visibility = "hidden";
            tokenElement.style.backgroundColor = `${overlayDefaultColor}60`;
            tokenElement.style.border = `3px solid ${overlayDefaultColor}`;
        } else if (selectedFeatures.has(feat)) {
            scoreElement.textContent = "";
            scoreElement.style.visibility = "hidden";
            tokenElement.style.backgroundColor = `${selectedColor}60`;
            tokenElement.style.border = `3px solid ${selectedColor}`;
        } else {
            scoreElement.textContent = featureValues[feat].toFixed(2);
            scoreElement.style.visibility = "visible";
            var scoreColor = interpolateColor(featureValues[feat], redColor, greenColor, overlayDefaultColor);
            tokenElement.style.backgroundColor = `${scoreColor}60`;
            tokenElement.style.border = `3px solid ${scoreColor}`;
            scoreElement.style.color = `${scoreColor}`;
        }
    }
}

function colorPatches(numFeatures, selectedFeatures, featureValues, isConfigComplete){
    for (let feat = 0; feat < `${numFeatures}`; feat++) {
        let divElement = document.getElementById(`patch-${feat}`);
        let imgElement = divElement.querySelector("img");
        let imgOverlay = divElement.getElementsByClassName("patch-overlay")[0];
        let scoreElement = divElement.getElementsByClassName("patch-text")[0];
        
        let rootStyles = getComputedStyle(document.documentElement);
        let greenColor = rootStyles.getPropertyValue('--overlay-positive-color').trim();
        let redColor = rootStyles.getPropertyValue('--overlay-negative-color').trim();
        let overlayDefaultColor = rootStyles.getPropertyValue('--overlay-default-color').trim();
        let selectedColor = rootStyles.getPropertyValue('--border-selected-color').trim();
        let borderDefaultColor = rootStyles.getPropertyValue('--border-default-color').trim();

        imgElement.style.border = `4px solid ${borderDefaultColor}`;

        if (!isConfigComplete) {
            scoreElement.textContent = "";
            scoreElement.style.visibility = "hidden";
            imgOverlay.style.border = `4px solid ${borderDefaultColor}`;
            imgOverlay.style.backgroundColor = `#00000000`;
        } else if (selectedFeatures.has(feat)) {
            scoreElement.textContent = "";
            scoreElement.style.visibility = "hidden";
            imgOverlay.style.border = `4px solid ${selectedColor}`;
            imgOverlay.style.backgroundColor = `${overlayDefaultColor}60`;
        } else {
            scoreElement.textContent = featureValues[feat].toFixed(2);
            scoreElement.style.visibility = "visible";
            var scoreColor = interpolateColor(featureValues[feat], redColor, greenColor, overlayDefaultColor);
            imgOverlay.style.border = `4px solid ${scoreColor}`;
            imgOverlay.style.backgroundColor = `${scoreColor}80`;
            scoreElement.style.color = `${scoreColor}`;
            scoreElement.style.backgroundColor = `${overlayDefaultColor}70`;
        }
    }
}

function setTokens(tokens){
    for (let feat = 0; feat < `${tokens.length}`; feat++) {
        let divElement = document.getElementById(`token-${feat}`);
        let tokenElement = divElement.getElementsByClassName("inline-token")[0];
        tokenElement.textContent = tokens[feat];
        divElement.style.visibility = "visible";
    }
}

export { colorTokens , colorPatches, setTokens};
export default MainContent;

function interpolateColor(value, redColor, greenColor, midpointColor) {
    // Clamp value between -1 and 1
    value = Math.max(-1, Math.min(1, value));
    // Convert hex to RGB
    function hexToRgb(hex) {
        let bigint = parseInt(hex.replace("#", ""), 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }
    // Convert RGB to hex
    function rgbToHex(r, g, b) {
        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
    }
    // Get RGB values
    let rgbGreen = hexToRgb(greenColor);
    let rgbRed = hexToRgb(redColor);
    let rgbMid = hexToRgb(midpointColor);
    // Normalize value from [-1,1] to [0,1]
    let t = (value + 1) / 2;
    let r, g, b;
    if (t < 0.5) {
        // Interpolate between red and midpoint
        t = t * 2;
        r = Math.round(rgbRed[0] + (rgbMid[0] - rgbRed[0]) * t);
        g = Math.round(rgbRed[1] + (rgbMid[1] - rgbRed[1]) * t);
        b = Math.round(rgbRed[2] + (rgbMid[2] - rgbRed[2]) * t);
    } else {
        // Interpolate between midpoint and green
        t = (t - 0.5) * 2;
        r = Math.round(rgbMid[0] + (rgbGreen[0] - rgbMid[0]) * t);
        g = Math.round(rgbMid[1] + (rgbGreen[1] - rgbMid[1]) * t);
        b = Math.round(rgbMid[2] + (rgbGreen[2] - rgbMid[2]) * t);
    }
    return rgbToHex(r, g, b);
}
