// @target: ES6
// @noImplicitReturns: true

// async function without return type annotation - error
async function f1() {    
}

let x = async function() {
}

// async function with which promised type is void - return can be omitted
async function f2(): Promise<void> {
    
}