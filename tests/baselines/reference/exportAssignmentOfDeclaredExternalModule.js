//// [tests/cases/compiler/exportAssignmentOfDeclaredExternalModule.ts] ////

//// [exportAssignmentOfDeclaredExternalModule_0.ts]
interface Sammy {
    new (): any; // a constructor signature
        (): number; // a 0 arg call signature
    }
export = Sammy;

//// [exportAssignmentOfDeclaredExternalModule_1.ts]
///<reference path='exportAssignmentOfDeclaredExternalModule_0.ts'/>
import Sammy = require('./exportAssignmentOfDeclaredExternalModule_0');
var x = new Sammy(); // error to use as constructor as there is not constructor symbol
var y = Sammy(); // error to use interface name as call target
var z: Sammy; // no error - z is of type interface Sammy from module 'M'
var a = new z(); // constructor - no error
var b = z(); // call signature - no error

//// [exportAssignmentOfDeclaredExternalModule_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [exportAssignmentOfDeclaredExternalModule_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x = new Sammy(); // error to use as constructor as there is not constructor symbol
var y = Sammy(); // error to use interface name as call target
var z; // no error - z is of type interface Sammy from module 'M'
var a = new z(); // constructor - no error
var b = z(); // call signature - no error
