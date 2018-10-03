// ==ORIGINAL==

const i = 0;
class C {
    M() {
        for (let j = 0; j < 10; j++) {
            x = /*[#|*/i + 1/*|]*/;
        }
    }
}
        
// ==SCOPE::Extract to constant in enclosing scope==

const i = 0;
class C {
    M() {
        for (let j = 0; j < 10; j++) {
            const newLocal = i + 1;
            x = /*RENAME*/newLocal;
        }
    }
}
        
// ==SCOPE::Extract to constant in global scope==

const i = 0;
const newLocal = i + 1;
class C {
    M() {
        for (let j = 0; j < 10; j++) {
            x = /*RENAME*/newLocal;
        }
    }
}
        