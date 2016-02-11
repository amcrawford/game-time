const Node = require('./node');

function Snake(options){
  this.nodes = [new Node({time: new Date()})];
  this.pattern = [];
  this.previousTime = new Date();
  this.interval = 25;
}

Snake.prototype.moveUp = function(time){
  if (time - this.previousTime > this.interval){
    this.previousTime = time;
    this.nodes[0].y --;
    this.giveNodesPattern("up");
    this.moveNodes()
  }
};

Snake.prototype.moveDown = function(time){
  if (time - this.previousTime > this.interval){
    this.previousTime = time
    this.nodes[0].y ++;
    this.giveNodesPattern("down");
    this.moveNodes()
  }
}

Snake.prototype.moveRight = function(time){
  if (time - this.previousTime > this.interval){
    this.previousTime = time;
    this.nodes[0].x ++;
    this.giveNodesPattern("right");
    this.moveNodes()
  }
}

Snake.prototype.moveLeft = function(time){
  if (time - this.previousTime > this.interval){
    this.previousTime = time
    this.nodes[0].x --;
    this.giveNodesPattern("left");
    this.moveNodes()
  }
}

Snake.prototype.giveNodesPattern = function(direction){
  for (var i = 0; i < this.nodes.length; i++){
    this.nodes[i].pattern.push(direction)
  }
}

Snake.prototype.moveNodes = function(){
  for (var i = 1; i < this.nodes.length; i++){
    if(0 === this.nodes[i].moveCounter){
      if (this.nodes[i].pattern[0] === "up"){
        this.nodes[i].moveUp();
      } else if (this.nodes[i].pattern[0] === "down"){
        this.nodes[i].moveDown();
      } else if (this.nodes[i].pattern[0] === "right"){
        this.nodes[i].moveRight();
      } else if (this.nodes[i].pattern[0] === "left"){
        this.nodes[i].moveLeft();
      }
      //  move by this.nodes[i].pattern[0]
      if (this.nodes[i].pattern[0] !== this.nodes[i].pattern[1])
       {this.nodes[i].moveCounter = i} else {
         this.nodes[i].moveCounter = 0;
       }

    this.nodes[i].pattern.splice(0)
    } else {
      this.nodes[i].moveCounter --;
    }
  }
}

Snake.prototype.draw = function(context){
  context.fillStyle="#000000";
  for (var i = 0; i < this.nodes.length; i++){
    context.fillRect(this.nodes[i].x, this.nodes[i].y, this.nodes[i].height, this.nodes[i].width);
  }
  return this
}

Snake.prototype.grow = function(direction){
  var node = new Node({
    x: this.nodes[0].x - 10,
    y: this.nodes[0].y,
    moveCounter: this.nodes.length
  })
  this.nodes.push(node)

  // after collision detected and eating a pellet
  // snake grows by one square in the direction that it is moving in
  // snake then moves normally afterwards, including all squares behind head
}

module.exports = Snake;
