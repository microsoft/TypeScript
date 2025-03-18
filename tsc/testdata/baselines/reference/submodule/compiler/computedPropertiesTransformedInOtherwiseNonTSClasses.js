//// [tests/cases/compiler/computedPropertiesTransformedInOtherwiseNonTSClasses.ts] ////

//// [computedPropertiesTransformedInOtherwiseNonTSClasses.ts]
namespace NS { 
    export const x = Symbol();

    class NotTransformed { 
        [NS.x]: number;
    }
}


//// [computedPropertiesTransformedInOtherwiseNonTSClasses.js]
var NS;
(function (NS) {
    NS.x = Symbol();
    class NotTransformed {
        [NS.x];
    }
})(NS || (NS = {}));
