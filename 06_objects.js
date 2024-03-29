// A Vector Type
// -------------
// Write a constructor 'Vector' that represents a vector in two-dimensional space.
// It takes 'x' and 'y' parameters (numbers), which it should save to properties of the same name.
// Give the 'Vector' prototype two methods, 'plus' and 'minus', that take another vector as
// a parameter and returns a new vector that has the sum or difference of the two vectors'
// (the one in 'this' and the parameter) 'x' and 'y' values.
// Add a getter property 'length' to the prototype that computes the length of the vector - that
// is, the distance of the point(x,y) from the origin (0,0).

function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
};
Vector.prototype.minus = function(vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
};
Object.defineProperty(Vector.prototype, "length", {
    get: function() { return Math.sqrt(this.x**2 + this.y**2).toFixed(2); }
});

console.log(new Vector(2, 2).length);


// Another Cell
// ------------
// Implement a cell type named 'StretchCell(inner, width, height)' that conforms to the table cell
// interface described earlier in the chapter. it should wrap another cell (like 'UnderlinedCell' does)
// and ensure that the resulting cell has at least the given 'width' and 'height', even if the inner
// cell would naturally be smaller.

function StretchCell(inner, width, height) {
    this.inner = inner;
    this.width = width;
    this.height = height;
}
StretchCell.prototype.minHeight = function() {
    return Math.max(this.height, this.inner.minHeight());
};
StretchCell.prototype.minWidth = function() {
    return Math.max(this.width, this.inner.minWidth());
};
StretchCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height);
}


// Sequence Interface
// ------------------
// Design an 'interface' that abstracts iteration over a collection of values.
// An object that provides this interface represents a sequence, and the interface
// must somehow make it possible for code that uses such an object to iterate
// over the sequence, looking at the element values it is made up of and having some
// way to find out when the end of the sequence is reached.
//     When you have specified your interface, try to write a function 'logFive' that
// takes a sequence object and calls 'console.log' on its first five elements - or
// fewer, if the sequence has fewer than five elements.
//     Then inplement an object type 'ArraySeq' that wraps an array and allows
// iteration over the array using the interface you designed. Implement another
// object type 'RangeSeq' that iterates over a range of integers (taking 'from' and
// 'to' arguments to its constructor) instead.

