//// [tests/cases/compiler/getterReturnTypeQueryOrder.ts] ////

//// [getterReturnTypeQueryOrder.ts]
declare const props: Options;

class Container {
    get options() {
        return { container: this, ...props } as Options;
    }
}

interface Options {
    container?: Container;
}


//// [getterReturnTypeQueryOrder.js]
"use strict";
class Container {
    get options() {
        return Object.assign({ container: this }, props);
    }
}
