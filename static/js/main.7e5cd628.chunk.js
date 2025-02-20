(this["webpackJsonpspex-webapp-react"]=this["webpackJsonpspex-webapp-react"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var l=n(0),a=n.n(l),o=n(3),s=n.n(o);n(13),n(14);var r=function(e){let{taskType:t,updateConfig:n}=e;return a.a.createElement("div",{id:"task-container"},a.a.createElement("h3",null,"Select a Task"),a.a.createElement("div",{className:"image-selection-grid"},a.a.createElement("button",{type:"button",className:"task-button "+("image"===t?"selected":""),onClick:()=>n("task","image")},a.a.createElement("span",{role:"img","aria-label":"image"},"\ud83d\uddbc\ufe0f")," Image"),a.a.createElement("button",{type:"button",className:"task-button "+("text"===t?"selected":""),onClick:()=>n("task","text")},a.a.createElement("span",{role:"img","aria-label":"text"},"\ud83d\udcc4")," Text")))};var c=function(e){let{selectedContextId:t,numContexts:n,taskType:l,contextText:o,updateConfig:s}=e;return l?"image"===l?a.a.createElement("div",{id:"context-container"},a.a.createElement("h3",null,"Select an Image"),a.a.createElement("div",{className:"image-selection-grid",id:"image-context-selection-grid"},[...Array(n).keys()].map(e=>a.a.createElement("div",{key:e,className:"context-image-button "+(t===e?"selected":""),onClick:()=>s("selected_context_id",e)},a.a.createElement("img",{src:`/spex-webapp/assets/image_${e}.png`,alt:"Option"}))))):"text"===l?a.a.createElement("div",{id:"context-container"},a.a.createElement("h3",null,"Select a Context"),a.a.createElement("div",{className:"text-selection-grid"},[...Array(n).keys()].map(e=>a.a.createElement("button",{key:e,type:"button",className:"context-text-button "+(t===e?"selected":""),onClick:()=>s("selected_context_id",e)},o[e])))):null:null};var i=function(e){let{selectedPromptId:t,numPrompts:n,taskType:l,promptText:o,updateConfig:s}=e;return l&&null!==n?a.a.createElement("div",{id:"prompt-container"},a.a.createElement("h3",null,"Select a Prompt"),a.a.createElement("div",{className:"text-selection-grid"},[...Array(n).keys()].map(e=>a.a.createElement("button",{key:e,type:"button",className:"prompt-button "+(t===e?"selected":""),onClick:()=>s("selected_prompt_id",e)},o[e])))):null};var d=function(e){let{config:t,updateConfig:n}=e;return a.a.createElement("div",{className:"sidebar"},a.a.createElement("h2",null,a.a.createElement("span",{role:"img","aria-label":"sunglasses"},"\ud83d\udd76\ufe0f")," SPEX"),a.a.createElement(r,{taskType:t.task,updateConfig:n}),a.a.createElement(c,{selectedContextId:t.selected_context_id,numContexts:t.num_contexts,taskType:t.task,contextText:t.context_text,updateConfig:n}),a.a.createElement(i,{selectedPromptId:t.selected_prompt_id,numPrompts:t.num_prompts,taskType:t.task,promptText:t.prompt_text,updateConfig:n}))};var m=function(e){let{config:t,changeSelection:n}=e;const{task:l,selected_context_id:o,num_features:s}=t;return l&&null!==o?"image"===l?a.a.createElement("div",{className:"main-content"},a.a.createElement("div",{className:"grid-container"},[...Array(s).keys()].map(e=>a.a.createElement("div",{key:e,className:"patch",id:"patch-"+e,onClick:()=>n(e)},a.a.createElement("img",{src:`/spex-webapp/assets/image_${o}/split_${e}.png`,alt:"Part"}),a.a.createElement("div",{className:"patch-overlay"}),a.a.createElement("div",{className:"patch-text",style:{visibility:"hidden"}}))))):"text"===l?a.a.createElement("div",{className:"main-content"},a.a.createElement("div",{className:"text-container"},[...Array(s).keys()].map(e=>a.a.createElement("div",{key:e,className:"token-wrapper",id:"token-"+e,onClick:()=>n(e),style:{visibility:"hidden"}},a.a.createElement("div",{className:"token-text"},"0"),a.a.createElement("span",{className:"inline-token"}))))):void 0:null};function u(e,t,n){function l(e){let t=parseInt(e.replace("#",""),16);return[t>>16&255,t>>8&255,255&t]}e=Math.max(-1,Math.min(1,e));let a=l(n),o=l(t),s=(e+1)/2;return function(e,t,n){return"#"+(1<<24|e<<16|t<<8|n).toString(16).slice(1).toUpperCase()}(Math.round(o[0]+(a[0]-o[0])*s),Math.round(o[1]+(a[1]-o[1])*s),Math.round(o[2]+(a[2]-o[2])*s))}var p=function(){const[e,t]=Object(l.useState)({task:null,selected_context_id:null,selected_prompt_id:null,num_contexts:null,context_text:[],num_prompts:null,prompt_text:[],tokens:[],num_features:12,selected_features:new Set,feature_values:[]});return Object(l.useEffect)(()=>{fetch("/spex-webapp/config.json").then(e=>e.json()).then(e=>{t(t=>({...t,context_data:e}))})},[]),Object(l.useEffect)(()=>{null!==e.selected_context_id&&("text"===e.task?function(e,t,n,l){for(let o=0;o<""+e;o++){let e=document.getElementById("token-"+o),s=e.getElementsByClassName("inline-token")[0],r=e.getElementsByClassName("token-text")[0],c=getComputedStyle(document.documentElement),i=c.getPropertyValue("--overlay-positive-color").trim(),d=c.getPropertyValue("--overlay-negative-color").trim(),m=c.getPropertyValue("--overlay-default-color").trim(),p=c.getPropertyValue("--border-selected-color").trim(),y=c.getPropertyValue("--border-default-color").trim();if(l)if(t.includes(o))r.textContent="",r.style.visibility="hidden",s.style.backgroundColor=p+"60",s.style.border="3px solid "+p;else{r.textContent=n[o].toFixed(2),r.style.visibility="visible";var a=u(n[o],d,i);s.style.backgroundColor=a+"60",s.style.border="3px solid "+y,r.style.color=""+a}else r.textContent="",r.style.visibility="hidden",s.style.backgroundColor=m+"60",s.style.border="3px solid "+m}}(e.num_features,Array.from(e.selected_features),e.feature_values,null!==e.selected_prompt_id):"image"===e.task&&function(e,t,n,l){for(let o=0;o<""+e;o++){let e=document.getElementById("patch-"+o),s=e.querySelector("img"),r=e.getElementsByClassName("patch-overlay")[0],c=e.getElementsByClassName("patch-text")[0],i=getComputedStyle(document.documentElement),d=i.getPropertyValue("--overlay-positive-color").trim(),m=i.getPropertyValue("--overlay-negative-color").trim(),p=i.getPropertyValue("--overlay-default-color").trim(),y=i.getPropertyValue("--border-selected-color").trim(),g=i.getPropertyValue("--border-default-color").trim();if(l)if(t.has(o))c.textContent="",c.style.visibility="hidden",s.style.border="6px solid "+y,r.style.border="6px solid "+y,r.style.backgroundColor=p+"60";else{c.textContent=n[o].toFixed(2),c.style.visibility="visible",s.style.border="6px solid "+d,r.style.border="6px solid "+g;var a=u(n[o],m,d);c.style.color=""+a,r.style.backgroundColor=a+"60"}else c.textContent="",c.style.visibility="hidden",s.style.border="6px solid "+g,r.style.border="6px solid "+g,r.style.backgroundColor="#00000000"}}(e.num_features,e.selected_features,e.feature_values,null!==e.selected_prompt_id)),console.log("config",e)},[e]),Object(l.useEffect)(()=>{"text"===e.task&&null!==e.selected_context_id&&function(e){console.log("tokens",e);for(let t=0;t<""+e.length;t++){let n=document.getElementById("token-"+t);n.getElementsByClassName("inline-token")[0].textContent=e[t],n.style.visibility="visible"}}(e.tokens)},[e.selected_context_id,e.task,e.tokens]),a.a.createElement("div",{className:"App"},a.a.createElement(d,{config:e,updateConfig:(e,n)=>{t(t=>{const l={...t,[e]:n};if("task"===e){const e=l.context_data[n];l.num_contexts=e.length,l.context_text=e.map(e=>e.context),l.selected_context_id=null,l.selected_prompt_id=null,l.num_prompts=null,l.prompt_text=[]}if("selected_context_id"===e){const e=l.context_data[l.task][n];l.num_prompts=e.prompts.length,l.prompt_text=e.prompts,l.selected_prompt_id=null,l.tokens=e.tokens,l.num_features=e.tokens.length,l.feature_values=Array(l.num_features).fill(0)}return l.selected_features=new Set,l})}}),a.a.createElement(m,{config:e,changeSelection:n=>{if(null!==e.selected_context_id&&null!==e.selected_prompt_id){console.log("clicked patch",n);const l=e.selected_features.has(n);t(e=>{if(null===n)return e;const t={...e,selected_features:new Set(e.selected_features)};return l?t.selected_features.delete(n):t.selected_features.add(n),t})}}}))};var y=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then(t=>{let{getCLS:n,getFID:l,getFCP:a,getLCP:o,getTTFB:s}=t;n(e),l(e),a(e),o(e),s(e)})};s.a.createRoot(document.getElementById("root")).render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(p,null))),y()},4:function(e,t,n){e.exports=n(15)}},[[4,1,2]]]);
//# sourceMappingURL=main.7e5cd628.chunk.js.map