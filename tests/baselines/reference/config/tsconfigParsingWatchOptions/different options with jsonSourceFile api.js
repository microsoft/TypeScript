Input:: {
 "watchOptions": {
  "watchFile": "UseFsEvents"
 }
}
Result: WatchOptions::
{
 "watchFile": 4
}
Result: Errors::

Input:: {
 "watchOptions": {
  "watchDirectory": "UseFsEvents"
 }
}
Result: WatchOptions::
{
 "watchDirectory": 0
}
Result: Errors::

Input:: {
 "watchOptions": {
  "fallbackPolling": "DynamicPriority"
 }
}
Result: WatchOptions::
{
 "fallbackPolling": 2
}
Result: Errors::

Input:: {
 "watchOptions": {
  "synchronousWatchDirectory": true
 }
}
Result: WatchOptions::
{
 "synchronousWatchDirectory": true
}
Result: Errors::

Input:: {
 "watchOptions": {
  "excludeDirectories": [
   "**/temp"
  ]
 }
}
Result: WatchOptions::
{
 "excludeDirectories": [
  "/**/temp"
 ]
}
Result: Errors::

Input:: {
 "watchOptions": {
  "excludeFiles": [
   "**/temp/*.ts"
  ]
 }
}
Result: WatchOptions::
{
 "excludeFiles": [
  "/**/temp/*.ts"
 ]
}
Result: Errors::

Input:: {
 "watchOptions": {
  "excludeDirectories": [
   "**/../*"
  ]
 }
}
Result: WatchOptions::
{
 "excludeDirectories": []
}
Result: Errors::
[96mtsconfig.json[0m:[93m1[0m:[93m40[0m - [91merror[0m[90m TS5065: [0mFile specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '**/../*'.

[7m1[0m {"watchOptions":{"excludeDirectories":["**/../*"]}}
[7m [0m [91m                                       ~~~~~~~~~[0m

Input:: {
 "watchOptions": {
  "excludeFiles": [
   "**/../*"
  ]
 }
}
Result: WatchOptions::
{
 "excludeFiles": []
}
Result: Errors::
[96mtsconfig.json[0m:[93m1[0m:[93m34[0m - [91merror[0m[90m TS5065: [0mFile specification cannot contain a parent directory ('..') that appears after a recursive directory wildcard ('**'): '**/../*'.

[7m1[0m {"watchOptions":{"excludeFiles":["**/../*"]}}
[7m [0m [91m                                 ~~~~~~~~~[0m
