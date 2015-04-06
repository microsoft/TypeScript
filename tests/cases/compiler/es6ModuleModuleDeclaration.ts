// @target: ES6
export module m1 {
    export var a = 10;
    var b = 10;
    export module innerExportedModule {
        export var k = 10;
        var l = 10;
    }
    export module innerNonExportedModule {
        export var x = 10;
        var y = 10;
    }
}
module m2 {
    export var a = 10;
    var b = 10;
    export module innerExportedModule {
        export var k = 10;
        var l = 10;
    }
    export module innerNonExportedModule {
        export var x = 10;
        var y = 10;
    }
}