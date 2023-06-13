//// [tests/cases/compiler/classInConvertedLoopES5.ts] ////

//// [classInConvertedLoopES5.ts]
const classesByRow: Record<string, object> = {};
for (const row of ['1', '2', '3', '4', '5']) {
  class RowClass {
    row = row;
    static factory = () => new RowClass();
  }

  classesByRow[row] = RowClass;
}

//// [classInConvertedLoopES5.js]
var classesByRow = {};
var _loop_1 = function (row) {
    var RowClass = /** @class */ (function () {
        function RowClass() {
            this.row = row;
        }
        RowClass.factory = function () { return new RowClass(); };
        return RowClass;
    }());
    classesByRow[row] = RowClass;
};
for (var _i = 0, _a = ['1', '2', '3', '4', '5']; _i < _a.length; _i++) {
    var row = _a[_i];
    _loop_1(row);
}
