class Foo { }

switch (0) {
    case Foo: break;    // Error
    case "sss": break;  // Error
    case 123: break;    // Error
    case true: break;   // Error
}

var s: any = 0;

// No error for all
switch (s) {
    case Foo: break;
    case "sss": break;
    case 123: break;
    case true: break;
}
