//// [tests/cases/conformance/es6/decorators/class/decoratorOnClass8.es6.ts] ////

//// [decoratorOnClass8.es6.ts]
declare function dec<T>(target: T): T;

@dec
export default class {
    static y = 1;
}

//// [decoratorOnClass8.es6.js]
@dec
export default class {
    static y = 1;
}
