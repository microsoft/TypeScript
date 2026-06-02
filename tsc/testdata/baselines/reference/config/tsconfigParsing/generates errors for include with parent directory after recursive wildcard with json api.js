Fs::
//// [/apath/main.ts]


//// [/apath/tsconfig.json]
{
                "include": ["**/../*.ts"]
            }


configFileName:: /apath/tsconfig.json
CompilerOptions::
{
  "configFilePath": "/apath/tsconfig.json"
}

TypeAcquisition::
{}

FileNames::

Errors::
[91merror[0m[90m TS5065: [0mFile specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '**/../*.ts'.
[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/apath/tsconfig.json'. Specified 'include' paths were '["**/../*.ts"]' and 'exclude' paths were '[]'.
