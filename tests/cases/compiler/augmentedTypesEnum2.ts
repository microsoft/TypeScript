// enum then interface
enum e1 { One }

interface e1 {
    foo(): void;
}

// interface then enum works

// enum then class
enum e2 { One };
class e2 { // error
    foo() {
        return 1;
    }
}

//enum then enum - covered
//enum then import - covered