//// [partialType2.ts]
interface State {
    name: string;
    length: number;
    foo?: number;
}

function doSomething1<T>(x: T) {
<<<<<<< d147616ccc57b7c9f6418074c8edffd3ee258961
    let y: partial T = <any>null;
=======
    let y: subset T = <any>null;
>>>>>>> Partial Types (#11233)
    y = x; // Should be OK
    x = y; // Error
}

function doSomething2<T extends State>(x: T) {
    let y: partial T = <any>null;
    // Should error
    y = { name: '', length: 10, foo: 3};
    y = x; // OK
    if (y.name) {

    }
}
 let ss: partial State;
 if (ss.foo) {
          
 }


//// [partialType2.js]
function doSomething1(x) {
<<<<<<< d147616ccc57b7c9f6418074c8edffd3ee258961
    var y = null;
=======
    var y = T = null;
>>>>>>> Partial Types (#11233)
    y = x; // Should be OK
    x = y; // Error
}
function doSomething2(x) {
    var y = null;
    // Should error
    y = { name: '', length: 10, foo: 3 };
    y = x; // OK
    if (y.name) {
    }
}
var ss;
if (ss.foo) {
}
