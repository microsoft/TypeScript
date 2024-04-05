Fs::
//// [/apath/a.ts]


//// [/apath/b.js]


//// [/apath/tsconfig.json]
{
            "target": "esnext",
            "compilerOptions": {
                "module": "esnext"
            }
        }


configFileName:: tsconfig.json
CompilerOptions::
{
  "module": 99,
  "configFilePath": "tsconfig.json"
}
Errors::

