//// [localNameThatMatchExportedNameViaExportDeclaration.ts]

export { my }

var my: any;

my += my;

function doSome1(my: any) {
    my = +my;
    return my;
}

function doSome2() {
    const internal = (my: any) => {
        my = +my;
        return my;
    };
    return internal("1");
}


//// [localNameThatMatchExportedNameViaExportDeclaration.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var my;
    exports.my = my;
    exports.my = my += my;
    function doSome1(my) {
        my = +my;
        return my;
    }
    function doSome2() {
        var internal = function (my) {
            my = +my;
            return my;
        };
        return internal("1");
    }
});
