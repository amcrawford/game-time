function Node(options){
  this.x = options.x || 300;
  this.y = options.y || 150;
  this.height = options.height || 10;
  this.width = options.width || 10;
  this.next = options.next || null
}

Node.prototype.moveUp = function(){
  this.y ++;
};

Node.prototype.moveDown = function(){
  this.y --;
}

Node.prototype.moveRight = function(){
  this.x ++;
}

Node.prototype.moveLeft = function(){
  this.x --;
}

Node.prototype.draw = function(context){
  context.fillStyle="#000000";
  context.fillRect(this.x, this.y, this.height, this.width);
  return this
}

module.exports = Node;
