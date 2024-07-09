// @filename: exportConsts.ts
// @strict: true
export { x }
export { x as xx }
export default x;

const x = 'x'

export { Y as Z }
class Y {}

// @filename: exportVars.ts
// @strict: true
export { y }
export { y as yy }
export default y;
var y = 'y'
