//// [tests/cases/compiler/modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts] ////

//// [modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts]
// All will be error from using ES6 features but only include ES5 library
// Using Es6 array
function f(x: number, y: number, z: number) {
    return Array.from(arguments);
}

f(1, 2, 3);  // no error

// Using ES6 collection
var m = new Map<string, number>();
m.clear();
// Using ES6 iterable
m.keys();

// Using ES6 function
function Baz() { }
Baz.name;

// Using ES6 math
Math.sign(1);

// Using ES6 object
var o = {
    a: 2,
    [Symbol.hasInstance](value: any) {
        return false;
    }
};
o.hasOwnProperty(Symbol.hasInstance);

// Using Es6 proxy
var t = {}
var p = new Proxy(t, {});

// Using ES6 reflect
Reflect.isExtensible({});

// Using Es6 regexp
var reg = new RegExp("/s");
reg.flags;

// Using ES6 string
var str = "Hello world";
str.includes("hello", 0);

// Using ES6 symbol
var s = Symbol();

// Using ES6 wellknown-symbol
const o1 = {
    [Symbol.hasInstance](value: any) {
        return false;
    }
}

/// [Declarations] ////



//// [modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.d.ts]
declare function f(x: number, y: number, z: number): invalid;
declare var m: invalid;
declare function Baz(): invalid;
declare var o: invalid;
declare var t: {};
declare var p: invalid;
declare var reg: invalid;
declare var str: string;
declare var s: invalid;
declare const o1: invalid;

/// [Errors] ////

modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(3,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(4,18): error TS2550: Property 'from' does not exist on type 'ArrayConstructor'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(10,9): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(10,13): error TS2583: Cannot find name 'Map'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(16,10): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(17,5): error TS2339: Property 'name' does not exist on type '() => void'.
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(20,6): error TS2550: Property 'sign' does not exist on type 'Math'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(25,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(25,6): error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(29,18): error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(33,9): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(33,13): error TS2304: Cannot find name 'Proxy'.
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(36,1): error TS2583: Cannot find name 'Reflect'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(39,11): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(40,5): error TS2550: Property 'flags' does not exist on type 'RegExp'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(44,5): error TS2550: Property 'includes' does not exist on type 'string'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(47,9): error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(47,9): error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(51,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts(51,6): error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.


==== modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts (20 errors) ====
    // All will be error from using ES6 features but only include ES5 library
    // Using Es6 array
    function f(x: number, y: number, z: number) {
             ~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9031 modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts:3:10: Add a return type to the function declaration
        return Array.from(arguments);
                     ~~~~
!!! error TS2550: Property 'from' does not exist on type 'ArrayConstructor'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
    }
    
    f(1, 2, 3);  // no error
    
    // Using ES6 collection
    var m = new Map<string, number>();
            ~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
!!! related TS9027 modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts:10:5: Add a type annotation to the variable m
                ~~~
!!! error TS2583: Cannot find name 'Map'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
    m.clear();
    // Using ES6 iterable
    m.keys();
    
    // Using ES6 function
    function Baz() { }
             ~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9031 modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts:16:10: Add a return type to the function declaration
    Baz.name;
        ~~~~
!!! error TS2339: Property 'name' does not exist on type '() => void'.
    
    // Using ES6 math
    Math.sign(1);
         ~~~~
!!! error TS2550: Property 'sign' does not exist on type 'Math'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
    
    // Using ES6 object
    var o = {
        a: 2,
        [Symbol.hasInstance](value: any) {
        ~~~~~~~~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9027 modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts:23:5: Add a type annotation to the variable o
!!! related TS9034 modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts:25:5: Add a return type to the method
         ~~~~~~
!!! error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
            return false;
        }
    };
    o.hasOwnProperty(Symbol.hasInstance);
                     ~~~~~~
!!! error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
    
    // Using Es6 proxy
    var t = {}
    var p = new Proxy(t, {});
            ~~~~~~~~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
!!! related TS9027 modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts:33:5: Add a type annotation to the variable p
                ~~~~~
!!! error TS2304: Cannot find name 'Proxy'.
    
    // Using ES6 reflect
    Reflect.isExtensible({});
    ~~~~~~~
!!! error TS2583: Cannot find name 'Reflect'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
    
    // Using Es6 regexp
    var reg = new RegExp("/s");
              ~~~~~~~~~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
!!! related TS9027 modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts:39:5: Add a type annotation to the variable reg
    reg.flags;
        ~~~~~
!!! error TS2550: Property 'flags' does not exist on type 'RegExp'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
    
    // Using ES6 string
    var str = "Hello world";
    str.includes("hello", 0);
        ~~~~~~~~
!!! error TS2550: Property 'includes' does not exist on type 'string'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.
    
    // Using ES6 symbol
    var s = Symbol();
            ~~~~~~
!!! error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
            ~~~~~~~~
!!! error TS9010: Variable must have an explicit type annotation with --isolatedDeclarations
!!! related TS9027 modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts:47:5: Add a type annotation to the variable s
    
    // Using ES6 wellknown-symbol
    const o1 = {
        [Symbol.hasInstance](value: any) {
        ~~~~~~~~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9027 modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts:50:7: Add a type annotation to the variable o1
!!! related TS9034 modularizeLibrary_ErrorFromUsingES6FeaturesWithOnlyES5Lib.ts:51:5: Add a return type to the method
         ~~~~~~
!!! error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
            return false;
        }
    }