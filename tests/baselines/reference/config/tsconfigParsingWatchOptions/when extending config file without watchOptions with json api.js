Fs::
//// [/a.ts]


//// [/base.json]
{}

//// [/tsconfig.json]
{
  "extends": "./base.json",
  "watchOptions": {
    "watchFile": "UseFsEvents"
  }
}


configFileName:: tsconfig.json
Result: WatchOptions::
{
  "watchFile": 4
}
Errors::


Fs::
//// [/a.ts]


//// [/base.json]
{}

//// [/tsconfig.json]
{
  "extends": "./base.json"
}


configFileName:: tsconfig.json
Result: WatchOptions::

Errors::

