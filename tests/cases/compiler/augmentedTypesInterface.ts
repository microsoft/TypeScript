// interface then interface

interface i {
    foo(): void;
}

interface i {
    bar(): number;
}

// interface then class
interface i2 {
    foo(): void;
}

class i2 {  // error
    bar() {
        return 1;
    }
}

// interface then enum
interface i3 {
    foo(): void;
}
enum i3 { One }; // error

// interface then import
interface i4 {
    foo(): void;
}

//import i4 = require('');  // error