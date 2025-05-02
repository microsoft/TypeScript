//// [tests/cases/compiler/innerModExport2.ts] ////

//// [innerModExport2.ts]
module Outer {

    // inner mod 1
    var non_export_var: number;
    module {
        var non_export_var = 0;
        export var export_var = 1;

        function NonExportFunc() { return 0; }

        export function ExportFunc() { return 0; }
    }
    var export_var: number;

    export var outer_var_export = 0;
    export function outerFuncExport() { return 0; }

}

Outer.NonExportFunc();

//// [innerModExport2.js]
var Outer;
(function (Outer) {
    // inner mod 1
    var non_export_var;
    module;
    {
        var non_export_var = 0;
        export var export_var = 1;
        function NonExportFunc() { return 0; }
        export function ExportFunc() { return 0; }
    }
    var export_var;
    Outer.outer_var_export = 0;
    function outerFuncExport() { return 0; }
    Outer.outerFuncExport = outerFuncExport;
})(Outer || (Outer = {}));
Outer.NonExportFunc();
