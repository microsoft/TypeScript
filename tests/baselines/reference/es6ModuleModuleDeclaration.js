//// [es6ModuleModuleDeclaration.ts]
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

//// [es6ModuleModuleDeclaration.js]
export var m1;
(function (m1) {
    m1.a = 10;
    var b = 10;
    let innerExportedModule;
    (function (innerExportedModule) {
        innerExportedModule.k = 10;
        var l = 10;
    })(innerExportedModule = m1.innerExportedModule || (m1.innerExportedModule = {}));
    let innerNonExportedModule;
    (function (innerNonExportedModule) {
        innerNonExportedModule.x = 10;
        var y = 10;
    })(innerNonExportedModule = m1.innerNonExportedModule || (m1.innerNonExportedModule = {}));
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    m2.a = 10;
    var b = 10;
    let innerExportedModule;
    (function (innerExportedModule) {
        innerExportedModule.k = 10;
        var l = 10;
    })(innerExportedModule = m2.innerExportedModule || (m2.innerExportedModule = {}));
    let innerNonExportedModule;
    (function (innerNonExportedModule) {
        innerNonExportedModule.x = 10;
        var y = 10;
    })(innerNonExportedModule = m2.innerNonExportedModule || (m2.innerNonExportedModule = {}));
})(m2 || (m2 = {}));
