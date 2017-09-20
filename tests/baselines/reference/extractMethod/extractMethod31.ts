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
// ==SCOPE::namespace 'N'==
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
// ==SCOPE::global scope==
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
