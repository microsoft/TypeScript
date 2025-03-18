//// [tests/cases/compiler/decoratorReferenceOnOtherProperty.ts] ////

//// [yoha.ts]
export class Yoha {}

//// [index.ts]
import {Yoha} from './yoha';

function foo(...args: any[]) {}

class Bar {
  yoha(@foo yoha, bar: Yoha) {}
  //                   ^^^^
}

//// [index2.ts]
import {Yoha} from './yoha';

function foo(...args: any[]) {}

class Bar {
  yoha(@foo yoha, ...bar: Yoha[]) {}
  //                      ^^^^
}

//// [yoha.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yoha = void 0;
class Yoha {
}
exports.Yoha = Yoha;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function foo(...args) { }
class Bar {
    yoha(yoha, bar) { }
}
//// [index2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function foo(...args) { }
class Bar {
    yoha(yoha, ...bar) { }
}
