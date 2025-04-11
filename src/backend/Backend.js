async function fetchCoefficients(task, context_id, prompt_id){
    const response = await fetch(`${process.env.PUBLIC_URL}/assets/spex/${task}/context_${context_id}/prompt_${prompt_id}.json`);
    const data = await response.json();
    return data;
}

async function calculateFeatureValues(coefficients, selectedFeatures, numFeatures){
    let featureSums = new Array(numFeatures).fill(0);

    // Project the Fourier coefficients
    let projectedCoefficients = {};
    for (let key in coefficients) {
        var newKey = '0'.repeat(numFeatures).split("");
        var newValue = coefficients[key];
        for (let i = 0; i < numFeatures; i++) {
            if (key[i] === '1'){
                if (selectedFeatures.has(i)) {
                    newValue *= (-1);
                } else {
                    newKey[i] = '1'
                }
            }
        }
        newKey = newKey.join("");
        if (newKey in projectedCoefficients) {
            projectedCoefficients[newKey] = projectedCoefficients[newKey] + newValue;
        } else {
            projectedCoefficients[newKey] = newValue;
        }
    }

    // Compute influence
    for (let key in projectedCoefficients) {
        for (let i = 0; i < numFeatures; i++) {
            if (key[i] === '1') {
                featureSums[i] += (projectedCoefficients[key] ** 2);
            }
        }
    }

    // Compute Banzhaf value
    // for (let key in projectedCoefficients) {
    //     var degree = 0;
    //     for (let i = 0; i < numFeatures; i++) {
    //         if (key[i] === '1') {
    //             degree += 1;
    //         }
    //     }
    //     if (degree === 1) {
    //         for (let i = 0; i < numFeatures; i++) {
    //             if (key[i] === '1') {
    //                 featureSums[i] += -2 * projectedCoefficients[key];
    //             }
    //         }
    //     }
    // }

    // Normalize influence
    let maxVal = Math.max(...featureSums);
    if (maxVal !== 0){
        featureSums = featureSums.map(val => val / 1);
    } else {
        featureSums = featureSums.map(val => 0);
    }
    return featureSums;
}

export { fetchCoefficients, calculateFeatureValues };
