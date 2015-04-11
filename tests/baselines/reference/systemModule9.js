//// [systemModule9.ts]

import * as ns from 'file1';
import {a, b as c} from 'file2';
import d from 'file3'
import e, * as ns2 from 'file4';
import ns3 = require('file5');

ns.f();
a();
c();
d();
e();
ns2.f();
ns3.f();

export * from 'file6';

var x, y = true;
export {x};
export {y as z};

//// [systemModule9.js]
System.register(['file1', 'file2', 'file3', 'file4', 'file5', 'file6'], function(exports_1) {
    var ns, file2_1, file3_1, file4_1, ns3;
    var x, y;
    return {
        setters:[
            function (v_1) {
                ns = v_1
            },
            function (v_1) {
                file2_1 = v_1
            },
            function (v_1) {
                file3_1 = v_1
            },
            function (v_1) {
                file4_1 = v_1
            },
            function (v_1) {
                ns3 = v_1
            },
            function (v_1) {
                for (var n in v_1) exports_1(n, v_1[n]);
            }],
        execute: function() {
            ns.f();
            file2_1.a();
            file2_1.b();
            file3_1.default();
            file4_1.default();
            ns2.f();
            ns3.f();
            y = true;
            exports_1("x", x);
            exports_1("z", y);
        }
    }
});
