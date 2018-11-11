
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

const guess = (weights, point) => {
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
  return {
    x: weights.x + (point.x * error),
    y: weights.y + (point.y * error)
  }
}

const testGuess = guess(randomWeights, {x: 300, y: 400});

const trainedWeights = () => {
  const ex1 = { x: 721, y: 432 };
  const ex2 = { x: 211, y: 122 };
  const ex3 = { x: 328, y: 833 };
  const ex4 = { x: 900, y: 400 };
  const ex5 = { x: 21, y: 32 };
  const ex6 = { x: 511, y: 2 };
  const ex7 = { x: 128, y: 733 };
  const ex8 = { x: 900, y: 4 };
  let newWeights;

  newWeights = train(randomWeights, ex1, team(ex1));
  newWeights = train(newWeights, ex2, team(ex2));
  newWeights = train(newWeights, ex3, team(ex3));
  newWeights = train(newWeights, ex4, team(ex4));
  newWeights = train(newWeights, ex5, team(ex5));
  newWeights = train(newWeights, ex6, team(ex6));
  newWeights = train(newWeights, ex7, team(ex7));
  newWeights = train(newWeights, ex8, team(ex8));

  return newWeights;
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