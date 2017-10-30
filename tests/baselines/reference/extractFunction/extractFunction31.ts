// ==ORIGINAL==
namespace N {

    export const value = 1;

    () => {
        var f: () => number;
        /*[#|*/f = function (): number {
            return value;
        }/*|]*/
    }
}
// ==SCOPE::Extract to function in namespace 'N'==
namespace N {

    export const value = 1;

    () => {
        var f: () => number;
        f = /*RENAME*/newFunction(f);
    }

    function newFunction(f: () => number) {
        f = function(): number {
            return value;
        };
        return f;
    }
}
// ==SCOPE::Extract to function in global scope==
namespace N {

    export const value = 1;

    () => {
        var f: () => number;
        f = /*RENAME*/newFunction(f);
    }
}

function newFunction(f: () => number) {
    f = function(): number {
        return N.value;
    };
    return f;
}
