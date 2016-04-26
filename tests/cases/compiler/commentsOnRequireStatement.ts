// @target: es5
// @module: commonjs

// @Filename: 0.ts
export var subject = 10;

// @Filename: 1.ts
export var subject1 = 10;

// @Filename: 2.ts
/* tslint:disable:no-unused-variable */
// Subject imported before Observable to bypass circular dependency issue since
// Subject extends Observable and Observable references Subject in it's
// definition
export {subject} from './0';
/* tslint:enable:no-unused-variable */
export {subject1} from './1';
