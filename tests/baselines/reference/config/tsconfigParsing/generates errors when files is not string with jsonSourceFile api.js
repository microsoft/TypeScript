Fs::
//// [/apath/a.ts]


//// [/apath/tsconfig.json]
{
  "files": [
    {
      "compilerOptions": {
        "experimentalDecorators": true,
        "allowJs": true
      }
    }
  ]
}


configFileName:: /apath/tsconfig.json
FileNames::

Errors::
[96m/apath/tsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5024: [0mCompiler option 'files' requires a value of type string.

[7m  3[0m     {
[7m   [0m [91m    ~[0m
[7m  4[0m       "compilerOptions": {
[7m   [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
[7m...[0m 
[7m  7[0m       }
[7m   [0m [91m~~~~~~~[0m
[7m  8[0m     }
[7m   [0m [91m~~~~~[0m

