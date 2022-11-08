// @jsx: react-jsx
// @module: nodenext
// @traceResolution: true
// @filename: file.tsx
export const a = <div></div>;
// @filename: node_modules/@types/react/package.json
{
    "name": "@types/react",
    "version": "0.0.1",
    "main": "",
    "types": "index.d.ts",
}
// @filename: node_modules/@types/react/index.d.ts
declare namespace JSX {
    interface IntrinsicElements { [x: string]: any; }
}
// @filename: node_modules/@types/react/jsx-runtime.d.ts
import './';
// @filename: node_modules/@types/react/jsx-dev-runtime.d.ts
import './';
