Fs::
//// [/apath/..c.ts]


//// [/apath/.b.ts]


//// [/apath/.git/a.ts]


//// [/apath/test.ts]


//// [/apath/tsconfig.json]
{
                    "files": ["/apath/.git/a.ts", "/apath/.b.ts", "/apath/..c.ts"]
                }


configFileName:: tsconfig.json
CompilerOptions::
{
  "configFilePath": "/apath/tsconfig.json"
}

TypeAcquisition::
{}

FileNames::
/apath/.git/a.ts,/apath/.b.ts,/apath/..c.ts
Errors::

