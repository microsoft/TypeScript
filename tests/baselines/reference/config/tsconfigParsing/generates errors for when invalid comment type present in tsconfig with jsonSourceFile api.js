Fs::
//// [/apath/a.ts]


//// [/apath/tsconfig.json]
{
              "compilerOptions": {
                ## this comment does cause issues
                "types" : [
                ]
              }
            }


configFileName:: /apath/tsconfig.json
FileNames::
/apath/a.ts
Errors::
[91m● [0m[96m/apath/tsconfig.json[0m:[93m3[0m:[93m17[0m  [91mError[0m TS1327
| ## this comment does cause issues
  [91m▔[0m
String literal with double quotes expected.
[91m● [0m[96m/apath/tsconfig.json[0m:[93m3[0m:[93m18[0m  [91mError[0m TS1328
| ## this comment does cause issues
  [91m ▔[0m
Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.
[91m● [0m[96m/apath/tsconfig.json[0m:[93m3[0m:[93m17[0m  [91mError[0m TS5023
| ## this comment does cause issues
  [91m▔[0m
Unknown compiler option '#'.
[91m● [0m[96m/apath/tsconfig.json[0m:[93m3[0m:[93m20[0m  [91mError[0m TS1327
| ## this comment does cause issues
  [91m   ▔▔▔▔[0m
String literal with double quotes expected.
[91m● [0m[96m/apath/tsconfig.json[0m:[93m3[0m:[93m25[0m  [91mError[0m TS1328
| ## this comment does cause issues
  [91m        ▔▔▔▔▔▔▔[0m
Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.
[91m● [0m[96m/apath/tsconfig.json[0m:[93m3[0m:[93m20[0m  [91mError[0m TS5023
| ## this comment does cause issues
  [91m   ▔▔▔▔[0m
Unknown compiler option 'this'.
[91m● [0m[96m/apath/tsconfig.json[0m:[93m3[0m:[93m33[0m  [91mError[0m TS1136
| ## this comment does cause issues
  [91m                ▔▔▔▔[0m
Property assignment expected.
[91m● [0m[96m/apath/tsconfig.json[0m:[93m3[0m:[93m38[0m  [91mError[0m TS1136
| ## this comment does cause issues
  [91m                     ▔▔▔▔▔[0m
Property assignment expected.
[91m● [0m[96m/apath/tsconfig.json[0m:[93m3[0m:[93m44[0m  [91mError[0m TS1136
| ## this comment does cause issues
  [91m                           ▔▔▔▔▔▔[0m
Property assignment expected.

