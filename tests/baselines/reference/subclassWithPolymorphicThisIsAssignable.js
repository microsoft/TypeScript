//// [subclassWithPolymorphicThisIsAssignable.ts]
/* taken from mongoose.Document */
interface Document {
    increment(): this;
}

/* our custom model extends the mongoose document */
interface CustomDocument extends Document { }

export class Example<Z extends CustomDocument> {
    constructor() {
        // types of increment not compatible??
        this.test<Z>();
    }

    public test<Z extends Document>() { }
}


//// [subclassWithPolymorphicThisIsAssignable.js]
"use strict";
exports.__esModule = true;
exports.Example = void 0;
var Example = /** @class */ (function () {
    function Example() {
        // types of increment not compatible??
        this.test();
    }
    Example.prototype.test = function () { };
    return Example;
}());
exports.Example = Example;
