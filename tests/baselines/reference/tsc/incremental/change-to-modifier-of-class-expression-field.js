currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "declaration": false
  }
}

//// [/home/src/workspaces/project/main.ts]
import MessageablePerson from './MessageablePerson.js';
function logMessage( person: MessageablePerson ) {
    console.log( person.message );
}

//// [/home/src/workspaces/project/MessageablePerson.ts]
const Messageable = () => {
    return class MessageableClass {
        public message = 'hello';
    }
};
const wrapper = () => Messageable();
type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
export default MessageablePerson;

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
declare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;


/home/src/tslibs/TS/Lib/tsc.js --incremental
Output::
[96mMessageablePerson.ts[0m:[93m7[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'InstanceType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                         ~~~~~~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m7[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'ReturnType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                                      ~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: MessageablePerson.ts[90m:7[0m



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/home/src/workspaces/project/MessageablePerson.js]
const Messageable = () => {
    return class MessageableClass {
        message = 'hello';
    };
};
const wrapper = () => Messageable();
export {};


//// [/home/src/workspaces/project/main.js]
function logMessage(person) {
    console.log(person.message);
}
export {};


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./messageableperson.ts","./main.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"31173349369-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;","4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}"],"root":[2,3],"options":{"declaration":false},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[2,[{"start":169,"length":12,"messageText":"Cannot find name 'InstanceType'.","category":1,"code":2304},{"start":182,"length":10,"messageText":"Cannot find name 'ReturnType'.","category":1,"code":2304}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "./messageableperson.ts",
    "./main.ts"
  ],
  "fileIdsList": [
    [
      "./messageableperson.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./messageableperson.ts": {
      "version": "31173349369-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;",
      "signature": "31173349369-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;"
    },
    "./main.ts": {
      "version": "4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}",
      "signature": "4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}"
    }
  },
  "root": [
    [
      2,
      "./messageableperson.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "options": {
    "declaration": false
  },
  "referencedMap": {
    "./main.ts": [
      "./messageableperson.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./messageableperson.ts",
      [
        {
          "start": 169,
          "length": 12,
          "messageText": "Cannot find name 'InstanceType'.",
          "category": 1,
          "code": 2304
        },
        {
          "start": 182,
          "length": 10,
          "messageText": "Cannot find name 'ReturnType'.",
          "category": 1,
          "code": 2304
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1324
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --incremental
Output::
[96mMessageablePerson.ts[0m:[93m7[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'InstanceType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                         ~~~~~~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m7[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'ReturnType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                                      ~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: MessageablePerson.ts[90m:7[0m




exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: modify public to protected

Input::
//// [/home/src/workspaces/project/MessageablePerson.ts]
const Messageable = () => {
    return class MessageableClass {
        protected message = 'hello';
    }
};
const wrapper = () => Messageable();
type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
export default MessageablePerson;


/home/src/tslibs/TS/Lib/tsc.js --incremental
Output::
[96mMessageablePerson.ts[0m:[93m7[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'InstanceType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                         ~~~~~~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m7[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'ReturnType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                                      ~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: MessageablePerson.ts[90m:7[0m



//// [/home/src/workspaces/project/MessageablePerson.js] file written with same contents
//// [/home/src/workspaces/project/main.js] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./messageableperson.ts","./main.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"3462418372-const Messageable = () => {\n    return class MessageableClass {\n        protected message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;","signature":"-6547480893-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n(116,7)Error4094: Property 'message' of exported anonymous class type may not be private or protected."},{"version":"4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}","signature":"-3531856636-export {};\n"}],"root":[2,3],"options":{"declaration":false},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[2,[{"start":172,"length":12,"messageText":"Cannot find name 'InstanceType'.","category":1,"code":2304},{"start":185,"length":10,"messageText":"Cannot find name 'ReturnType'.","category":1,"code":2304}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "./messageableperson.ts",
    "./main.ts"
  ],
  "fileIdsList": [
    [
      "./messageableperson.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./messageableperson.ts": {
      "original": {
        "version": "3462418372-const Messageable = () => {\n    return class MessageableClass {\n        protected message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;",
        "signature": "-6547480893-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n(116,7)Error4094: Property 'message' of exported anonymous class type may not be private or protected."
      },
      "version": "3462418372-const Messageable = () => {\n    return class MessageableClass {\n        protected message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;",
      "signature": "-6547480893-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n(116,7)Error4094: Property 'message' of exported anonymous class type may not be private or protected."
    },
    "./main.ts": {
      "original": {
        "version": "4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}",
        "signature": "-3531856636-export {};\n"
      },
      "version": "4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      2,
      "./messageableperson.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "options": {
    "declaration": false
  },
  "referencedMap": {
    "./main.ts": [
      "./messageableperson.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./messageableperson.ts",
      [
        {
          "start": 172,
          "length": 12,
          "messageText": "Cannot find name 'InstanceType'.",
          "category": 1,
          "code": 2304
        },
        {
          "start": 185,
          "length": 10,
          "messageText": "Cannot find name 'ReturnType'.",
          "category": 1,
          "code": 2304
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1706
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --incremental
Output::
[96mMessageablePerson.ts[0m:[93m7[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'InstanceType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                         ~~~~~~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m7[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'ReturnType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                                      ~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: MessageablePerson.ts[90m:7[0m




exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: modify protected to public

Input::
//// [/home/src/workspaces/project/MessageablePerson.ts]
const Messageable = () => {
    return class MessageableClass {
        public message = 'hello';
    }
};
const wrapper = () => Messageable();
type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
export default MessageablePerson;


/home/src/tslibs/TS/Lib/tsc.js --incremental
Output::
[96mMessageablePerson.ts[0m:[93m7[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'InstanceType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                         ~~~~~~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m7[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'ReturnType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                                      ~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: MessageablePerson.ts[90m:7[0m



//// [/home/src/workspaces/project/MessageablePerson.js] file written with same contents
//// [/home/src/workspaces/project/main.js] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.es2025.full.d.ts","./messageableperson.ts","./main.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"31173349369-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;","signature":"-21006966954-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n"},{"version":"4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}","signature":"-3531856636-export {};\n"}],"root":[2,3],"options":{"declaration":false},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[2,[{"start":169,"length":12,"messageText":"Cannot find name 'InstanceType'.","category":1,"code":2304},{"start":182,"length":10,"messageText":"Cannot find name 'ReturnType'.","category":1,"code":2304}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.es2025.full.d.ts",
    "./messageableperson.ts",
    "./main.ts"
  ],
  "fileIdsList": [
    [
      "./messageableperson.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.es2025.full.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./messageableperson.ts": {
      "original": {
        "version": "31173349369-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;",
        "signature": "-21006966954-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n"
      },
      "version": "31173349369-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;",
      "signature": "-21006966954-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n"
    },
    "./main.ts": {
      "original": {
        "version": "4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}",
        "signature": "-3531856636-export {};\n"
      },
      "version": "4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}",
      "signature": "-3531856636-export {};\n"
    }
  },
  "root": [
    [
      2,
      "./messageableperson.ts"
    ],
    [
      3,
      "./main.ts"
    ]
  ],
  "options": {
    "declaration": false
  },
  "referencedMap": {
    "./main.ts": [
      "./messageableperson.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./messageableperson.ts",
      [
        {
          "start": 169,
          "length": 12,
          "messageText": "Cannot find name 'InstanceType'.",
          "category": 1,
          "code": 2304
        },
        {
          "start": 182,
          "length": 10,
          "messageText": "Cannot find name 'ReturnType'.",
          "category": 1,
          "code": 2304
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 1603
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --incremental
Output::
[96mMessageablePerson.ts[0m:[93m7[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'InstanceType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                         ~~~~~~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m7[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'ReturnType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                                      ~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: MessageablePerson.ts[90m:7[0m




exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
