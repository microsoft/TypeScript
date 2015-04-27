//// [systemModule11.ts]

import 'foo'
import {f} from 'bar';

f();

//// [systemModule11.js]
System.register(['foo', 'bar'], function(exports_1) {
    var bar_1;
    return {
        setters:[
            function (_) {},
            function (_bar_1) {
                bar_1 = _bar_1
            }],
        execute: function() {
            bar_1.f();
        }
    }
});
