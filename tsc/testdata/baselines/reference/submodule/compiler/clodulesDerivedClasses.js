//// [tests/cases/compiler/clodulesDerivedClasses.ts] ////

//// [clodulesDerivedClasses.ts]
class Shape {
    id: number;
}

namespace Shape.Utils {
    export function convert(): Shape { return null;}
}

class Path extends Shape {
    name: string;

}

namespace Path.Utils {
    export function convert2(): Path {
        return null;
    }
}





//// [clodulesDerivedClasses.js]
"use strict";
class Shape {
    id;
}
(function (Shape) {
    let Utils;
    (function (Utils) {
        function convert() { return null; }
        Utils.convert = convert;
    })(Utils = Shape.Utils || (Shape.Utils = {}));
})(Shape || (Shape = {}));
class Path extends Shape {
    name;
}
(function (Path) {
    let Utils;
    (function (Utils) {
        function convert2() {
            return null;
        }
        Utils.convert2 = convert2;
    })(Utils = Path.Utils || (Path.Utils = {}));
})(Path || (Path = {}));
