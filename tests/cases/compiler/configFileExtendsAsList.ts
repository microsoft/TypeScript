// @Filename: /tsconfig1.json
{
    "compilerOptions": {
        "strictNullChecks": true
    }
}

// @Filename: /tsconfig2.json
{
    "compilerOptions": {
        "noImplicitAny": true
    }
}

// @Filename: /tsconfig.json
{
    "extends": ["./tsconfig1.json", "./tsconfig2.json"]
}

// @Filename: /index.ts
function f(x) { } // noImplicitAny error
let y: string;
y.toLowerCase(); // strictNullChecks error