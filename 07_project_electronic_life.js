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

const directions = {
    "n": new Vector(0, -1),
    "ne": new Vector(1, -1),
    "e": new Vector(1, 0),
    "se": new Vector(1, 1),
    "s": new Vector(0, 1),
    "sw": new Vector(-1, 1),
    "w": new Vector(-1, 0),
    "nw": new Vector(-1, -1)
};

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

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
    this.direction = randomElement(directionNames);
};
BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) != " ") {
        this.direction = view.find(" ") || "s";
    }
    return {type: "move", direction: this.direction};
};

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
    const grid =  new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach((line, y) => {
        for (let x = 0; x < line.length; x++)
            grid.set(new Vector(x, y),
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
World.prototype.turn = function () {
    let acted = [];

    this.grid.forEach((critter, vector) => {
        if (critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            this.letAct(critter, vector);
        }
    }, this);
};
World.prototype.letAct = function(critter, vector) {
    const action = critter.act(new View(this, vector));
    if (action && action.type == "move") {
        const dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest) == null) {
            this.grid.set(vector, null);
            this.grid.set(dest, critter);
        }
    }
};
World.prototype.checkDestination = function(action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
        const dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest))
            return dest;
    }
};

// WORLD TEST
// ----------
// function Wall(){};
// function BouncingCritter() {};

// const world = new World(plan,
//                         {"#": Wall,
//                          "o": BouncingCritter});
// console.log(world.toString());


function View(world, vector) {
    this.world = world;
    this.vector = vector;
}
View.prototype.look = function(dir) {
    const target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)) {
        return charFromElement(this.world.grid.get(target));
    } else {
        return "#";
    }
};
