5:: no-change-run
Clean build will have check pending since it didnt type check
Incremental build has typechecked before this so wont have checkPending
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "root": [
    "./project/a.ts",
    "./project/b.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "root": [
    "./project/a.ts",
    "./project/b.ts"
  ],
  "version": "FakeTSVersion"
}
15:: no-change-run
Clean build will have check pending since it didnt type check
Incremental build has typechecked before this so wont have checkPending
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/outfile.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "root": [
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts"
  ],
  "checkPending": true,
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "root": [
    "./project/a.ts",
    "./project/b.ts",
    "./project/c.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion"
}