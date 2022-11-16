Input:: {
 "extends": "./base.json",
 "watchOptions": {
  "watchFile": "UseFsEvents"
 }
}
Result: WatchOptions::
{
 "watchFile": 4,
 "watchDirectory": 1
}
Result: Errors::

Input:: {
 "extends": "./base.json"
}
Result: WatchOptions::
{
 "watchFile": 5,
 "watchDirectory": 1
}
Result: Errors::
