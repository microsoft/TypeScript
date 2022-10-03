// @target: es5
// @module: commonjs

// @Filename: 0.ts
export var subject = 10;

// @Filename: 1.ts
export var subject1 = 10;

// @Filename: 2.ts
/* blah0 */
// blah 
// blah 
// blah 
export {subject} from './0';
/* blah1 */
export {subject1} from './1';
