//// [jsDeclarationsExportAssignedConstructorFunction.js]
module.exports.MyClass = function() {
    this.x = 1
}
module.exports.MyClass.prototype = {
    a: function() {
        this.b = 2
    }
}


//// [jsDeclarationsExportAssignedConstructorFunction.js]
module.exports.MyClass = function () {
    this.x = 1;
};
module.exports.MyClass.prototype = {
    a: function () {
        this.b = 2;
    }
};


//// [jsDeclarationsExportAssignedConstructorFunction.d.ts]
export {};
