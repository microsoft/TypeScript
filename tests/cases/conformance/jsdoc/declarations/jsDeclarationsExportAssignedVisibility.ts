// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: obj.js
module.exports = class Obj {
    constructor() {
        this.x = 12;
    }
}
// @filename: index.js
const Obj = require("./obj");

class Container {
    constructor() {
        this.usage = new Obj();
    }
}

module.exports = Container;