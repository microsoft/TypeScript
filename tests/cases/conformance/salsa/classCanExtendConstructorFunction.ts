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
/** @param {Wagon[]=} wagons */
Wagon.circle = function (wagons) {
    return wagons ? wagons.length : 3.14;
}
/** @param {*[]=} supplies - *[]= is my favourite type */
Wagon.prototype.load = function (supplies) {
}
/** @param {*[]=} supplies - Yep, still a great type */
Wagon.prototype.weight = supplies => supplies ? supplies.length : -1
Wagon.prototype.speed = function () {
    return this.numberOxen / this.weight()
}
// ok
class Sql extends Wagon {
    constructor() {
        super(); // error: not enough arguments
        this.foonly = 12
    }
    /**
     * @param {Array.<string>} files
     * @param {"csv" | "json" | "xmlolololol"} format
     * This is not assignable, so should have a type error
     */
    load(files, format) {
        if (format === "xmlolololol") {
            throw new Error("please do not use XML. It was a joke.");
        }
        else {
            super.speed() // run faster
            if (super.weight() < 0) {
                // ????????????????????????
            }
        }
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

// @Filename: generic.js

/**
 * @template T
 * @param {T} flavour
 */
function Soup(flavour) {
    this.flavour = flavour
}
/** @extends {Soup<{ claim: "ignorant" | "malicious" }>} */
class Chowder extends Soup {
    log() {
        return this.flavour
    }
}

var soup = new Soup(1);
soup.flavour
var chowder = new Chowder({ claim: "ignorant" });
chowder.flavour.claim
var errorNoArgs = new Chowder();
var errorArgType = new Chowder(0);

