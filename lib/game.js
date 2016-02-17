const $ = require('jquery');
const _ = require('lodash');
const Round = require('./round');

let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let scores_array = []

function startGame(){
  $('#start-game').on('click', function(){
    var round = new Round({});
    var oldDirection = "left";

    var direction = function(){
      $(document).keydown(function(e){
        if (e.keyCode === 37 && (round.snake.positions.length < 2 || oldDirection !== "right")){
          direction = function(){
            round.snake.moveLeft();
            oldDirection = "left";
          };
        } else if (e.keyCode === 39 && (round.snake.positions.length < 2 || oldDirection !== "left")){
          direction = function(){
            round.snake.moveRight();
            oldDirection = "right";
          };
        } else if (e.keyCode === 40 && (round.snake.positions.length < 2 || oldDirection !== "down")){
          direction = function(){
            round.snake.moveUp();
            oldDirection = "up";
          };
        } else if (e.keyCode === 38 && (round.snake.positions.length < 2 || oldDirection !== "up")){
          direction = function(){
            round.snake.moveDown();
            oldDirection = "down";
          };
        }
      });
    }

    requestAnimationFrame(function gameLoop(){
      context.clearRect(0, 0, canvas.width, canvas.height);
      round.snake.draw(context)

      if(snakeIntersectsWall(round.snake, canvas) || snakeIntersectsItself(round.snake)){
        gameEnds(canvas, context, round.snake, round.score);
      } else {
        if (snakeIntersectsPellet(round.snake, round.pellet)){
          round.pellet.reset()
          doesPelletOverlapWithSnake(round.snake, round.pellet)
          round.pellet.draw(context)
          round.snake.grow()
          round.increaseScore()
        };
        direction()
        round.pellet.draw(context)
        setTimeout(function(){requestAnimationFrame(gameLoop)}, round.snake.interval);
      }
    })
  })
};

function snakeIntersectsPellet(snake, pellet){
  return ((Math.abs(snake.positions[0][0] - pellet.x) < 10) && (Math.abs(snake.positions[0][1] - pellet.y) < 10))
};

function snakeIntersectsWall(snake, canvas){
  return (snake.positions[0][0] < 0 || snake.positions[0][1] < 0 || snake.positions[0][0] > 390 || snake.positions[0][1] > 290)
};

function snakeIntersectsItself(snake){
  var matchCount = 0;
  snake.positions.forEach(function(position){
    if((Math.abs(position[0] - snake.positions[0][0]) < 10) && (Math.abs(position[1] - snake.positions[0][1]) < 10)){
      matchCount ++;
    }
  })
  return matchCount > 1
}

function doesPelletOverlapWithSnake(snake, pellet){
  snake.positions.forEach(function(position){
    while((Math.abs(position[0] - pellet.x) < 10) && (Math.abs(position[1] - pellet.y) < 10)){
      pellet.reset()
    }
  })
}

function gameEnds(canvas, context, snake, score){
  alert("Game Over")
  scores_array.push(score)
  scores_array.sort(function(a, b){return b-a})
  scores_array = scores_array.splice(0, 10)
  localStorage.setItem("scores", scores_array)
  $('#score').html(0);
  var scores_html = ""

  for(var i = 0; i < scores_array.length; i++) {
    scores_html = scores_html +
          "<tr><td>"
          + (i + 1) + "."
          + "</td><td>"
          + scores_array[i]
          + "</td></tr>"
    }

  $('#table_body').html(scores_html)
  console.log(score, localStorage.getItem("scores"))
  context.clearRect(0, 0, canvas.width, canvas.height);
}

startGame();
