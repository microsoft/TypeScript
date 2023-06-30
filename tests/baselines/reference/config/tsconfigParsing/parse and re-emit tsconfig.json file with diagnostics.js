Initial::
{
                "compilerOptions": {
                    "allowJs": true
                    // Some comments
                    "outDir": "bin"
                }
                "files": ["file1.ts"]
            }
Result::
{
 "compilerOptions": {
  "allowJs": true,
  "outDir": "bin"
 },
 "files": [
  "file1.ts"
 ]
}
Errors::
[91m● [0m[96mconfig.json[0m:[93m5[0m:[93m21[0m  [91mError[0m TS1005
| "outDir": "bin"
  [91m▔▔▔▔▔▔▔▔[0m
',' expected.
[91m● [0m[96mconfig.json[0m:[93m7[0m:[93m17[0m  [91mError[0m TS1005
| "files": ["file1.ts"]
  [91m▔▔▔▔▔▔▔[0m
',' expected.
