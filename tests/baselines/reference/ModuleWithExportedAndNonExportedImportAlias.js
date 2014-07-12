//// [ModuleWithExportedAndNonExportedImportAlias.js]
var B;
(function (B) {
    var Line = (function () {
        function Line(start, end) {
            this.start = start;
            this.end = end;
        }
        return Line;
    })();
    B.Line = Line;
})(B || (B = {}));

var Geometry;
(function (Geometry) {
    var Lines = B;

    Geometry.Origin = { x: 0, y: 0 };

    // this is valid since B.Line _is_ visible outside Geometry
    Geometry.Unit = new Lines.Line(Geometry.Origin, { x: 1, y: 0 });
})(Geometry || (Geometry = {}));

// expected to work since all are exported
var p;
var p;
var p = Geometry.Origin;

var line;
var line = Geometry.Unit;

// not expected to work since non are exported
var line = Geometry.Lines.Line;
