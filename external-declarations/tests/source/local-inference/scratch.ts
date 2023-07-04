// @jsx: preserve
// @esModuleInterop: true
// @strict: true
// @isolatedDeclarations:false
// @target: es2015
// @filename: react.ts
namespace React {
    
}

declare global {
    export namespace JSX {
        export interface Element { 
            name: string
        }
    }
}

export default React;
// @filename: index.tsx
import React from './react';
export const value = <div/>