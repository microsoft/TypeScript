// @target: es2015
// @module: commonjs
//@noUnusedLocals:true
//@noUnusedParameters:true

// @Filename: file1.ts
export class Calculator {
    handleChar() {}
}

export function test() {

}

export function test2() {

}

// @Filename: file2.ts
import c = require('./file1')