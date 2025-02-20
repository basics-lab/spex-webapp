import React from 'react';

function MainContent({ config, changeSelection}) {
  const { task, selected_context_id, num_features } = config;

  if (!task || selected_context_id === null) return null;

  if (task === 'image') {
    var content = (
      <div className="main-content">
          <div className="grid-container">
          {[...Array(num_features).keys()].map((feat) => (
              <div key={feat} className="patch" id={`patch-${feat}`} onClick={() => changeSelection(feat)}>
              <img src={`${process.env.PUBLIC_URL}/assets/image_${selected_context_id}/split_${feat}.png`} alt="Part" />
              <div className="patch-overlay"></div>
              <div className="patch-text" style={{ visibility: 'hidden' }}></div>
              </div>
          ))}
          </div>
      </div>
    );
    return content;
  }
  
  if (task === 'text') {
    return (
      <div className="main-content">
          <div className="text-container">
          {[...Array(num_features).keys()].map((feat) => (
              <div key={feat} className="token-wrapper" id={`token-${feat}`} onClick={() => changeSelection(feat)} style={{ visibility: 'hidden' }}>
              <div className="token-text">0</div>
              <span className="inline-token"></span>
              </div>
          ))}
          </div>
      </div>
    );
  }

}

function colorTokens(num_features, selected_features, feature_values, isConfigComplete){
    for (let feat = 0; feat < `${num_features}`; feat++) {
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
        } else if (selected_features.includes(feat)) {
            scoreElement.textContent = "";
            scoreElement.style.visibility = "hidden";
            tokenElement.style.backgroundColor = `${selectedColor}60`;
            tokenElement.style.border = `3px solid ${selectedColor}`;
        } else {
            scoreElement.textContent = feature_values[feat].toFixed(2);
            scoreElement.style.visibility = "visible";
            var backgroundColor = interpolateColor(feature_values[feat], redColor, greenColor)
            tokenElement.style.backgroundColor = `${backgroundColor}60`;
            tokenElement.style.border = `3px solid ${borderDefaultColor}`;
            scoreElement.style.color = `${backgroundColor}`;
        }
    }
}

function colorPatches(num_features, selected_features, feature_values, isConfigComplete){
    for (let feat = 0; feat < `${num_features}`; feat++) {
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

        if (!isConfigComplete) {
            scoreElement.textContent = "";
            scoreElement.style.visibility = "hidden";
            imgElement.style.border = `6px solid ${borderDefaultColor}`;
            imgOverlay.style.border = `6px solid ${borderDefaultColor}`;
            imgOverlay.style.backgroundColor = `#00000000`;
        } else if (selected_features.has(feat)) {
            scoreElement.textContent = "";
            scoreElement.style.visibility = "hidden";
            imgElement.style.border = `6px solid ${selectedColor}`;
            imgOverlay.style.border = `6px solid ${selectedColor}`;
            imgOverlay.style.backgroundColor = `${overlayDefaultColor}60`;
        } else {
            scoreElement.textContent = feature_values[feat].toFixed(2);
            scoreElement.style.visibility = "visible";
            imgElement.style.border = `6px solid ${greenColor}`;
            imgOverlay.style.border = `6px solid ${borderDefaultColor}`;
            var backgroundColor = interpolateColor(feature_values[feat], redColor, greenColor)
            scoreElement.style.color = `${backgroundColor}`;
            imgOverlay.style.backgroundColor = `${backgroundColor}60`;
        }
    }
}

function setTokens(tokens){
    console.log('tokens', tokens);
    for (let feat = 0; feat < `${tokens.length}`; feat++) {
        let divElement = document.getElementById(`token-${feat}`);
        let tokenElement = divElement.getElementsByClassName("inline-token")[0];
        tokenElement.textContent = tokens[feat];
        divElement.style.visibility = "visible";
    }
}

export { colorTokens , colorPatches, setTokens};
export default MainContent;

function interpolateColor(value, redColor, greenColor) {
    // Ensure value is clamped between -1 and 1
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
    // Normalize value from [-1,1] to [0,1]
    let t = (value + 1) / 2;
    // Linear interpolation for each color channel
    let r = Math.round(rgbRed[0] + (rgbGreen[0] - rgbRed[0]) * t);
    let g = Math.round(rgbRed[1] + (rgbGreen[1] - rgbRed[1]) * t);
    let b = Math.round(rgbRed[2] + (rgbGreen[2] - rgbRed[2]) * t);
    return rgbToHex(r, g, b);
}
