/// <reference path="fourslash.ts" />

// Test Case: Rename Function and Update Imports

// Step 1: Create an initial file "myFunction.ts" with named, default exports and arrow function
// @filename: myFunction.ts
//// export function myFunction() {}
//// export const myFunc = () => {};
//// export default function defaultFunction() {}

// Step 2: Perform file renaming from "myFunction.ts" to "myNewFunction.ts"
goTo.file("myFunction.ts");
renameFile("myFunction.ts", "myNewFunction.ts");

// Verify that the content of the current file reflects the correct function name change
verify.currentFileContentIs(`export function myNewFunction() {}
export const myFunc = () => {};
export default function defaultFunction() {}`);

// Step 3: Verify the imported path in other files

// @filename: anotherFile.ts
//// import { myFunction } from './myFunction';
//// import myDefaultFunction from './myFunction';

goTo.file("anotherFile.ts");

// After renaming, the import paths and bindings should be updated correctly
verify.currentFileContentIs(`import { myFunction } from './myNewFunction';
import myDefaultFunction from './myNewFunction';`);

verify.importBindingChange("myFunction", "myNewFunction"); // Check that the named function is renamed correctly
verify.importBindingChange("myDefaultFunction", "defaultFunction"); // Default function name should not change

// Step 4: Edge Case - Renaming a class

// Initial file: myClass.ts
//// export class MyClass {}
//// export default class MyClassDefault {}

goTo.file("myClass.ts");
renameFile("myClass.ts", "myNewClass.ts");

// Verify that the class name and file name are updated correctly
verify.currentFileContentIs(`export class MyNewClass {}
export default class MyClassDefault {}`);

// Step 5: Verify imports in another file for the class

// @filename: anotherFileWithClass.ts
//// import { MyClass } from './myClass';
//// import MyClassDefault from './myClass';

goTo.file("anotherFileWithClass.ts");

// Verify that the import paths and bindings are updated correctly after renaming
verify.currentFileContentIs(`import { MyClass } from './myNewClass';
import MyClassDefault from './myNewClass';`);

verify.importBindingChange("MyClass", "MyNewClass"); // Check that the class name is renamed correctly
verify.importBindingChange("MyClassDefault", "MyClassDefault"); // Default class name should remain the same

// Step 6: Edge Case - Renaming an arrow function

// Initial file: myArrowFunction.ts
//// export const myArrowFunc = () => {};

goTo.file("myArrowFunction.ts");
renameFile("myArrowFunction.ts", "myNewArrowFunction.ts");

// Verify the renamed arrow function is updated correctly
verify.currentFileContentIs(`export const myNewArrowFunc = () => {};`);

// Step 7: Verify imports for the renamed arrow function

// @filename: anotherFileWithArrow.ts
//// import { myArrowFunc } from './myArrowFunction';

goTo.file("anotherFileWithArrow.ts");

// Verify the import path and binding name after renaming the arrow function
verify.currentFileContentIs(`import { myArrowFunc } from './myNewArrowFunction';`);
verify.importBindingChange("myArrowFunc", "myNewArrowFunc"); // Verify the arrow function name change
