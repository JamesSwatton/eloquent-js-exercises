function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y );
};

// const vecA = new Vector(2, 2);
// const vecB = new Vector(3, 2);

// console.log(vecA.plus(vecB));
