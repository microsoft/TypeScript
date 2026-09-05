// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "jsx": "preserve",
        "declaration": true,
        "emitDeclarationOnly": true,
        "outputExtension": ".mjs"
    }
}

// @Filename: /a.ts
export declare const a: string;

// @Filename: /b.tsx
export declare const b: number;

// @Filename: /main.ts
export { a } from "./a.ts";
export { b } from "./b.tsx";
export type A = typeof import("./a.ts").a;
