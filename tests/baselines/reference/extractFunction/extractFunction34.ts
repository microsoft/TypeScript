// ==ORIGINAL==
const F = () => {
    /*[#|*/function G() { }/*|]*/
};
// ==SCOPE::Extract to inner function in arrow function==
const F = () => {
    /*RENAME*/newFunction();

    function newFunction() {
        function G() { }
    }
};
// ==SCOPE::Extract to function in global scope==
const F = () => {
    /*RENAME*/newFunction();
};

function newFunction() {
    function G() { }
}
