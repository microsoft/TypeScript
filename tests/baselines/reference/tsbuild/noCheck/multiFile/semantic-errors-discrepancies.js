5:: no-change-run
Clean build will have check pending since it didnt type check
Incremental build has typechecked before this so wont have checkPending
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "root": [
    "./a.ts",
    "./b.ts"
  ],
  "version": "FakeTSVersion"
}
15:: no-change-run
Clean build will have check pending since it didnt type check
Incremental build has typechecked before this so wont have checkPending
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "root": [
    "./a.ts",
    "./b.ts",
    "./c.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "root": [
    "./a.ts",
    "./b.ts",
    "./c.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion"
}