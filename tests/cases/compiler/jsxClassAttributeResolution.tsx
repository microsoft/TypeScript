// @jsx: react-jsx
// @module: nodenext
// @filename: file.tsx
class App {}
export const a = <App></App>;
// @filename: node_modules/@types/react/package.json
{
    "name": "@types/react",
    "version": "0.0.1",
    "main": "",
    "types": "index.d.ts",
}
// @filename: node_modules/@types/react/index.d.ts
interface IntrinsicClassAttributesAlias<T> {
    ref: T
}
declare namespace JSX {
    type IntrinsicClassAttributes<T> = IntrinsicClassAttributesAlias<T>
}
// @filename: node_modules/@types/react/jsx-runtime.d.ts
import './';
// @filename: node_modules/@types/react/jsx-dev-runtime.d.ts
import './';
