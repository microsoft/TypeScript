// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: first.js

/**
 * @constructor
 * @param {number} numberOxen
 */
function Wagon(numberOxen) {
    this.numberOxen = numberOxen
}
/** @param {Wagon[]=} others */
Wagon.circle = function (others) {
    return others ? others.length : 3.14;
}
// ok
class Sql extends Wagon {
    constructor() {
        super(); // error: not enough arguments
        this.foonly = 12
    }
}
var db = new Sql();
db.numberOxen = db.foonly

// error, can't extend a TS constructor function
class Drakkhen extends Dragon {

}

// @Filename: second.ts

/**
 * @constructor
 */
function Dragon(numberEaten: number) {
    this.numberEaten = numberEaten
}
// error!
class Firedrake extends Dragon {
    constructor() {
        super();
    }
}
// ok
class Conestoga extends Wagon {
    constructor(public drunkOO: true) {
        // error: wrong type
        super('nope');
    }
    // should error since others is not optional
    static circle(others: (typeof Wagon)[]) {
        return others.length
    }
}
var c = new Conestoga(true);
c.drunkOO
c.numberOxen
