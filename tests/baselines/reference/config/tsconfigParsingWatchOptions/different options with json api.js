Fs::
//// [/a.ts]


//// [/tsconfig.json]
{
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


//// [/tsconfig.json]
{
  "watchOptions": {
    "watchDirectory": "UseFsEvents"
  }
}


configFileName:: tsconfig.json
Result: WatchOptions::
{
  "watchDirectory": 0
}
Errors::


Fs::
//// [/a.ts]


//// [/tsconfig.json]
{
  "watchOptions": {
    "fallbackPolling": "DynamicPriority"
  }
}


configFileName:: tsconfig.json
Result: WatchOptions::
{
  "fallbackPolling": 2
}
Errors::


Fs::
//// [/a.ts]


//// [/tsconfig.json]
{
  "watchOptions": {
    "synchronousWatchDirectory": true
  }
}


configFileName:: tsconfig.json
Result: WatchOptions::
{
  "synchronousWatchDirectory": true
}
Errors::


Fs::
//// [/a.ts]


//// [/tsconfig.json]
{
  "watchOptions": {
    "excludeDirectories": [
      "**/temp"
    ]
  }
}


configFileName:: tsconfig.json
Result: WatchOptions::
{
  "excludeDirectories": [
    "/**/temp"
  ]
}
Errors::


Fs::
//// [/a.ts]


//// [/tsconfig.json]
{
  "watchOptions": {
    "excludeFiles": [
      "**/temp/*.ts"
    ]
  }
}


configFileName:: tsconfig.json
Result: WatchOptions::
{
  "excludeFiles": [
    "/**/temp/*.ts"
  ]
}
Errors::


Fs::
//// [/a.ts]


//// [/tsconfig.json]
{
  "watchOptions": {
    "excludeDirectories": [
      "**/../*"
    ]
  }
}


configFileName:: tsconfig.json
Result: WatchOptions::
{
  "excludeDirectories": []
}
Errors::
[91merror[0m[90m TS5065: [0mFile specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '**/../*'.


Fs::
//// [/a.ts]


//// [/tsconfig.json]
{
  "watchOptions": {
    "excludeFiles": [
      "**/../*"
    ]
  }
}


configFileName:: tsconfig.json
Result: WatchOptions::
{
  "excludeFiles": []
}
Errors::
[91merror[0m[90m TS5065: [0mFile specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '**/../*'.

