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
[96mconfig.json[0m:[93m5[0m:[93m21[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m5[0m                     "outDir": "bin"
[7m [0m [91m                    ~~~~~~~~[0m
[96mconfig.json[0m:[93m7[0m:[93m17[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m7[0m                 "files": ["file1.ts"]
[7m [0m [91m                ~~~~~~~[0m
