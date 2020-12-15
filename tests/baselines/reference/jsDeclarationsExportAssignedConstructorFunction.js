//// [jsDeclarationsExportAssignedConstructorFunction.js]
/** @constructor */
module.exports.MyClass = function() {
    this.x = 1
}
module.exports.MyClass.prototype = {
    a: function() {
    }
}


//// [jsDeclarationsExportAssignedConstructorFunction.js]
/** @constructor */
module.exports.MyClass = function () {
    this.x = 1;
};
module.exports.MyClass.prototype = {
    a: function () {
    }
};


//// [jsDeclarationsExportAssignedConstructorFunction.d.ts]
export class MyClass {
    a: () => void;
}
