// @currentDirectory: /proj

// The "include" entry is an absolute path that ends with "..". The compiler
// normalizes the entry before it takes the base directory of the search. The
// search starts in "/shared", not in "/shared/sub", so the program has both
// files.

// @filename: /proj/tsconfig.json
{
    "compilerOptions": {
        "noEmit": true
    },
    "include": ["/shared/sub/.."]
}

// @filename: /shared/a.ts
export const a: number = "s";

// @filename: /shared/sub/b.ts
export const b: number = "s";
