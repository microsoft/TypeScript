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
const classesByRow = {};
for (const row of ['1', '2', '3', '4', '5']) {
    class RowClass {
        row = row;
        static factory = () => new RowClass();
    }
    classesByRow[row] = RowClass;
}
