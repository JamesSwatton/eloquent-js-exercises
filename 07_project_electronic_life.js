const plan = [
    "###############################",
    "#                             #",
    "#         #        #  o       #",
    "#                             #",
    "#            #######          #",
    "##           #   ###    ##    #",
    "###                #     #    #",
    "#            #    ###         #",
    "#    ###                 #    #",
    "#     ##      o               #",
    "# o    #          o      ##   #",
    "#      #                      #",
    "###############################"
];

function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y );
};
// VECTOR TEST
// -----------
// const vecA = new Vector(2, 2);
// const vecB = new Vector(3, 2);
// console.log(vecA.plus(vecB));


function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}
Grid.prototype.isInside = function(vector) {
    return (vector.x >= 0 && vector.x < this.width &&
            vector.y >= 0 && vector.y < this.height);
};
Grid.prototype.get = function(vector) {
    return this.space[vector.x + vector.y * this.width];
};
Grid.prototype.set = function(vector, value) {
    this.space[vector.x + vector.y * this.width] = value;
};
// GRID TEST
// ---------
// const grid = new Grid(5, 5);
// console.log(grid.get(new Vector(1, 1)));
// grid.set(new Vector(1, 1), "X");
// console.log(grid.get(new Vector(1, 1)));


function elementFromChar(legend, ch) {
    if (ch == " ")
        return null;
    const element = new legend[ch]();
    element.originChar = ch;
    return element;
}

function charFromElement(element) {
    if (element == null) {
        return " ";
    } else {
        return element.originChar;
    }
}

function World(map, legend) {
    this.grid = new Grid(map[0].length, map.length);
    this.legend = legend;

    map.forEach((line, y) => {
        for (let x = 0; x < line.length; x++)
            this.grid.set(new Vector(x, y),
                          elementFromChar(legend, line[x]));
    });
}
World.prototype.toString = function() {
    let output = "";

    for (let y = 0; y < this.grid.height; y++) {
        for (let x = 0; x < this.grid.width; x++) {
            const element = this.grid.get(new Vector(x, y));
            output += charFromElement(element);
        }
        output += "\n";
    }
    return output;
};
// WORLD TEST
// ----------
// function Wall(){};
// function BouncingCritter() {};

// const world = new World(plan,
//                         {"#": Wall,
//                          "o": BouncingCritter});
// console.log(world.toString());
