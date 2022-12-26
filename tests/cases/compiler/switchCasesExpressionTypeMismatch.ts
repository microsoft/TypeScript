class Foo { }

switch (0) {
    case Foo: break;    // Error
    case "sss": break;  // Error
    case 123: break;    // Error
    case true: break;   // Error
}

declare var q: string
declare var r: number | "hello"

switch (r) {
    case q: break
    case 42: break
    case true: break // Error
    case "hello": break
    case "world": break // Error
}

var s: any = 0;

// No error for all
switch (s) {
    case Foo: break;
    case "sss": break;
    case 123: break;
    case true: break;
}
