Fs::
//// [/apath/a.ts]


//// [/apath/tsconfig.json]
{"include":[["./**/*.ts"]]}


configFileName:: /apath/tsconfig.json
FileNames::

Errors::
[96m/apath/tsconfig.json[0m:[93m1[0m:[93m13[0m - [91merror[0m[90m TS5024: [0mCompiler option 'include' requires a value of type string.

[7m1[0m {"include":[["./**/*.ts"]]}
[7m [0m [91m            ~~~~~~~~~~~~~[0m
[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/apath/tsconfig.json'. Specified 'include' paths were '[["./**/*.ts"]]' and 'exclude' paths were '[]'.

