//// [tests/cases/conformance/externalModules/reexportClassDefinition.ts] ////

//// [foo3.ts]
import foo2 = require('./foo2')
class x extends foo2.x {}


//// [foo1.ts]
class x{}
export = x; 

//// [foo2.ts]
import foo1 = require('./foo1');

export = {
    x: foo1
}


/// [Declarations] ////



//// [/.src/foo1.d.ts]
declare class x {
}
export = x;

//// [/.src/foo2.d.ts]
import foo1 = require('./foo1');
declare const _default: {
    x: typeof foo1;
};
export = _default;

//// [/.src/foo3.d.ts]
export {};
