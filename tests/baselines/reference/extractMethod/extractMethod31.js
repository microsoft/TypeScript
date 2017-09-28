// ==ORIGINAL==
namespace N {

    export const value = 1;

    () => {
        var f: () => number;
        f = function (): number {
            return value;
        }
    }
}
// ==SCOPE::function in namespace 'N'==
namespace N {

    export const value = 1;

    () => {
        var f: () => number;
        f = /*RENAME*/newFunction(f);
    }

    function newFunction(f) {
        f = function(): number {
            return value;
        };
        return f;
    }
}
// ==SCOPE::function in global scope==
namespace N {

    export const value = 1;

    () => {
        var f: () => number;
        f = /*RENAME*/newFunction(f);
    }
}
function newFunction(f) {
    f = function(): number {
        return N.value;
    };
    return f;
}
