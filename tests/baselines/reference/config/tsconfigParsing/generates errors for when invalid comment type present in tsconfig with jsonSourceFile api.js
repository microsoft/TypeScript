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
[96mtsconfig.json[0m:[93m3[0m:[93m17[0m - [91merror[0m[90m TS1327: [0mString literal with double quotes expected.

[7m3[0m                 ## this comment does cause issues
[7m [0m [91m                ~[0m
[96mtsconfig.json[0m:[93m3[0m:[93m18[0m - [91merror[0m[90m TS1328: [0mProperty value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.

[7m3[0m                 ## this comment does cause issues
[7m [0m [91m                 ~[0m
[96mtsconfig.json[0m:[93m3[0m:[93m17[0m - [91merror[0m[90m TS5023: [0mUnknown compiler option '#'.

[7m3[0m                 ## this comment does cause issues
[7m [0m [91m                ~[0m
[96mtsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS1327: [0mString literal with double quotes expected.

[7m3[0m                 ## this comment does cause issues
[7m [0m [91m                   ~~~~[0m
[96mtsconfig.json[0m:[93m3[0m:[93m25[0m - [91merror[0m[90m TS1328: [0mProperty value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.

[7m3[0m                 ## this comment does cause issues
[7m [0m [91m                        ~~~~~~~[0m
[96mtsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS5023: [0mUnknown compiler option 'this'.

[7m3[0m                 ## this comment does cause issues
[7m [0m [91m                   ~~~~[0m
[96mtsconfig.json[0m:[93m3[0m:[93m33[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m3[0m                 ## this comment does cause issues
[7m [0m [91m                                ~~~~[0m
[96mtsconfig.json[0m:[93m3[0m:[93m38[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m3[0m                 ## this comment does cause issues
[7m [0m [91m                                     ~~~~~[0m
[96mtsconfig.json[0m:[93m3[0m:[93m44[0m - [91merror[0m[90m TS1136: [0mProperty assignment expected.

[7m3[0m                 ## this comment does cause issues
[7m [0m [91m                                           ~~~~~~[0m

