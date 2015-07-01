echo off
IF NOT EXIST scripts\bisect.cmd GOTO :wrongdir
IF "%1" == "" GOTO :usage
IF "%1" == "GO" GOTO :run
GOTO :copy

:usage
echo Usage: bisect GoodCommit BadCommit test.ts compiles
echo Usage: bisect GoodCommit BadCommit test.ts emits test.js "var x = 3"
GOTO :eof

:copy
copy scripts\bisect.cmd scripts\bisect-fresh.cmd
scripts\bisect-fresh GO %*
GOTO :eof

:run 
call jake local
node built/local/tsc.js scripts/bisect-test.ts --module commonjs
git bisect start %2 %3
git bisect run node scripts/bisect-test.js %4 %5 %6 %7
del scripts\bisect-test.js
del scripts\bisect-fresh.cmd
GOTO :eof

:wrongdir
@echo Run this file from the repo folder, not the scripts folder
GOTO :eof

:eof