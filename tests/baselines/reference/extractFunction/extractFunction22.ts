// ==ORIGINAL==
function test() {
    try {
    }
    finally {
        /*[#|*/return 1;/*|]*/
    }
}
// ==SCOPE::Extract to inner function in function 'test'==
function test() {
    try {
    }
    finally {
        return /*RENAME*/newFunction();
    }

    function newFunction() {
        return 1;
    }
}
// ==SCOPE::Extract to function in global scope==
function test() {
    try {
    }
    finally {
        return /*RENAME*/newFunction();
    }
}

function newFunction() {
    return 1;
}
