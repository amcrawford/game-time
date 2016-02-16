const chai = require('chai');
const assert = chai.assert;

const Snake = require('../lib/snake');

describe('Snake', function() {
  context('with default attributes', function() {
    var snake = new Snake({});
    it('should assign an x coordinate', function() {
      assert.equal(snake.x, 300);
    });
    it('should assign a y coordinate', function() {
      assert.equal(snake.y, 150);
    });
    it('should assign a height', function(){
      assert.equal(snake.height, 10);
    });
    it('should assign a width', function(){
      assert.equal(snake.width, 10);
    });
  });

  describe('Snake moves up', function() {
    var snake = new Snake({});
    it('should increase y coordinate value', function() {
      assert.equal(snake.x, 300);
      assert.equal(snake.y, 150);

      var timeObject = new Date()
      snake.moveUp(new Date(timeObject.getTime() + 1000))

      assert.equal(snake.x, 300);
      assert.equal(snake.y, 160);
    });
  })

  describe('Snake moves down', function() {
    var snake = new Snake({});
    it('should decrease y coordinate value', function() {
      assert.equal(snake.x, 300);
      assert.equal(snake.y, 150);

      var timeObject = new Date()
      snake.moveDown(new Date(timeObject.getTime() + 1000))

      assert.equal(snake.x, 300);
      assert.equal(snake.y, 140);
    });
  })

  describe('Snake moves right', function() {
    var snake = new Snake({});
    it('should increase x coordinate value', function() {
      assert.equal(snake.x, 300);
      assert.equal(snake.y, 150);

      var timeObject = new Date()
      snake.moveRight(new Date(timeObject.getTime() + 1000))
      assert.equal(snake.x, 310);
      assert.equal(snake.y, 150);
    });
  })

  describe('Snake moves left', function() {
    var snake = new Snake({});
    it('should decrease x coordinate value', function() {
      assert.equal(snake.x, 300);
      assert.equal(snake.y, 150);

      var timeObject = new Date()
      snake.moveLeft(new Date(timeObject.getTime() + 1000))
      assert.equal(snake.x, 290);
      assert.equal(snake.y, 150);
    });
  })
});
