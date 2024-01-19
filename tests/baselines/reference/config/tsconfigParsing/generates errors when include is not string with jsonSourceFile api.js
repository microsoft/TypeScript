Fs::
//// [/apath/a.ts]


//// [/apath/tsconfig.json]
{
  "include": [
    [
      "./**/*.ts"
    ]
  ]
}


configFileName:: /apath/tsconfig.json
FileNames::

Errors::
[96m/apath/tsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5024: [0mCompiler option 'include' requires a value of type string.

[7m3[0m     [
[7m [0m [91m    ~[0m
[7m4[0m       "./**/*.ts"
[7m [0m [91m~~~~~~~~~~~~~~~~~[0m
[7m5[0m     ]
[7m [0m [91m~~~~~[0m
[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/apath/tsconfig.json'. Specified 'include' paths were '[["./**/*.ts"]]' and 'exclude' paths were '[]'.

