//// [escapedIdentifiers.ts]
/*
    0 .. \u0030
    9 .. \u0039

    A .. \u0041
    Z .. \u005a

    a .. \u0061
    z .. \u00za
*/

// var decl
var \u0061 = 1;
a ++;
\u0061 ++;

var b = 1;
b ++;
\u0062 ++;

// modules
module moduleType1 { 
    export var baz1: number;
}
module moduleType\u0032 { 
    export var baz2: number;
}

moduleType1.baz1 = 3;
moduleType\u0031.baz1 = 3;
moduleType2.baz2 = 3;
moduleType\u0032.baz2 = 3;

// classes

class classType1 { 
    public foo1: number;
}
class classType\u0032 { 
    public foo2: number;
}

var classType1Object1 = new classType1();
classType1Object1.foo1 = 2;
var classType1Object2 = new classType\u0031();
classType1Object2.foo1 = 2;
var classType2Object1 = new classType2();
classType2Object1.foo2 = 2;
var classType2Object2 = new classType\u0032();
classType2Object2.foo2 = 2;

// interfaces
interface interfaceType1 { 
    bar1: number;
}
interface interfaceType\u0032 { 
    bar2: number;
}

var interfaceType1Object1 = <interfaceType1>{ bar1: 0 };
interfaceType1Object1.bar1 = 2;
var interfaceType1Object2 = <interfaceType\u0031>{ bar1: 0 };
interfaceType1Object2.bar1 = 2;
var interfaceType2Object1 = <interfaceType2>{ bar2: 0 };
interfaceType2Object1.bar2 = 2;
var interfaceType2Object2 = <interfaceType\u0032>{ bar2: 0 };
interfaceType2Object2.bar2 = 2;


// arguments
class testClass { 
    public func(arg1: number, arg\u0032: string, arg\u0033: boolean, arg4: number) { 
        arg\u0031 = 1;
        arg2 = 'string';
        arg\u0033 = true;
        arg4 = 2;
    }
}

// constructors
class constructorTestClass { 
    constructor (public arg1: number,public arg\u0032: string,public arg\u0033: boolean,public arg4: number) { 
    }
}
var constructorTestObject = new constructorTestClass(1, 'string', true, 2);
constructorTestObject.arg\u0031 = 1;
constructorTestObject.arg2 = 'string';
constructorTestObject.arg\u0033 = true;
constructorTestObject.arg4 = 2;

// Lables

l\u0061bel1: 
    while (false)
    {  
       while(false)
           continue label1;  // it will go to next iteration of outer loop 
    } 

label2: 
    while (false)
    {  
       while(false)
           continue l\u0061bel2;  // it will go to next iteration of outer loop 
    } 

label3: 
    while (false)
    {  
       while(false)
           continue label3;  // it will go to next iteration of outer loop 
    } 

l\u0061bel4: 
    while (false)
    {  
       while(false)
           continue l\u0061bel4;  // it will go to next iteration of outer loop 
    } 

//// [escapedIdentifiers.js]
/*
    0 .. \u0030
    9 .. \u0039

    A .. \u0041
    Z .. \u005a

    a .. \u0061
    z .. \u00za
*/
// var decl
var \u0061 = 1;
a++;
\u0061++;
var b = 1;
b++;
\u0062++;
// modules
var moduleType1;
(function (moduleType1) {
})(moduleType1 || (moduleType1 = {}));
var moduleType\u0032;
(function (moduleType\u0032) {
})(moduleType\u0032 || (moduleType\u0032 = {}));
moduleType1.baz1 = 3;
moduleType\u0031.baz1 = 3;
moduleType2.baz2 = 3;
moduleType\u0032.baz2 = 3;
// classes
var classType1 = /** @class */ (function () {
    function classType1() {
    }
    return classType1;
}());
var classType\u0032 = /** @class */ (function () {
    function classType\u0032() {
    }
    return classType\u0032;
}());
var classType1Object1 = new classType1();
classType1Object1.foo1 = 2;
var classType1Object2 = new classType\u0031();
classType1Object2.foo1 = 2;
var classType2Object1 = new classType2();
classType2Object1.foo2 = 2;
var classType2Object2 = new classType\u0032();
classType2Object2.foo2 = 2;
var interfaceType1Object1 = { bar1: 0 };
interfaceType1Object1.bar1 = 2;
var interfaceType1Object2 = { bar1: 0 };
interfaceType1Object2.bar1 = 2;
var interfaceType2Object1 = { bar2: 0 };
interfaceType2Object1.bar2 = 2;
var interfaceType2Object2 = { bar2: 0 };
interfaceType2Object2.bar2 = 2;
// arguments
var testClass = /** @class */ (function () {
    function testClass() {
    }
    testClass.prototype.func = function (arg1, arg\u0032, arg\u0033, arg4) {
        arg\u0031 = 1;
        arg2 = 'string';
        arg\u0033 = true;
        arg4 = 2;
    };
    return testClass;
}());
// constructors
var constructorTestClass = /** @class */ (function () {
    function constructorTestClass(arg1, arg\u0032, arg\u0033, arg4) {
        this.arg1 = arg1;
        this.arg\u0032 = arg\u0032;
        this.arg\u0033 = arg\u0033;
        this.arg4 = arg4;
    }
    return constructorTestClass;
}());
var constructorTestObject = new constructorTestClass(1, 'string', true, 2);
constructorTestObject.arg\u0031 = 1;
constructorTestObject.arg2 = 'string';
constructorTestObject.arg\u0033 = true;
constructorTestObject.arg4 = 2;
// Lables
l\u0061bel1: while (false) {
    while (false)
        continue label1; // it will go to next iteration of outer loop 
}
label2: while (false) {
    while (false)
        continue l\u0061bel2; // it will go to next iteration of outer loop 
}
label3: while (false) {
    while (false)
        continue label3; // it will go to next iteration of outer loop 
}
l\u0061bel4: while (false) {
    while (false)
        continue l\u0061bel4; // it will go to next iteration of outer loop 
}
