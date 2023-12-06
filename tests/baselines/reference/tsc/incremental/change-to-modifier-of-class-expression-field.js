currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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

//// [/src/project/main.ts]
import MessageablePerson from './MessageablePerson.js';
function logMessage( person: MessageablePerson ) {
    console.log( person.message );
}

//// [/src/project/MessageablePerson.ts]
const Messageable = () => {
    return class MessageableClass {
        public message = 'hello';
    }
};
const wrapper = () => Messageable();
type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
export default MessageablePerson;

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "declaration": false
  }
}



Output::
/lib/tsc -p src/project --incremental
exitCode:: ExitStatus.Success


//// [/src/project/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logMessage(person) {
    console.log(person.message);
}


//// [/src/project/MessageablePerson.js]
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


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./messageableperson.ts","./main.ts"],"fileInfos":[{"version":"5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;","affectsGlobalScope":true},"31173349369-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;","4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}"],"root":[2,3],"options":{"declaration":false},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,3,2]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./messageableperson.ts",
      "./main.ts"
    ],
    "fileNamesList": [
      [
        "./messageableperson.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;",
          "affectsGlobalScope": true
        },
        "version": "5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;",
        "signature": "5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;",
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
    "exportedModulesMap": {
      "./main.ts": [
        "./messageableperson.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./main.ts",
      "./messageableperson.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1409
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p src/project --incremental
exitCode:: ExitStatus.Success




Change:: modify public to protected
Input::
//// [/src/project/MessageablePerson.ts]
const Messageable = () => {
    return class MessageableClass {
        protected message = 'hello';
    }
};
const wrapper = () => Messageable();
type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
export default MessageablePerson;



Output::
/lib/tsc -p src/project --incremental
[96msrc/project/main.ts[0m:[93m3[0m:[93m25[0m - [91merror[0m[90m TS2445: [0mProperty 'message' is protected and only accessible within class 'MessageableClass' and its subclasses.

[7m3[0m     console.log( person.message );
[7m [0m [91m                        ~~~~~~~[0m


Found 1 error in src/project/main.ts[90m:3[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/main.js] file written with same contents
//// [/src/project/MessageablePerson.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./messageableperson.ts","./main.ts"],"fileInfos":[{"version":"5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;","affectsGlobalScope":true},{"version":"3462418372-const Messageable = () => {\n    return class MessageableClass {\n        protected message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;","signature":"-21450256696-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n(116,7)Error4094: Property 'message' of exported class expression may not be private or protected."},{"version":"4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}","signature":"-3531856636-export {};\n"}],"root":[2,3],"options":{"declaration":false},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[3,[{"file":"./main.ts","start":131,"length":7,"messageText":"Property 'message' is protected and only accessible within class 'MessageableClass' and its subclasses.","category":1,"code":2445}]],2]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./messageableperson.ts",
      "./main.ts"
    ],
    "fileNamesList": [
      [
        "./messageableperson.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
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
          "signature": "-21450256696-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n(116,7)Error4094: Property 'message' of exported class expression may not be private or protected."
        },
        "version": "3462418372-const Messageable = () => {\n    return class MessageableClass {\n        protected message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;",
        "signature": "-21450256696-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n(116,7)Error4094: Property 'message' of exported class expression may not be private or protected."
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
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./main.ts",
        [
          {
            "file": "./main.ts",
            "start": 131,
            "length": 7,
            "messageText": "Property 'message' is protected and only accessible within class 'MessageableClass' and its subclasses.",
            "category": 1,
            "code": 2445
          }
        ]
      ],
      "./messageableperson.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1976
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p src/project --incremental
[96msrc/project/main.ts[0m:[93m3[0m:[93m25[0m - [91merror[0m[90m TS2445: [0mProperty 'message' is protected and only accessible within class 'MessageableClass' and its subclasses.

[7m3[0m     console.log( person.message );
[7m [0m [91m                        ~~~~~~~[0m


Found 1 error in src/project/main.ts[90m:3[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated




Change:: modify protected to public
Input::
//// [/src/project/MessageablePerson.ts]
const Messageable = () => {
    return class MessageableClass {
        public message = 'hello';
    }
};
const wrapper = () => Messageable();
type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
export default MessageablePerson;



Output::
/lib/tsc -p src/project --incremental
exitCode:: ExitStatus.Success


//// [/src/project/main.js] file written with same contents
//// [/src/project/MessageablePerson.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./messageableperson.ts","./main.ts"],"fileInfos":[{"version":"5700251342-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;\ntype InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;","affectsGlobalScope":true},{"version":"31173349369-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;","signature":"-21006966954-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n"},{"version":"4191603667-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}","signature":"-3531856636-export {};\n"}],"root":[2,3],"options":{"declaration":false},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,2]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./messageableperson.ts",
      "./main.ts"
    ],
    "fileNamesList": [
      [
        "./messageableperson.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
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
      "declaration": false
    },
    "referencedMap": {
      "./main.ts": [
        "./messageableperson.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./main.ts",
      "./messageableperson.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1683
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p src/project --incremental
exitCode:: ExitStatus.Success


