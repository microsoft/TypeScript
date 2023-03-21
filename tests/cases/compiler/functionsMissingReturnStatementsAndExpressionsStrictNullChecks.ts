// @strictNullChecks: true

// @target: es2018

function f1(): undefined | number {
    // Okay; return type allows implicit return of undefined
}

function f2(): number {
    // Error; return type does not include undefined
}

async function f3(): Promise<undefined | number> {
    // Okay; return type allows implicit return of undefined
}

async function f4(): Promise<number> {
    // Error; return type does not include undefined
}
