//// [classWithIndexAllowsNonNumericNames.ts]
class Obs {
  [idx: number]: string;
  private _field: number;
}


//// [classWithIndexAllowsNonNumericNames.js]
var Obs = /** @class */ (function () {
    function Obs() {
    }
    return Obs;
}());
