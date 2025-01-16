0:: Make non incremental build with change in file that doesnt affect dts
Clean build is non incremental so it will have non incremental tsbuildInfo for third project
The incremental build does not build third so will only update timestamps for third tsbuildInfo and hence its from incremental build before
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/solution/third/thirdjs/output/third-output.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "root": [
    "../../third_part1.ts"
  ],
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../../../../../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "../../../first/bin/first-output.d.ts": "-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n",
    "../../../2/second-output.d.ts": "-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n",
    "../../third_part1.ts": "7305100057-var c = new C();\nc.doSomething();\n"
  },
  "root": [
    [
      4,
      "../../third_part1.ts"
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true,
    "outFile": "./third-output.js",
    "removeComments": true,
    "skipDefaultLibCheck": true,
    "sourceMap": true,
    "strict": false,
    "target": 1
  },
  "version": "FakeTSVersion"
}
Incremental and clean do not match:: FileInfos:: File:: /home/src/workspaces/solution/third/thirdjs/output/third-output.tsbuildinfo.readable.baseline.txt
CleanBuild:

IncrementalBuild:
{
  "../../../../../tslibs/ts/lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
  "../../../first/bin/first-output.d.ts": "-15957783529-interface TheFirst {\n    none: any;\n}\ndeclare const s = \"Hello, world\";\ninterface NoJsForHereEither {\n    none: any;\n}\ndeclare function f(): string;\n",
  "../../../2/second-output.d.ts": "-2513601205-declare namespace N {\n}\ndeclare namespace N {\n}\ndeclare class C {\n    doSomething(): void;\n}\n",
  "../../third_part1.ts": "7305100057-var c = new C();\nc.doSomething();\n"
}