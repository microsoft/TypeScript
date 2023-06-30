Fs::
//// [/apath/a.ts]


//// [/apath/tsconfig.json]
{"include":[["./**/*.ts"]]}


configFileName:: /apath/tsconfig.json
FileNames::

Errors::
[91m● [0m[96m/apath/tsconfig.json[0m:[93m1[0m:[93m13[0m  [91mError[0m TS5024
| {"include":[["./**/*.ts"]]}
  [91m            ▔▔▔▔▔▔▔▔▔▔▔▔▔[0m
Compiler option 'include' requires a value of type string.
[91m● [0m [91mError[0m TS18003No inputs were found in config file '/apath/tsconfig.json'. Specified 'include' paths were '[["./**/*.ts"]]' and 'exclude' paths were '[]'.

