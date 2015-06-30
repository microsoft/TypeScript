// @target: es6
// @experimentaldecorators: true
// @Filename: decorated.ts
function decorate(target: any) { }

@decorate
export default class Decorated { }

// @Filename: undecorated.ts
import Decorated from 'decorated';