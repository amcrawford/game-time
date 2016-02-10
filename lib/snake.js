const Node = require('./node');

function Snake(options){
  this.head = new Node({});
}

Snake.prototype.moveUp = function(){
  var currentNode = this.head
  while (currentNode.next !== null){
    var oldNodeLocation = { x: currentNode.x, y: currentNode.y }
    currentNode.y ++
    currentNode.next.x = oldNodeLocation[x]
    currentNode.next.y = oldNodeLocation[y]
    currentNode = currentNode.next
  }
  return this
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
  var currentNode = this.head
  while (currentNode.next !== null){
    context.fillRect(currentNode.x, currentNode.y, currentNode.height, currentNode.width);
    currentNode = currentNode.next
  }
  context.fillRect(currentNode.x, currentNode.y, currentNode.height, currentNode.width);
  return this
}

Snake.prototype.grow = function(direction){
  var node = new Node({
    x: this.head.x - 10,
    y: this.head.y - 10,
    next: this.head
  })
  this.head = node
  // after collision detected and eating a pellet
  // snake grows by one square in the direction that it is moving in
  // snake then moves normally afterwards, including all squares behind head
}

module.exports = Snake;
