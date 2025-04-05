import React from 'react';

const About = () => {
    return (
        <div className='about'>
            <hr></hr>
            <div>
            Check out our paper&nbsp;
            <a href="https://arxiv.org/abs/2502.13870" target="_blank" rel="noopener noreferrer">SPEX: Scaling Feature Interaction Explanations for LLMs
            </a> 
            &nbsp;on <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/ArXiv_logo_2022.png" alt="arXiv logo" style={{ height: '18px', verticalAlign: 'middle' }} />
            &nbsp;and our Python package&nbsp;
            <a href="https://github.com/basics-lab/spectral-explain" target="_blank" rel="noopener noreferrer">SPEX</a>
            &nbsp;on GitHub <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="Github logo" style={{ height: '18px', verticalAlign: 'middle' }}/>.
            </div>
            Developed by <b>Yigit Efe Erginbas</b>, Landon Butler, Justin Singh Kang, and Abhineet Agarwal.
        </div>
    );
};

export default About;