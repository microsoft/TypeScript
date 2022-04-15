0:: no-change-run
Incremental build does not change and has .ts as signature so exports has all imported modules/referenced files
Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "./src/anotherfilewithsamereferenes.ts": [
    "./src/filepresent.ts",
    "./src/filenotfound.ts"
  ],
  "./src/main.ts": [
    "./src/filepresent.ts",
    "./src/filenotfound.ts"
  ]
}
Clean: {}