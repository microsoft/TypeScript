//// [tests/cases/compiler/allowJscheckJsTypeParameterNoCrash.ts] ////

//// [func.ts]
interface ComponentOptions<V> {
    watch: Record<string, WatchHandler<any>>;
}
type WatchHandler<T> = (val: T) => void;
declare function extend(options: ComponentOptions<{}>): void;
export var vextend = extend;
//// [app.js]
import {vextend} from './func';
// hover on vextend
export var a = vextend({
  watch: {
    data1(val) {
      this.data2 = 1;
    },
    data2(val) { },
  }
});

//// [func.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vextend = void 0;
exports.vextend = extend;
//// [app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var func_1 = require("./func");
// hover on vextend
exports.a = (0, func_1.vextend)({
    watch: {
        data1: function (val) {
            this.data2 = 1;
        },
        data2: function (val) { },
    }
});
