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
    },
    "include": [
        "**/*.js",
        "**/*.d.ts",
        "**/*.mjs",
        "**/*.d.mts",
        "**/*.cjs",
        "**/*.d.cts"
    ]
}

// @Filename: /package.json
{
    "type": "module"
}

// @Filename: /a.js
const bad = null;
bad.a();

// @Filename: /a.d.ts
export declare const n: number;

// @Filename: /b.mjs
const bad = null;
bad.b();

// @Filename: /b.d.mts
export declare const n: number;

// @Filename: /c.cjs
const bad = null;
bad.c();

// @Filename: /c.d.cts
export declare const n: number;
