// @target:es5
// @module:commonjs
// @experimentaldecorators: true
// @filename: a.ts

// from #3108
export var test = 'abc';

// @filename: b.ts
import { test } from './a';

function filter(handler: any) {
    return function (target: any, propertyKey: string) {
        // ...
    };
}

class Wat {
    @filter(() => test == 'abc')
    static whatever() {
        // ...
    }
}