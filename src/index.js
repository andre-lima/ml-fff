
import { range } from 'ramda';
import { random } from 'lodash';

const X_MAX = 400;
const Y_MAX = 400;

const randomPoints = range(0, 100).map(x => ({
  x: random(0, X_MAX, true),
  y: random(0, Y_MAX, true)
}));

const randomWeights = ({
  x: random(-1, 1, true),
  y: random(-1, 1, true)
});

const team = point => point.x > point.y ? 1 : -1;

const guess =  (weights, point) => {
  const sum = point.x * weights.x + point.y * weights.y
  const team = sum >= 0 ? 1 : -1;
  return team;
};

const testTrain = () => {
  const point = { x: 200, y: 400 };
  return train(randomWeights, point, team(point));
}

function train(weights, point, actualTeam) {
  const guessResult = guess(weights, point);
  const error = actualTeam - guessResult;
  return guessResult;
}

const testGuess = guess(randomWeights, {x: 300, y: 400});


const svgOutput = `<svg width="${X_MAX}" height="${Y_MAX}"> \
${randomPoints.map(point => 
  `<circle 
     cx="${point.x}"
     cy="${point.y}"
     r="3"
     fill="${guess(randomWeights, point) === -1 ? 'blue' : 'red'}" />`
)}
<line x1="0" x2="${X_MAX}" y1="0" y2="${Y_MAX}" stroke="red" />
</svg>` ;



const canvas = document.getElementById('canvas');
canvas.innerHTML = svgOutput; 