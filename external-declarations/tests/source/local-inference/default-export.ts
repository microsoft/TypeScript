// @jsx: preserve
// @esModuleInterop: true
// @isolatedDeclarations:true
// @strict:true,false
// @target: es2015

//@fileName: some-module.ts
export let X = 1;
//@fileName: default-with-typeof.ts
import { X } from './some-module';
export default {
    X
}
//@fileName: default-with-assertion.ts
export type TestCase = { exec: () => void }
function test(): TestCase {
    return null!
}

export default test() satisfies TestCase as TestCase

