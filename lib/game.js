const $ = require('jquery');
const Round = require('./round');

let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');
let scores_array = localStorage.getItem("scores").split(",");
let speed = 100;

$('#set-easy-level').on('click', function(){
  speed = 100;
  $('#difficulty-level').html('Easy');
});
$('#set-med-level').on('click', function(){
  speed = 50;
  $('#difficulty-level').html('Medium');
});
$('#set-hard-level').on('click', function(){
  speed = 30;
  $('#difficulty-level').html('Hard');
});

function startGame(){
  renderHighScores();

  $('#start-game').on('click', function(){
    var round = new Round({interval: speed});
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
    };

    requestAnimationFrame(function gameLoop(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      round.snake.draw(ctx);

      if(round.snakeIntersectsWall(canvas) || round.snake.snakeIntersectsItself()){
        gameEnds(canvas, ctx, round.snake, round.score);
      } else {
        if (round.snakeIntersectsPellet()){
          round.pellet.reset();
          round.doesPelletOverlapWithSnake();
          round.pellet.draw(ctx);
          round.snake.grow();
          round.increaseScore();
        }
        direction();
        round.pellet.draw(ctx);
        setTimeout(function(){requestAnimationFrame(gameLoop);}, round.snake.interval);
      }
    });
  });
}

function renderHighScores(){
  var scores_html = "";
  var scores_array = localStorage.getItem("scores");
  scores_array = scores_array.split(",");
  for(var i = 0; i < scores_array.length; i++) {
    scores_html = scores_html +
          "<tr><td>" +
          (i + 1) +
          "." +
          "</td><td>" +
          scores_array[i] +
          "</td></tr>";
  }
  $('#table_body').html(scores_html);
}


function gameEnds(canvas, ctx, snake, score){
  alert("The Snake Died! You suck.");
  scores_array.push(score);
  scores_array.sort(function(a, b){return b-a;});
  scores_array = scores_array.splice(0, 10);
  localStorage.setItem("scores", scores_array);
  $('#score').html(0);

  renderHighScores();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

startGame();
