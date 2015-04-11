// @module: system
// @separateCompilation: true

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