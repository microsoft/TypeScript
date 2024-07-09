// @target: es6
// @noImplicitReturns: true

// Should be an error, Promise<number>, currently retorted correctly 
async function test3(isError: boolean = true) {
    if (isError === true) {
        return 6;
    }
}

// Should not be an error, Promise<any>, currently **not** working
async function test4(isError: boolean = true) {  
    if (isError === true) {
        return undefined;
    }
}

// should not be error, Promise<any> currently working correctly 
async function test5(isError: boolean = true): Promise<any> { //should not be error
    if (isError === true) {
        return undefined;
    }
}


// should be error, currently reported correctly 
async function test6(isError: boolean = true): Promise<number> { 
    if (isError === true) {
        return undefined;
    }
}

// infered to be Promise<void>, should not be an error, currently reported correctly 
async function test7(isError: boolean = true) { 
    if (isError === true) {
        return;
    }
}