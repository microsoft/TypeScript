//// [recursiveSpecializationOfExtendedTypeWithError.ts]
interface HTMLSelectElement {
    options: HTMLSelectElement;
    <A>(name: A): any;
}
 


//// [recursiveSpecializationOfExtendedTypeWithError.js]
