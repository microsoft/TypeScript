5:: Introduce error
DtsSignature of ts files: Incremental build have dts signature for ts files from emit so its not d.ts or same as file version
Incremental signature is neither dts signature nor file version for File:: ./a.ts
Incremental:: {
  "original": {
    "version": "2464268576-const a = \"hello",
    "signature": "-5460434953-declare const a = \"hello\";\n",
    "affectsGlobalScope": true
  },
  "version": "2464268576-const a = \"hello",
  "signature": "-5460434953-declare const a = \"hello\";\n",
  "affectsGlobalScope": true
}
Clean:: {
  "original": {
    "version": "2464268576-const a = \"hello",
    "signature": false,
    "affectsGlobalScope": true
  },
  "version": "2464268576-const a = \"hello",
  "affectsGlobalScope": true
}
Dts Signature:: undefined
7:: no-change-run
DtsSignature of files: Incremental build have dts signature for ts files from emit so its not d.ts or same as file version
Incremental signature is neither dts signature nor file version for File:: ./a.ts
Incremental:: {
  "original": {
    "version": "2464268576-const a = \"hello",
    "signature": "-5460434953-declare const a = \"hello\";\n",
    "affectsGlobalScope": true
  },
  "version": "2464268576-const a = \"hello",
  "signature": "-5460434953-declare const a = \"hello\";\n",
  "affectsGlobalScope": true
}
Clean:: {
  "original": {
    "version": "2464268576-const a = \"hello",
    "signature": false,
    "affectsGlobalScope": true
  },
  "version": "2464268576-const a = \"hello",
  "affectsGlobalScope": true
}
Dts Signature:: undefined