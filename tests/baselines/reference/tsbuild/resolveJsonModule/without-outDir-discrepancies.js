0:: no-change-run
Incremental build does not change and has .ts as signature so exports has all imported modules/referenced files
Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/tsconfig_withfiles.tsbuildinfo.readable.baseline.txt
Incremental: {
  "./src/index.ts": [
    "./src/hello.json"
  ]
}
Clean: {}