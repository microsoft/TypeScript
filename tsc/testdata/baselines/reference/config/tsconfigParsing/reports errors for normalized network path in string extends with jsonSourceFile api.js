Fs::
//// [/apath/main.ts]


//// [/apath/tsconfig.json]
{ "extends": "/x/../??/UNC/server/share/base.json" }


configFileName:: /apath/tsconfig.json
FileNames::
/apath/main.ts
Errors::
[96mtsconfig.json[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS5116: [0mNetwork path '/x/../??/UNC/server/share/base.json' is not supported.

[7m1[0m { "extends": "/x/../??/UNC/server/share/base.json" }
[7m [0m [91m             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

