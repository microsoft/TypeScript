currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true
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
/// <reference no-default-lib="true"/>
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


//// [/home/src/workspaces/project/MessageablePerson.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Messageable = function () {
    return /** @class */ (function () {
        function MessageableClass() {
            this.message = 'hello';
        }
        return MessageableClass;
    }());
};
var wrapper = function () { return Messageable(); };


//// [/home/src/workspaces/project/MessageablePerson.d.ts]
declare const wrapper: () => {
    new (): {
        message: string;
    };
};
type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
export default MessageablePerson;


//// [/home/src/workspaces/project/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logMessage(person) {
    console.log(person.message);
}


//// [/home/src/workspaces/project/main.d.ts]
export {};


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./messageableperson.ts","./main.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;","affectsGlobalScope":true},{"version":"31173349369-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;","signature":"-21006966954-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n"},{"version":"4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}","signature":"-3531856636-export {};\n"}],"root":[2,3],"options":{"declaration":true},"referencedMap":[[3,1]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./messageableperson.ts",
    "./main.ts"
  ],
  "fileIdsList": [
    [
      "./messageableperson.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;",
        "affectsGlobalScope": true
      },
      "version": "5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;",
      "signature": "5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;",
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
    "declaration": true
  },
  "referencedMap": {
    "./main.ts": [
      "./messageableperson.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1619
}


exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --incremental
Output::



exitCode:: ExitStatus.Success

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
[96mmain.ts[0m:[93m3[0m:[93m25[0m - [91merror[0m[90m TS2445: [0mProperty 'message' is protected and only accessible within class 'MessageableClass' and its subclasses.

[7m3[0m     console.log( person.message );
[7m [0m [91m                        ~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m6[0m:[93m7[0m - [91merror[0m[90m TS4094: [0mProperty 'message' of exported anonymous class type may not be private or protected.

[7m6[0m const wrapper = () => Messageable();
[7m [0m [91m      ~~~~~~~[0m

  [96mMessageablePerson.ts[0m:[93m6[0m:[93m7[0m
    [7m6[0m const wrapper = () => Messageable();
    [7m [0m [96m      ~~~~~~~[0m
    Add a type annotation to the variable wrapper.


Found 2 errors in 2 files.

Errors  Files
     1  main.ts[90m:3[0m
     1  MessageablePerson.ts[90m:6[0m


//// [/home/src/workspaces/project/MessageablePerson.js] file written with same contents
//// [/home/src/workspaces/project/main.js] file written with same contents
//// [/home/src/workspaces/project/main.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./messageableperson.ts","./main.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;","affectsGlobalScope":true},{"version":"3462418372-const Messageable = () => {\n    return class MessageableClass {\n        protected message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;","signature":"-6547480893-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n(116,7)Error4094: Property 'message' of exported anonymous class type may not be private or protected."},{"version":"4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}","signature":"-3531856636-export {};\n"}],"root":[2,3],"options":{"declaration":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"start":131,"length":7,"messageText":"Property 'message' is protected and only accessible within class 'MessageableClass' and its subclasses.","category":1,"code":2445}]]],"emitDiagnosticsPerFile":[[2,[{"start":116,"length":7,"messageText":"Property 'message' of exported anonymous class type may not be private or protected.","category":1,"code":4094,"relatedInformation":[{"start":116,"length":7,"messageText":"Add a type annotation to the variable wrapper.","category":1,"code":9027}]}]]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./messageableperson.ts",
    "./main.ts"
  ],
  "fileIdsList": [
    [
      "./messageableperson.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;",
        "affectsGlobalScope": true
      },
      "version": "5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;",
      "signature": "5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;",
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
    "declaration": true
  },
  "referencedMap": {
    "./main.ts": [
      "./messageableperson.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./main.ts",
      [
        {
          "start": 131,
          "length": 7,
          "messageText": "Property 'message' is protected and only accessible within class 'MessageableClass' and its subclasses.",
          "category": 1,
          "code": 2445
        }
      ]
    ]
  ],
  "emitDiagnosticsPerFile": [
    [
      "./messageableperson.ts",
      [
        {
          "start": 116,
          "length": 7,
          "messageText": "Property 'message' of exported anonymous class type may not be private or protected.",
          "category": 1,
          "code": 4094,
          "relatedInformation": [
            {
              "start": 116,
              "length": 7,
              "messageText": "Add a type annotation to the variable wrapper.",
              "category": 1,
              "code": 9027
            }
          ]
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 2249
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --incremental
Output::
[96mmain.ts[0m:[93m3[0m:[93m25[0m - [91merror[0m[90m TS2445: [0mProperty 'message' is protected and only accessible within class 'MessageableClass' and its subclasses.

[7m3[0m     console.log( person.message );
[7m [0m [91m                        ~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m6[0m:[93m7[0m - [91merror[0m[90m TS4094: [0mProperty 'message' of exported anonymous class type may not be private or protected.

[7m6[0m const wrapper = () => Messageable();
[7m [0m [91m      ~~~~~~~[0m

  [96mMessageablePerson.ts[0m:[93m6[0m:[93m7[0m
    [7m6[0m const wrapper = () => Messageable();
    [7m [0m [96m      ~~~~~~~[0m
    Add a type annotation to the variable wrapper.


Found 2 errors in 2 files.

Errors  Files
     1  main.ts[90m:3[0m
     1  MessageablePerson.ts[90m:6[0m



exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

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


//// [/home/src/workspaces/project/MessageablePerson.js] file written with same contents
//// [/home/src/workspaces/project/MessageablePerson.d.ts] file written with same contents
//// [/home/src/workspaces/project/main.js] file written with same contents
//// [/home/src/workspaces/project/main.d.ts] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"fileNames":["../../tslibs/ts/lib/lib.d.ts","./messageableperson.ts","./main.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;","affectsGlobalScope":true},{"version":"31173349369-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;","signature":"-21006966954-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n"},{"version":"4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}","signature":"-3531856636-export {};\n"}],"root":[2,3],"options":{"declaration":true},"referencedMap":[[3,1]],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../tslibs/ts/lib/lib.d.ts",
    "./messageableperson.ts",
    "./main.ts"
  ],
  "fileIdsList": [
    [
      "./messageableperson.ts"
    ]
  ],
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;",
        "affectsGlobalScope": true
      },
      "version": "5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;",
      "signature": "5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;",
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
    "declaration": true
  },
  "referencedMap": {
    "./main.ts": [
      "./messageableperson.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1619
}


exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --incremental
Output::



exitCode:: ExitStatus.Success
