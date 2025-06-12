//// [tests/cases/compiler/augmentedTypesClass2.ts] ////

//// [augmentedTypesClass2.ts]
// Checking class with other things in type space not value space

// class then interface
class c11 {
    foo() {
        return 1;
    }
}

interface c11 {
    bar(): void;
}

// class then class - covered
// class then enum 
class c33 {
    foo() {
        return 1;
    }
}
enum c33 { One };

// class then import
class c44 {
    foo() {
        return 1;
    }
}



//// [augmentedTypesClass2.js]
// Checking class with other things in type space not value space
// class then interface
class c11 {
    foo() {
        return 1;
    }
}
// class then class - covered
// class then enum 
class c33 {
    foo() {
        return 1;
    }
}
(function (c33) {
    c33[c33["One"] = 0] = "One";
})(c33 || (c33 = {}));
;
// class then import
class c44 {
    foo() {
        return 1;
    }
}
