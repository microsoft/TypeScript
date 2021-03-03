//// [unionIndexerGenericAssignability.ts]
interface Foo3<T extends string> {
   [x: `data-${T}`]: number;
   a: string;
}

function goo<U extends string>(obj1: Foo3<U | 'hello'>, obj2: Foo3<U>) {
   obj1 = obj2;  // Error expected
   obj2 = obj1;
}

type Foo4<T extends string> = {
    [x: `data-${T}`]: number;
    a: string;
 }
 
 function loo<U extends string>(obj1: Foo4<U | 'hello'>, obj2: Foo4<U>) {
    obj1 = obj2;  // Error expected, doesn't occur because object types have "inferrable indexes"
    obj2 = obj1;
 }

interface I1<T extends string> {
    [x: `data-${T}`]: number;
}

function f1<
    T extends string,
    U extends T
>(
    a: `data-${T}`,
    b: `data-${U}`,
    aObj: {[_ in `data-${T}`]: any},
    bObj: {[_ in `data-${U}`]: any},
    aObj2: {[_ in `data-${T}`]?: any},
    bObj2: {[_ in `data-${U}`]?: any},
    aObj3: {[x: `data-${T}`]: number}, // type literals can have a "inferrable index"
    bObj3: {[x: `data-${U}`]: number}, // type literals can have a "inferrable index"
    aObj4: I1<T>,
    bObj4: I1<U>,
) {
    a = b;
    b = a;

    aObj = bObj;
    bObj = aObj;

    aObj2 = bObj2;
    bObj2 = aObj2;

    aObj3 = bObj3; // not an error because the type-literaly-ness of the source is allowing us to pretend it's closed and simply providing no members of the target at present - an "inferred index"
    bObj3 = aObj3;

    aObj4 = bObj4;
    bObj4 = aObj4;
}

//// [unionIndexerGenericAssignability.js]
function goo(obj1, obj2) {
    obj1 = obj2; // Error expected
    obj2 = obj1;
}
function loo(obj1, obj2) {
    obj1 = obj2; // Error expected, doesn't occur because object types have "inferrable indexes"
    obj2 = obj1;
}
function f1(a, b, aObj, bObj, aObj2, bObj2, aObj3, // type literals can have a "inferrable index"
bObj3, // type literals can have a "inferrable index"
aObj4, bObj4) {
    a = b;
    b = a;
    aObj = bObj;
    bObj = aObj;
    aObj2 = bObj2;
    bObj2 = aObj2;
    aObj3 = bObj3; // not an error because the type-literaly-ness of the source is allowing us to pretend it's closed and simply providing no members of the target at present - an "inferred index"
    bObj3 = aObj3;
    aObj4 = bObj4;
    bObj4 = aObj4;
}
