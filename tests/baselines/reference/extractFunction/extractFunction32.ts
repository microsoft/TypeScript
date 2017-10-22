// ==ORIGINAL==
namespace N {

    export const value = 1;

    () => {
        /*[#|*/var c = class {
            M() {
                return value;
            }
        }/*|]*/
    }
}
// ==SCOPE::Extract to function in namespace 'N'==
namespace N {

    export const value = 1;

    () => {
        /*RENAME*/newFunction();
    }

    function newFunction() {
        var c = class {
            M() {
                return value;
            }
        };
    }
}
// ==SCOPE::Extract to function in global scope==
namespace N {

    export const value = 1;

    () => {
        /*RENAME*/newFunction();
    }
}

function newFunction() {
    var c = class {
        M() {
            return N.value;
        }
    };
}
