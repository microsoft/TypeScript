// @Filename: /tsconfig.json
{
    "compilerOptions": {
        "target": "esnext",
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "allowJs": true,
        "checkJs": true,
        "strict": true,
        "noEmit": true
    }
}

// @Filename: /package.json
{
    "type": "module"
}

// @Filename: /a.js
export const n = 1;
const bad = null;
bad.a.b.c();

// @Filename: /a.d.ts
export declare const n: number;

// @Filename: /b.mjs
export const n = 1;
const bad = null;
bad.a.b.c();

// @Filename: /b.d.mts
export declare const n: number;

// @Filename: /c.cjs
export const n = 1;
const bad = null;
bad.a.b.c();

// @Filename: /c.d.cts
export declare const n: number;
