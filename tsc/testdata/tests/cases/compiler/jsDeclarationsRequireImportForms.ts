// @allowJs: true
// @checkJs: true
// @target: es5, es2015
// @outDir: ./out
// @declaration: true
// @filename: obj.js
class Obj {
    constructor() {
        this.x = 12;
    }
}
module.exports.Obj = Obj
// @filename: index.js
const {Obj, Obj: Other} = require("./obj");

class Container {
    constructor() {
        this.usage = new Obj();
        /** @type {Other} */
        this.usage2 = new Other();
    }
}

module.exports = Container;