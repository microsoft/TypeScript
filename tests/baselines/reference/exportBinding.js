//// [tests/cases/conformance/es6/modules/exportBinding.ts] ////

//// [exportConsts.ts]
export { x }
export { x as xx }
export default x;

const x = 'x'

export { Y as Z }
class Y {}

//// [exportVars.ts]
export { y }
export { y as yy }
export default y;
var y = 'y'


//// [exportConsts.js]
export { x };
export { x as xx };
export default x;
const x = 'x';
export { Y as Z };
class Y {
}
//// [exportVars.js]
export { y };
export { y as yy };
export default y;
var y = 'y';
