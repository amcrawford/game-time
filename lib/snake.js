const Node = require('./node');

function Snake(options){
  this.head = new Node({});
}

Snake.prototype.moveUp = function(){
  this.head.y ++;
};

Snake.prototype.moveDown = function(){
  this.head.y --;
}

Snake.prototype.moveRight = function(){
  this.head.x ++;
}

Snake.prototype.moveLeft = function(){
  this.head.x --;
}

Snake.prototype.draw = function(context){
  context.fillStyle="#000000";
  context.fillRect(this.head.x, this.head.y, this.head.height, this.head.width);
  return this
}

Snake.prototype.grow = function(head){
  make a new node that takes the parameter of the head position
  sets that
}

module.exports = Snake;
