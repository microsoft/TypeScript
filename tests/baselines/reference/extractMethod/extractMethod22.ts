// ==ORIGINAL==
function test() {
    try {
    }
    finally {
        return 1;
    }
}
// ==SCOPE::function 'test'==
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
// ==SCOPE::global scope==
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
