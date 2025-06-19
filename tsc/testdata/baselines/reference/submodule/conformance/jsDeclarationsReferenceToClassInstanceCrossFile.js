//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsReferenceToClassInstanceCrossFile.ts] ////

//// [rectangle.js]
class Rectangle {
    constructor() {
        console.log("I'm a rectangle!");
    }
}

module.exports = { Rectangle };
//// [index.js]
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
//// [test.js]
const {Render} = require("./index");
let render = new Render();

render.addRectangle();
console.log("Objects", render.objects);



//// [rectangle.d.ts]
declare class Rectangle {
    constructor();
}
declare const _default: {
    Rectangle: typeof Rectangle;
};
export = _default;
//// [index.d.ts]
declare class Render {
    constructor();
    /**
     * Adds a rectangle
     *
     * @returns {Rectangle} the rect
     */
    addRectangle(): Rectangle;
}
declare const _default: {
    Render: typeof Render;
};
export = _default;
//// [test.d.ts]
export {};
