const $ = require('jquery');
const _ = require('lodash');
const Round = require('./round');

let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

function startGame(){
  $('#start-game').on('click', function(){
    var round = new Round({});
    var oldDirection = "left";

    var direction = function(){
      $(document).keydown(function(e){
        if (e.keyCode === 37 && (round.snake.positions.length < 2 || oldDirection !== "right")){
          direction = function(){
            round.snake.moveLeft(new Date());
            oldDirection = "left";
          };
        } else if (e.keyCode === 39 && (round.snake.positions.length < 2 || oldDirection !== "left")){
          direction = function(){
            round.snake.moveRight(new Date());
            oldDirection = "right";
          };
        } else if (e.keyCode === 40 && (round.snake.positions.length < 2 || oldDirection !== "down")){
          direction = function(){
            round.snake.moveUp(new Date());
            oldDirection = "up"
          };
        } else if (e.keyCode === 38 && (round.snake.positions.length < 2 || oldDirection !== "up")){
          direction = function(){
            round.snake.moveDown(new Date());
            oldDirection = "down"
          };
        }
      });
    }

    $('#score').html(round.score);

    requestAnimationFrame(function gameLoop(){
      context.clearRect(0, 0, canvas.width, canvas.height);
      round.snake.draw(context)
      if (snakeIntersectsPellet(round.snake, round.pellet)){
        round.pellet.reset()
        round.pellet.draw(context)
        round.snake.grow()
        round.increaseScore()
      };
      direction()

      round.pellet.draw(context)

      if(snakeIntersectsWall(round.snake, canvas) || snakeIntersectsItself(round.snake)){
        gameEnds(canvas, context, round.snake);
      } else {
        requestAnimationFrame(gameLoop);
      }
    })
  })
};

function snakeIntersectsPellet(snake, pellet){
  return ((Math.abs(snake.positions[0][0] - pellet.x) < 10) && (Math.abs(snake.positions[0][1] - pellet.y) < 10))
};

function snakeIntersectsWall(snake, canvas){
  return (snake.positions[0][0] < 0 || snake.positions[0][1] < 0 || snake.positions[0][0] > 400 || snake.positions[0][1] > 300)
};

function snakeIntersectsItself(snake){
  var matchCount = 0;
  snake.positions.forEach(function(position){
    if(position[0] === snake.x && position[1] === snake.y){
      matchCount ++;
    }
  })
  return matchCount > 3
}

function gameEnds(canvas, context, snake, score){
  alert("Game Over")
  // $('#score').html(0);
  context.clearRect(0, 0, canvas.width, canvas.height);
}

startGame();
