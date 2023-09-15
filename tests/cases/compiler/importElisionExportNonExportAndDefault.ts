// @target: esnext
// @module: esnext
// @filename: main.ts
import MyFunction from "./MyComponent";

MyFunction({msg: "Hello World"});


// @filename: MyComponent.ts
interface MyFunction { msg: string; }

export const MyFunction = ({ msg }: MyFunction) => console.log(`Got message "${msg}"`);
export default MyFunction;