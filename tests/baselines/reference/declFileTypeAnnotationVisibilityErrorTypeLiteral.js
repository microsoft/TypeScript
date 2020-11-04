//// [declFileTypeAnnotationVisibilityErrorTypeLiteral.ts]
module m {
    class private1 {
    }
    module m2 {
        export class public1 {
        }
    }

    export var x: {
        x: private1;
        y: m2.public1;
        (): m2.public1[];
        method(): private1;
        [n: number]: private1;
        [s: string]: m2.public1;
    };
    export var x2 = {
        x: new private1(),
        y: new m2.public1(),
        method() {
            return new private1();
        }
    };
    export var x3 = x;

    // Function type
    export var y: (a: private1) => m2.public1;
    export var y2 = y;

    // constructor type
    export var z: new (a: private1) => m2.public1;
    export var z2 = z;
}

//// [declFileTypeAnnotationVisibilityErrorTypeLiteral.js]
var m;
(function (m) {
    var private1 = /** @class */ (function () {
        function private1() {
        }
        return private1;
    }());
    var m2;
    (function (m2) {
        var public1 = /** @class */ (function () {
            function public1() {
            }
            return public1;
        }());
        m2.public1 = public1;
    })(m2 || (m2 = {}));
    m.x2 = {
        x: new private1(),
        y: new m2.public1(),
        method: function () {
            return new private1();
        }
    };
    m.x3 = m.x;
    m.y2 = m.y;
    m.z2 = m.z;
})(m || (m = {}));


//// [declFileTypeAnnotationVisibilityErrorTypeLiteral.d.ts]
declare module m {
    class private1 {
    }
    module m2 {
        class public1 {
        }
    }
    export var x: {
        x: private1;
        y: m2.public1;
        (): m2.public1[];
        method(): private1;
        [n: number]: private1;
        [s: string]: m2.public1;
    };
    export var x2: {
        x: private1;
        y: m2.public1;
        method(): private1;
    };
    export var x3: {
        (): m2.public1[];
        [n: number]: private1;
        [s: string]: m2.public1;
        x: private1;
        y: m2.public1;
        method(): private1;
    };
    export var y: (a: private1) => m2.public1;
    export var y2: (a: private1) => m2.public1;
    export var z: new (a: private1) => m2.public1;
    export var z2: new (a: private1) => m2.public1;
    export {};
}
