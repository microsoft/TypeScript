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
[96mtsconfig.json[0m:[93m2[0m:[93m29[0m - [91merror[0m[90m TS5116: [0mNetwork path '//server/share/base.json' is not supported.

[7m2[0m                 "extends": ["//server/share/base.json", "\\\\?\\UNC\\server\\share\\base.json"],
[7m [0m [91m                            ~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m2[0m:[93m57[0m - [91merror[0m[90m TS5116: [0mNetwork path '//?/UNC/server/share/base.json' is not supported.

[7m2[0m                 "extends": ["//server/share/base.json", "\\\\?\\UNC\\server\\share\\base.json"],
[7m [0m [91m                                                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m4[0m:[93m31[0m - [91merror[0m[90m TS5116: [0mNetwork path '\\server\share\out' is not supported.

[7m4[0m                     "outDir": "\\\\server\\share\\out",
[7m [0m [91m                              ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m6[0m:[93m46[0m - [91merror[0m[90m TS5116: [0mNetwork path '\??\UNC\server\share\types' is not supported.

[7m6[0m                     "typeRoots": ["./types", "\\??\\UNC\\server\\share\\types"],
[7m [0m [91m                                             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m8[0m:[93m39[0m - [91merror[0m[90m TS5116: [0mNetwork path '/x/../??/UNC/server/share/decl' is not supported.

[7m8[0m                     "declarationDir": "/x/../??/UNC/server/share/decl",
[7m [0m [91m                                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m12[0m:[93m36[0m - [91merror[0m[90m TS5116: [0mNetwork path '\\.\GLOBALROOT\Device\Mup\server\share' is not supported.

[7m12[0m                 "include": ["src", "\\\\.\\GLOBALROOT\\Device\\Mup\\server\\share"],
[7m  [0m [91m                                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m13[0m:[93m29[0m - [91merror[0m[90m TS5116: [0mNetwork path '//server/share/excluded' is not supported.

[7m13[0m                 "exclude": ["//server/share/excluded", "../??/*.ts"],
[7m  [0m [91m                            ~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m11[0m:[93m38[0m - [91merror[0m[90m TS5116: [0mNetwork path '//server/share/a.ts' is not supported.

[7m11[0m                 "files": ["main.ts", "//server/share/a.ts", "../??/UNC/server/share/b.ts"],
[7m  [0m [91m                                     ~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m11[0m:[93m61[0m - [91merror[0m[90m TS5116: [0mNetwork path '../??/UNC/server/share/b.ts' is not supported.

[7m11[0m                 "files": ["main.ts", "//server/share/a.ts", "../??/UNC/server/share/b.ts"],
[7m  [0m [91m                                                            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m14[0m:[93m42[0m - [91merror[0m[90m TS5116: [0mNetwork path '//server/share/project' is not supported.

[7m14[0m                 "references": [{ "path": "//server/share/project" }]
[7m  [0m [91m                                         ~~~~~~~~~~~~~~~~~~~~~~~~[0m

