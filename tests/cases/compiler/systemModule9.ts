// @module: system
// @isolatedModules: true

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