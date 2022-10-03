//// [innerModExport1.ts]
module Outer {

    // inner mod 1
    var non_export_var: number;
    module {
        var non_export_var = 0;
        export var export_var = 1;

        function NonExportFunc() { return 0; }

        export function ExportFunc() { return 0; }
    }

    export var outer_var_export = 0;
    export function outerFuncExport() { return 0; }

}

Outer.ExportFunc();

//// [innerModExport1.js]
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
    Outer.outer_var_export = 0;
    function outerFuncExport() { return 0; }
    Outer.outerFuncExport = outerFuncExport;
})(Outer || (Outer = {}));
Outer.ExportFunc();
