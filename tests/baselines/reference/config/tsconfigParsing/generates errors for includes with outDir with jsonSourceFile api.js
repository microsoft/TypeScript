Fs::
//// [/apath/a.ts]


//// [/apath/tsconfig.json]
{
                "compilerOptions": {
                    "outDir": "./"
                },
                "include": ["**/*"]
            }


configFileName:: /apath/tsconfig.json
FileNames::

Errors::
[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/apath/tsconfig.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '["/apath"]'.

