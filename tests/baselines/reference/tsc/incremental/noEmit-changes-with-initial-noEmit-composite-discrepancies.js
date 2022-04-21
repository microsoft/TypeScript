0:: No Change run with emit
Incremental build does not change and has .ts as signature so exports has all imported modules/referenced files
Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed
*** Supplied descripency explaination but didnt file any difference
2:: Fix error and no emit
Incremental build does not change and has .ts as signature so exports has all imported modules/referenced files
Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed
Incremental and clean size of maps do not match:: exportedModulesMap:: File:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt
Incremental: {
  "./src/directuse.ts": [
    "./src/indirectclass.ts"
  ],
  "./src/indirectclass.ts": [
    "./src/class.ts"
  ],
  "./src/indirectuse.ts": [
    "./src/indirectclass.ts"
  ]
}
Clean: {
  "./src/indirectclass.ts": [
    "./src/class.ts"
  ]
}
3:: No Change run with emit
Incremental build does not change and has .ts as signature so exports has all imported modules/referenced files
Clean build always uses d.ts for signature for testing thus does not contain non exported modules/referenced files that arent needed
*** Supplied descripency explaination but didnt file any difference