function Snake(options){
  this.x = options.x || 300;
  this.y = options.y || 150;
  this.positions = [[300,150]];
  this.height = options.height || 10;
  this.width = options.width || 10;
  this.previousTime = new Date();
  this.interval = 60;
}

Snake.prototype.moveUp = function(time){
  if (time - this.previousTime > this.interval){

    this.previousTime = time;
    this.y += 10;
  }
};

Snake.prototype.moveDown = function(time){
  if (time - this.previousTime > this.interval){
    this.previousTime = time;
    this.y -= 10;
  }
}

Snake.prototype.moveRight = function(time){
  if (time - this.previousTime > this.interval){
    this.previousTime = time;
    this.x += 10;
  }
}

Snake.prototype.moveLeft = function(time){
  if (time - this.previousTime > this.interval){
    this.previousTime = time;
    this.x -= 10;
  }
}

Snake.prototype.grow = function(){
  // console.log(this.positions[this.positions.length - 1]);
  this.positions.push([this.positions[this.positions.length - 1][0], this.positions[this.positions.length - 1][1]]);
}

Snake.prototype.draw = function(context){
  context.fillStyle="#000000";
  this.positions.unshift([this.x, this.y])
  this.positions.forEach(function(num){
    context.fillRect(num[0], num[1], 10, 10);
  })
  this.positions.pop()

  return this
}

module.exports = Snake;
