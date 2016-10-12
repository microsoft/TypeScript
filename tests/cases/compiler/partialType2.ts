interface State {
    name: string;
    length: number;
    foo?: number;
}

function doSomething1<T>(x: T) {
    let y: subset T = <any>null;
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
