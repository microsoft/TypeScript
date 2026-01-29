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
export var vextend = extend;
//// [app.js]
import { vextend } from './func';
// hover on vextend
export var a = vextend({
    watch: {
        data1(val) {
            this.data2 = 1;
        },
        data2(val) { },
    }
});
