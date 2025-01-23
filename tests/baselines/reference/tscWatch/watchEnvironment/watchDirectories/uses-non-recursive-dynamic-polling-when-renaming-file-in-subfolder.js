currentDirectory:: /a/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/a/username/projects/project/src/file1.ts] Inode:: 6


//// [/a/username/projects/project/tsconfig.json] Inode:: 7
{
  "watchOptions": {
    "synchronousWatchDirectory": true
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 13
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/a/username/projects/project/src/file1.js] Inode:: 111



FsWatches::
/a/username/projects/project/src/file1.ts: *new*
  {"inode":6}
/a/username/projects/project/tsconfig.json: *new*
  {"inode":7}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"inode":13}

Timeout callback:: count: 1
1: pollPollingIntervalQueue *new*

Program root files: [
  "/a/username/projects/project/src/file1.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/a/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/a/username/projects/project/src/file1.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/a/username/projects/project/src/file1.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/a/username/projects/project/src/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Rename file1 to file2

Input::
//// [/a/username/projects/project/src/file2.ts] Inode:: 112


//// [/a/username/projects/project/src/file1.ts] deleted

Output::
sysLog:: /a/username/projects/project/src/file1.ts:: Changing watcher to MissingFileSystemEntryWatcher


PolledWatches::
/a/username/projects/project/src/file1.ts: *new*
  {"pollingInterval":250}

FsWatches::
/a/username/projects/project/tsconfig.json:
  {"inode":7}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":13}

FsWatches *deleted*::
/a/username/projects/project/src/file1.ts:
  {"inode":6}

Timeout callback:: count: 2
1: pollPollingIntervalQueue
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
1: pollPollingIntervalQueue
2: timerToUpdateProgram

After running Timeout callback:: count: 3

Timeout callback:: count: 3
2: timerToUpdateProgram *deleted*
3: timerToUpdateProgram *new*
4: pollLowPollingIntervalQueue *new*
5: pollPollingIntervalQueue *new*

Before running Timeout callback:: count: 3
3: timerToUpdateProgram
4: pollLowPollingIntervalQueue
5: pollPollingIntervalQueue

Host is moving to new time
After running Timeout callback:: count: 3
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/a/username/projects/project/src/file2.js] Inode:: 113



PolledWatches *deleted*::
/a/username/projects/project/src/file1.ts:
  {"pollingInterval":250}

FsWatches::
/a/username/projects/project/src/file2.ts: *new*
  {"inode":112}
/a/username/projects/project/tsconfig.json:
  {"inode":7}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":13}

Timeout callback:: count: 3
6: timerToUpdateProgram *new*
7: pollLowPollingIntervalQueue *new*
8: pollPollingIntervalQueue *new*


Program root files: [
  "/a/username/projects/project/src/file2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/a/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/a/username/projects/project/src/file2.ts

Semantic diagnostics in builder refreshed for::
/a/username/projects/project/src/file2.ts

Shape signatures in builder refreshed for::
/a/username/projects/project/src/file2.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
