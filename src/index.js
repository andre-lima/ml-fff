
const R = require('ramda');
const _ = require('lodash');

const X_MAX = 400;
const Y_MAX = 400;

const randomPoints = R.range(0, 100).map(x => ({
  x: _.random(0, X_MAX, true),
  y: _.random(0, Y_MAX, true)
}));
console.log(randomPoints);

const svgOutput = `<svg width="${X_MAX}" height="${Y_MAX}"> \
${randomPoints.map(point => 
  `<circle 
     cx="${point.x}"
     cy="${point.y}"
     r="3" />`
)}
<line x1="0" x2="${X_MAX}" y1="0" y2="${Y_MAX}" stroke="red" />
</svg>` ;


const canvas = document.getElementById('canvas');
canvas.innerHTML = svgOutput; 