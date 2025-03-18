//// [tests/cases/compiler/jsxClassAttributeResolution.tsx] ////

//// [file.tsx]
class App {}
export const a = <App></App>;
//// [package.json]
{
    "name": "@types/react",
    "version": "0.0.1",
    "main": "",
    "types": "index.d.ts",
}
//// [index.d.ts]
interface IntrinsicClassAttributesAlias<T> {
    ref: T
}
declare namespace JSX {
    type IntrinsicClassAttributes<T> = IntrinsicClassAttributesAlias<T>
}
//// [jsx-runtime.d.ts]
import './';
//// [jsx-dev-runtime.d.ts]
import './';


//// [file.js]
class App {
}
export const a = <App></App>;
