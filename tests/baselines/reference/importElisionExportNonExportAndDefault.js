//// [tests/cases/compiler/importElisionExportNonExportAndDefault.ts] ////

//// [main.ts]
import MyFunction from "./MyComponent";

MyFunction({msg: "Hello World"});


//// [MyComponent.ts]
interface MyFunction { msg: string; }

export const MyFunction = ({ msg }: MyFunction) => console.log(`Got message "${msg}"`);
export default MyFunction;

//// [MyComponent.js]
export const MyFunction = ({ msg }) => console.log(`Got message "${msg}"`);
export default MyFunction;
//// [main.js]
import MyFunction from "./MyComponent";
MyFunction({ msg: "Hello World" });
