const e=/^[A-Za-z]:\//;const n=/.(\.[^./]+|\.)$/,extname=function(r){if(".."===r)return"";const t=n.exec(function(n=""){return n?n.replace(/\\/g,"/").replace(e,e=>e.toUpperCase()):n}(r));return t&&t[1]||""};export{extname as e};
//# sourceMappingURL=pathe.M-eThtNZ.mjs.map
