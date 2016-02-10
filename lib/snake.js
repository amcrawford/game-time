const Node = require('./node');

function Snake(options){
  this.head = new Node({});
}

Snake.prototype.moveUp = function(){
  updatePosition(this.head)
  this.head.y --;
};

function updatePosition(head) {
  // get head's coordinates before moving
  // set the next node's position equal to the head's coordinates
  var currentNode = head
  while (currentNode.next !== null) {
    
    currentNode.next.x = currentNode.x
    currentNode.next.y = currentNode.y
    currentNode = currentNode.next
  }
}

Snake.prototype.moveDown = function(){
  updatePosition(this.head)
  this.head.y ++;
}

Snake.prototype.moveRight = function(){
  updatePosition(this.head)
  this.head.x ++;
}

Snake.prototype.moveLeft = function(){
  updatePosition(this.head)
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
