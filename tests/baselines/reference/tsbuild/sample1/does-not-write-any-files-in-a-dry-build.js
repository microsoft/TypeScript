Input::
//// [/lib/lib.d.ts]


//// [/src/core/anotherModule.ts]


//// [/src/core/index.ts]


//// [/src/core/some_decl.d.ts]


//// [/src/core/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "skipDefaultLibCheck": true
    }
}

//// [/src/logic/index.ts]


//// [/src/logic/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "sourceMap": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true
    },
    "references": [
        { "path": "../core" }
    ]
}


//// [/src/tests/index.ts]


//// [/src/tests/tsconfig.json]
{
    "references": [
        { "path": "../core" },
        { "path": "../logic" }
    ],
    "files": ["index.ts"],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "forceConsistentCasingInFileNames": true,
        "skipDefaultLibCheck": true
    }
}

//// [/src/ui/index.ts]


//// [/src/ui/tsconfig.json]




Output::
/lib/tsc --b /src/tests --dry
[[90m12:00:00 AM[0m] A non-dry build would build project '/src/core/tsconfig.json'

[[90m12:00:00 AM[0m] A non-dry build would build project '/src/logic/tsconfig.json'

[[90m12:00:00 AM[0m] A non-dry build would build project '/src/tests/tsconfig.json'

exitCode:: ExitStatus.Success


