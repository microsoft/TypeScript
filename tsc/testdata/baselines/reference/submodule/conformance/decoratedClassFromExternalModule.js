//// [tests/cases/conformance/decorators/class/decoratedClassFromExternalModule.ts] ////

//// [decorated.ts]
function decorate(target: any) { }

@decorate
export default class Decorated { }

//// [undecorated.ts]
import Decorated from 'decorated';

//// [decorated.js]
function decorate(target) { }
@decorate
export default class Decorated {
}
//// [undecorated.js]
export {};
