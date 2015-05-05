// @target: es6
// @Filename: decorated.ts
function decorate() { }

@decorate
export default class Decorated { }

// @Filename: undecorated.ts
import Decorated from 'decorated';