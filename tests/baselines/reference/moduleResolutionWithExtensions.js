//// [tests/cases/conformance/externalModules/moduleResolutionWithExtensions.ts] ////

//// [a.ts]
export default 0;

// No extension: '.ts' added
//// [b.ts]
import a from './a';

// '.js' extension: stripped and replaced with '.ts'
//// [d.ts]
import a from './a.js';

//// [jquery.d.ts]
declare var x: number;
export default x;

// No extension: '.d.ts' added
//// [jquery_user_1.ts]
import j from "./jquery";

// '.js' extension: stripped and replaced with '.d.ts'
//// [jquery_user_1.ts]
import j from "./jquery.js"


//// [a.js]
export default 0;
// No extension: '.ts' added
//// [b.js]
export {};
// '.js' extension: stripped and replaced with '.ts'
//// [d.js]
export {};
//// [jquery_user_1.js]
export {};
