function Snake(options){
  this.x = options.x || 300;
  this.y = options.y || 150;
  this.positions = options.positions || [[300,150]];
  this.height = options.height || 10;
  this.width = options.width || 10;
  this.interval = options.interval || 100;
  this.trail = [];
}

Snake.prototype.moveUp = function(){
  this.y += 10;
};

Snake.prototype.moveDown = function(){
  this.y -= 10;
};

Snake.prototype.moveRight = function(){
  this.x += 10;
};

Snake.prototype.moveLeft = function(){
  this.x -= 10;
};

Snake.prototype.grow = function(){
  this.positions.push([this.x, this.y]);
};

Snake.prototype.draw = function(context){
  context.fillStyle="#000000";
  this.positions.unshift([this.x, this.y]);
  this.trail.push(this.positions.pop());
  this.positions.forEach(function(num){
    context.fillRect(num[0], num[1], 10, 10);
  });

  return this;
};

Snake.prototype.drawTrail = function(context){
  context.fillStyle="#7FFF00";
  this.trail.forEach(function(num){
    context.fillRect(num[0], num[1], 10, 10);
  });
}

Snake.prototype.snakeIntersectsItself = function(){
  var matchCount = 0;
  var self = this;
  this.positions.forEach(function(position){
    if((Math.abs(position[0] - self.positions[0][0]) < 10) && (Math.abs(position[1] - self.positions[0][1]) < 10)){
      matchCount ++;
    }
  });
  return matchCount > 1;
};

module.exports = Snake;
