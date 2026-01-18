// @target: ES6
export namespace m1 {
    export var a = 10;
    var b = 10;
    export namespace innerExportedModule {
        export var k = 10;
        var l = 10;
    }
    export namespace innerNonExportedModule {
        export var x = 10;
        var y = 10;
    }
}
namespace m2 {
    export var a = 10;
    var b = 10;
    export namespace innerExportedModule {
        export var k = 10;
        var l = 10;
    }
    export namespace innerNonExportedModule {
        export var x = 10;
        var y = 10;
    }
}