//// [tests/cases/compiler/recursiveSpecializationOfExtendedTypeWithError.ts] ////

//// [recursiveSpecializationOfExtendedTypeWithError.ts]
interface HTMLSelectElement {
    options: HTMLSelectElement;
    <A>(name: A): any;
}
 


//// [recursiveSpecializationOfExtendedTypeWithError.js]
