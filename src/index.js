
import { range } from 'ramda';
import { random } from 'lodash';

const X_MAX = 400;
const Y_MAX = 400;

const generatePoints = (num) => range(0, num).map(_ => ({
  x: random(0, X_MAX, true),
  y: random(0, Y_MAX, true)
}));

const randomPoints = generatePoints(100);


const randomWeights = ({
  x: random(-1, 1, true),
  y: random(-1, 1, true)
});

const team = point => point.x > point.y ? 1 : -1;

const guess = (weights, point) => {
  const sum = point.x * weights.x + point.y * weights.y
  const team = sum >= 0 ? 1 : -1;
  return team;
};

// const testTrain = () => {
//   const point = { x: 200, y: 400 };
//   return train(randomWeights, point, team(point));
// }

function train(weights, point, actualTeam) {
  const guessResult = guess(weights, point);
  const error = actualTeam - guessResult;
  const learningRate = 0.1;
  return {
    x: weights.x + (point.x * error * learningRate),
    y: weights.y + (point.y * error * learningRate)
  }
}

// const testGuess = guess(randomWeights, {x: 300, y: 400});

const trainedWeights = () => {
  const examples = generatePoints(10000).map(point => ({
    point,
    team: team(point)
  }));

  let currentWeights = randomWeights;
  for (const example of examples) {
    currentWeights = train(currentWeights, example.point, example.team);
  }

  return currentWeights;
};


const svgOutput = `<svg width="${X_MAX}" height="${Y_MAX}"> \
${randomPoints.map(point => 
  `<circle 
     cx="${point.x}"
     cy="${point.y}"
     r="3"
     fill="${guess(trainedWeights(), point) === -1 ? 'blue' : 'red'}" />`
)}
<line x1="0" x2="${X_MAX}" y1="0" y2="${Y_MAX}" stroke="red" />
</svg>` ;

const canvas = document.getElementById('canvas');
canvas.innerHTML = svgOutput; 