5:: Introduce error
DtsSignature of ts files: Incremental build have dts signature for ts files from emit so its not d.ts or same as file version
Incremental signature is neither dts signature nor file version for File:: ./a.ts
Incremental:: {
  "original": {
    "version": "-14000546910-export const a = \"hello",
    "signature": "-2692717255-export declare const a = \"hello\";\n"
  },
  "version": "-14000546910-export const a = \"hello",
  "signature": "-2692717255-export declare const a = \"hello\";\n"
}
Clean:: {
  "original": {
    "version": "-14000546910-export const a = \"hello",
    "signature": false
  },
  "version": "-14000546910-export const a = \"hello"
}
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version for File:: ./b.ts
Incremental:: {
  "original": {
    "version": "-13368947479-export const b = 10;",
    "signature": "-3829150557-export declare const b = 10;\n"
  },
  "version": "-13368947479-export const b = 10;",
  "signature": "-3829150557-export declare const b = 10;\n"
}
Clean:: {
  "original": {
    "version": "-13368947479-export const b = 10;",
    "signature": false
  },
  "version": "-13368947479-export const b = 10;"
}
Dts Signature:: undefined
7:: no-change-run
DtsSignature of files: Incremental build have dts signature for ts files from emit so its not d.ts or same as file version
Incremental signature is neither dts signature nor file version for File:: ./a.ts
Incremental:: {
  "original": {
    "version": "-14000546910-export const a = \"hello",
    "signature": "-2692717255-export declare const a = \"hello\";\n"
  },
  "version": "-14000546910-export const a = \"hello",
  "signature": "-2692717255-export declare const a = \"hello\";\n"
}
Clean:: {
  "original": {
    "version": "-14000546910-export const a = \"hello",
    "signature": false
  },
  "version": "-14000546910-export const a = \"hello"
}
Dts Signature:: undefined
Incremental signature is neither dts signature nor file version for File:: ./b.ts
Incremental:: {
  "original": {
    "version": "-13368947479-export const b = 10;",
    "signature": "-3829150557-export declare const b = 10;\n"
  },
  "version": "-13368947479-export const b = 10;",
  "signature": "-3829150557-export declare const b = 10;\n"
}
Clean:: {
  "original": {
    "version": "-13368947479-export const b = 10;",
    "signature": false
  },
  "version": "-13368947479-export const b = 10;"
}
Dts Signature:: undefined