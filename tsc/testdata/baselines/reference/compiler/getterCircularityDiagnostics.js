//// [tests/cases/compiler/getterCircularityDiagnostics.ts] ////

//// [getterCircularityDiagnostics.ts]
declare const props: Options;

class Container {
    get options() {
        return { container: this, ...props } as Options;
    }
}

interface Options {
    container?: Container;
}

//// [getterCircularityDiagnostics.js]
"use strict";
class Container {
    get options() {
        return Object.assign({ container: this }, props);
    }
}
