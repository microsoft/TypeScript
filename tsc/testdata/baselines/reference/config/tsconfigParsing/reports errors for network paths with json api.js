Fs::
//// [/apath/main.ts]


//// [/apath/src/index.ts]


//// [/apath/tsconfig.json]
{
                "extends": ["//server/share/base.json", "\\\\?\\UNC\\server\\share\\base.json"],
                "compilerOptions": {
                    "outDir": "\\\\server\\share\\out",
                    "rootDir": "./src",
                    "typeRoots": ["./types", "\\??\\UNC\\server\\share\\types"],
                    "mapRoot": "//server/share/maps",
                    "declarationDir": "/x/../??/UNC/server/share/decl",
                    "baseUrl": "/??/../apath"
                },
                "files": ["main.ts", "//server/share/a.ts", "../??/UNC/server/share/b.ts"],
                "include": ["src", "\\\\.\\GLOBALROOT\\Device\\Mup\\server\\share"],
                "exclude": ["//server/share/excluded", "../??/*.ts"],
                "references": [{ "path": "//server/share/project" }]
            }


configFileName:: /apath/tsconfig.json
CompilerOptions::
{
  "mapRoot": "//server/share/maps",
  "rootDir": "/apath/src",
  "typeRoots": [
    "/apath/types"
  ],
  "baseUrl": "/apath",
  "configFilePath": "/apath/tsconfig.json"
}

TypeAcquisition::
{}

FileNames::
/apath/main.ts,/apath/src/index.ts
Errors::
[91merror[0m[90m TS5116: [0mNetwork path '\\server\share\out' is not supported.
[91merror[0m[90m TS5116: [0mNetwork path '\??\UNC\server\share\types' is not supported.
[91merror[0m[90m TS5116: [0mNetwork path '/x/../??/UNC/server/share/decl' is not supported.
[91merror[0m[90m TS5116: [0mNetwork path '//server/share/base.json' is not supported.
[91merror[0m[90m TS5116: [0mNetwork path '//?/UNC/server/share/base.json' is not supported.
[91merror[0m[90m TS5116: [0mNetwork path '\\.\GLOBALROOT\Device\Mup\server\share' is not supported.
[91merror[0m[90m TS5116: [0mNetwork path '//server/share/excluded' is not supported.
[91merror[0m[90m TS5116: [0mNetwork path '//server/share/a.ts' is not supported.
[91merror[0m[90m TS5116: [0mNetwork path '../??/UNC/server/share/b.ts' is not supported.
[91merror[0m[90m TS5116: [0mNetwork path '//server/share/project' is not supported.
