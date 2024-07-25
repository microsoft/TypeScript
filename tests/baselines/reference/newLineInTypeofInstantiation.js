//// [tests/cases/compiler/newLineInTypeofInstantiation.ts] ////

//// [newLineInTypeofInstantiation.ts]
interface Example {
    (a: number): typeof a
  
    <T>(): void
}


//// [newLineInTypeofInstantiation.js]
