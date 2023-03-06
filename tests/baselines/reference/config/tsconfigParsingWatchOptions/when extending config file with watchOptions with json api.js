Input:: {
 "extends": "./base.json",
 "watchOptions": {
  "watchFile": "UseFsEvents"
 },
 "compileOnSave": false
}
Result: WatchOptions::
{
 "watchFile": 4,
 "watchDirectory": 1
}
Result: Errors::

Input:: {
 "extends": "./base.json",
 "compileOnSave": false
}
Result: WatchOptions::
{
 "watchFile": 5,
 "watchDirectory": 1
}
Result: Errors::
