Fs::
//// [/a.ts]


//// [/base.json]
{
  "watchOptions": {
    "watchFile": "UseFsEventsOnParentDirectory",
    "watchDirectory": "FixedPollingInterval"
  }
}

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
  "watchFile": 4,
  "watchDirectory": 1
}
Errors::


Fs::
//// [/a.ts]


//// [/base.json]
{
  "watchOptions": {
    "watchFile": "UseFsEventsOnParentDirectory",
    "watchDirectory": "FixedPollingInterval"
  }
}

//// [/tsconfig.json]
{
  "extends": "./base.json"
}


configFileName:: tsconfig.json
Result: WatchOptions::
{
  "watchFile": 5,
  "watchDirectory": 1
}
Errors::

