//// [/lib/incremental-declaration-doesnt-changeOutput.txt]
/lib/tsc --incremental --p src/project --tsBuildInfoFile src/project/.tsbuildinfo
exitCode:: 0


//// [/src/project/.tsbuildinfo] file written with same contents
//// [/src/project/src/main.js] file written with same contents
