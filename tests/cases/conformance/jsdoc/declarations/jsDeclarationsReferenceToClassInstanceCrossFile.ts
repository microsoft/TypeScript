// @allowJs: true
// @checkJs: true
// @moduleResolution: bundler
// @declaration: true
// @emitDeclarationOnly: true
// @filename: rectangle.js
class Rectangle {
    constructor() {
        console.log("I'm a rectangle!");
    }
}

module.exports = { Rectangle };
// @filename: index.js
const {Rectangle} = require('./rectangle');

class Render {
    constructor() {
        /**
         * Object list
         * @type {Rectangle[]}
         */
        this.objects = [];
    }
    /**
     * Adds a rectangle
     * 
     * @returns {Rectangle} the rect
     */
    addRectangle() {
        const obj = new Rectangle();
        this.objects.push(obj);
        return obj;
    }
}

module.exports = { Render };
// @filename: test.js
const {Render} = require("./index");
let render = new Render();

render.addRectangle();
console.log("Objects", render.objects);