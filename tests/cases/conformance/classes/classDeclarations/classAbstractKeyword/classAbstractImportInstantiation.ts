// @target: es2015
namespace M {
    export abstract class A {}
    
    new A;
}

import myA = M.A;

new myA;
