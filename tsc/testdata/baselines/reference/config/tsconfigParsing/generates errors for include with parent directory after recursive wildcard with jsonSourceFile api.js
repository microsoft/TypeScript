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
[96mtsconfig.json[0m:[93m2[0m:[93m29[0m - [91merror[0m[90m TS5065: [0mFile specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '**/../*.ts'.

[7m2[0m                 "include": ["**/../*.ts"]
[7m [0m [91m                            ~~~~~~~~~~~~[0m

[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/apath/tsconfig.json'. Specified 'include' paths were '["**/../*.ts"]' and 'exclude' paths were '[]'.
