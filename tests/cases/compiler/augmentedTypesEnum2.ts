// enum then interface
enum e1 { One } // error

interface e1 { // error
    foo(): void;
}

// interface then enum works

// enum then class
enum e2 { One }; // error
class e2 { // error
    foo() {
        return 1;
    }
}

//enum then enum - covered
//enum then import - covered