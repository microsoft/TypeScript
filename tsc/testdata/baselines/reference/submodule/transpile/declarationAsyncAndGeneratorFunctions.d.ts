//// [declarationAsyncAndGeneratorFunctions.ts] ////
export async function asyncFn() {
    return {} as Promise<void>
}

export async function asyncFn2() {
    return {} as number
}

export async function asyncFn3() {
    return (await 42) as number;
  }

export function* generatorFn() {
    return {} as number
}

export async function* asyncGeneratorFn() {
    return {} as number
}
//// [declarationAsyncAndGeneratorFunctions.d.ts] ////
export declare function asyncFn(): unknown;
export declare function asyncFn2(): unknown;
export declare function asyncFn3(): unknown;
export declare function generatorFn(): {};
export declare function asyncGeneratorFn(): {};


//// [Diagnostics reported]
declarationAsyncAndGeneratorFunctions.ts(1,23): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
declarationAsyncAndGeneratorFunctions.ts(5,23): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
declarationAsyncAndGeneratorFunctions.ts(9,23): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
declarationAsyncAndGeneratorFunctions.ts(13,18): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
declarationAsyncAndGeneratorFunctions.ts(17,24): error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.


==== declarationAsyncAndGeneratorFunctions.ts (5 errors) ====
    export async function asyncFn() {
                          ~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 declarationAsyncAndGeneratorFunctions.ts:1:23: Add a return type to the function declaration.
        return {} as Promise<void>
    }
    
    export async function asyncFn2() {
                          ~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 declarationAsyncAndGeneratorFunctions.ts:5:23: Add a return type to the function declaration.
        return {} as number
    }
    
    export async function asyncFn3() {
                          ~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 declarationAsyncAndGeneratorFunctions.ts:9:23: Add a return type to the function declaration.
        return (await 42) as number;
      }
    
    export function* generatorFn() {
                     ~~~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 declarationAsyncAndGeneratorFunctions.ts:13:18: Add a return type to the function declaration.
        return {} as number
    }
    
    export async function* asyncGeneratorFn() {
                           ~~~~~~~~~~~~~~~~
!!! error TS9007: Function must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9031 declarationAsyncAndGeneratorFunctions.ts:17:24: Add a return type to the function declaration.
        return {} as number
    }
