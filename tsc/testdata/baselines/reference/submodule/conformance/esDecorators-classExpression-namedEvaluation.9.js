//// [tests/cases/conformance/esDecorators/classExpression/namedEvaluation/esDecorators-classExpression-namedEvaluation.9.ts] ////

//// [a.ts]
declare let dec: any;

export = @dec class { };

//// [b.ts]
declare let dec: any;

export = class { @dec y: any };

//// [a.js]
"use strict";
module.exports = 
@dec
class {
};
//// [b.js]
"use strict";
module.exports = class {
    @dec
    y;
};
