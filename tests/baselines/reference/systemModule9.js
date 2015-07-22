//// [systemModule9.ts]

import * as ns from 'file1';
import {a, b as c} from 'file2';
import d from 'file3'
import 'file4'
import e, * as ns2 from 'file5';
import ns3 = require('file6');

ns.f();
a();
c();
d();
e();
ns2.f();
ns3.f();

export * from 'file7';

var x, y = true;
export {x};
export {y as z};

//// [systemModule9.js]
System.register(['file1', 'file2', 'file3', 'file4', 'file5', 'file6', 'file7'], function(exports_1) {
    var ns, file2_1, file3_1, file5_1, ns3;
    var x, y;
    var exportedNames_1 = {
        'x': true,
        'z': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (_ns) {
                ns = _ns;
            },
            function (_file2_1) {
                file2_1 = _file2_1;
            },
            function (_file3_1) {
                file3_1 = _file3_1;
            },
            function (_) {},
            function (_file5_1) {
                file5_1 = _file5_1;
            },
            function (_ns3) {
                ns3 = _ns3;
            },
            function (_file7_1) {
                exportStar_1(_file7_1);
            }],
        execute: function() {
            ns.f();
            file2_1.a();
            file2_1.b();
            file3_1["default"]();
            file5_1["default"]();
            ns2.f();
            ns3.f();
            y = true;
            exports_1("x", x);
            exports_1("z", y);
        }
    }
});
