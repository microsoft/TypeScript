// ==ORIGINAL==

function F0() {
    function F1() {
        function F2(x = /*[#|*/2 + 1/*|]*/) {
        }
    }
}
        
// ==SCOPE::Extract to constant in enclosing scope==

function F0() {
    function F1() {
        const newLocal = 2 + 1;
        function F2(x = /*RENAME*/newLocal) {
        }
    }
}
        
// ==SCOPE::Extract to constant in function 'F0'==

function F0() {
    const newLocal = 2 + 1;
    function F1() {
        function F2(x = /*RENAME*/newLocal) {
        }
    }
}
        
// ==SCOPE::Extract to constant in global scope==
const newLocal = 2 + 1;
function F0() {
    function F1() {
        function F2(x = /*RENAME*/newLocal) {
        }
    }
}
        