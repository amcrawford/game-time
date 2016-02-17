function Pellet(options){
  this.x = options.x || 150;
  this.y = options.y || 150;
  this.height = options.height || 10;
  this.width = options.width || 10;
}

Pellet.prototype.draw = function(context){
  context.fillStyle="#7FFF00";
  context.fillRect(this.x, this.y, this.height, this.width);
  return this
}

Pellet.prototype.reset = function(){
  this.x = randomNumber(0, 390);
  this.y = randomNumber(0, 290);
}

function randomNumber(minimum, maximum){
    return Math.round( Math.random() * (maximum - minimum) + minimum);
}

module.exports = Pellet;
