currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.d.ts] *new* 
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
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
//// [/home/src/workspaces/project/MessageablePerson.ts] *new* 
const Messageable = () => {
    return class MessageableClass {
        public message = 'hello';
    }
};
const wrapper = () => Messageable();
type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
export default MessageablePerson;
//// [/home/src/workspaces/project/main.ts] *new* 
import MessageablePerson from './MessageablePerson.js';
function logMessage( person: MessageablePerson ) {
    console.log( person.message );
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{ 
    "compilerOptions": { 
        "module": "esnext"
    }
}

tsgo --incremental
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mMessageablePerson.ts[0m:[93m7[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'InstanceType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                         ~~~~~~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m7[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'ReturnType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                                      ~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: MessageablePerson.ts[90m:7[0m

//// [/home/src/tslibs/TS/Lib/lib.es2024.full.d.ts] *Lib*
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
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/project/MessageablePerson.js] *new* 
const Messageable = () => {
    return class MessageableClass {
        message = 'hello';
    };
};
const wrapper = () => Messageable();
export {};

//// [/home/src/workspaces/project/main.js] *new* 
function logMessage(person) {
    console.log(person.message);
}
export {};

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2024.full.d.ts","./MessageablePerson.ts","./main.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"500cfddf7f97c595e46579b9b5afc9bd-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;","f1d6119c9df9ff1b48604c0e5c5f624f-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}"],"fileIdsList":[[2]],"options":{"module":99},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[2,[{"pos":169,"end":181,"code":2304,"category":1,"messageKey":"Cannot_find_name_0_2304","messageArgs":["InstanceType"]},{"pos":182,"end":192,"code":2304,"category":1,"messageKey":"Cannot_find_name_0_2304","messageArgs":["ReturnType"]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./MessageablePerson.ts",
        "./main.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2024.full.d.ts",
    "./MessageablePerson.ts",
    "./main.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2024.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./MessageablePerson.ts",
      "version": "500cfddf7f97c595e46579b9b5afc9bd-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;",
      "signature": "500cfddf7f97c595e46579b9b5afc9bd-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./main.ts",
      "version": "f1d6119c9df9ff1b48604c0e5c5f624f-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}",
      "signature": "f1d6119c9df9ff1b48604c0e5c5f624f-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./MessageablePerson.ts"
    ]
  ],
  "options": {
    "module": 99
  },
  "referencedMap": {
    "./main.ts": [
      "./MessageablePerson.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./MessageablePerson.ts",
      [
        {
          "pos": 169,
          "end": 181,
          "code": 2304,
          "category": 1,
          "messageKey": "Cannot_find_name_0_2304",
          "messageArgs": [
            "InstanceType"
          ]
        },
        {
          "pos": 182,
          "end": 192,
          "code": 2304,
          "category": 1,
          "messageKey": "Cannot_find_name_0_2304",
          "messageArgs": [
            "ReturnType"
          ]
        }
      ]
    ]
  ],
  "size": 1706
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2024.full.d.ts
*refresh*    /home/src/workspaces/project/MessageablePerson.ts
*refresh*    /home/src/workspaces/project/main.ts
Signatures::


Edit [0]:: no change

tsgo --incremental
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mMessageablePerson.ts[0m:[93m7[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'InstanceType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                         ~~~~~~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m7[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'ReturnType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                                      ~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: MessageablePerson.ts[90m:7[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: modify public to protected
//// [/home/src/workspaces/project/MessageablePerson.ts] *modified* 
const Messageable = () => {
    return class MessageableClass {
        protected message = 'hello';
    }
};
const wrapper = () => Messageable();
type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
export default MessageablePerson;

tsgo --incremental
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mMessageablePerson.ts[0m:[93m7[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'InstanceType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                         ~~~~~~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m7[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'ReturnType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                                      ~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: MessageablePerson.ts[90m:7[0m

//// [/home/src/workspaces/project/MessageablePerson.js] *rewrite with same content*
//// [/home/src/workspaces/project/main.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2024.full.d.ts","./MessageablePerson.ts","./main.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"fc3bcee26e986c769691717bfbe49525-const Messageable = () => {\n    return class MessageableClass {\n        protected message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;","signature":"9bca542f83dba4822510bd12bc5e9db9-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n\n(116,7): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\nmessage\n\n(116,7): error9027: Add_a_type_annotation_to_the_variable_0_9027\nwrapper\n","impliedNodeFormat":1},{"version":"f1d6119c9df9ff1b48604c0e5c5f624f-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"module":99},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[2,[{"pos":172,"end":184,"code":2304,"category":1,"messageKey":"Cannot_find_name_0_2304","messageArgs":["InstanceType"]},{"pos":185,"end":195,"code":2304,"category":1,"messageKey":"Cannot_find_name_0_2304","messageArgs":["ReturnType"]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./MessageablePerson.ts",
        "./main.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2024.full.d.ts",
    "./MessageablePerson.ts",
    "./main.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2024.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./MessageablePerson.ts",
      "version": "fc3bcee26e986c769691717bfbe49525-const Messageable = () => {\n    return class MessageableClass {\n        protected message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;",
      "signature": "9bca542f83dba4822510bd12bc5e9db9-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n\n(116,7): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\nmessage\n\n(116,7): error9027: Add_a_type_annotation_to_the_variable_0_9027\nwrapper\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fc3bcee26e986c769691717bfbe49525-const Messageable = () => {\n    return class MessageableClass {\n        protected message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;",
        "signature": "9bca542f83dba4822510bd12bc5e9db9-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n\n(116,7): error4094: Property_0_of_exported_anonymous_class_type_may_not_be_private_or_protected_4094\nmessage\n\n(116,7): error9027: Add_a_type_annotation_to_the_variable_0_9027\nwrapper\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./main.ts",
      "version": "f1d6119c9df9ff1b48604c0e5c5f624f-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f1d6119c9df9ff1b48604c0e5c5f624f-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./MessageablePerson.ts"
    ]
  ],
  "options": {
    "module": 99
  },
  "referencedMap": {
    "./main.ts": [
      "./MessageablePerson.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./MessageablePerson.ts",
      [
        {
          "pos": 172,
          "end": 184,
          "code": 2304,
          "category": 1,
          "messageKey": "Cannot_find_name_0_2304",
          "messageArgs": [
            "InstanceType"
          ]
        },
        {
          "pos": 185,
          "end": 195,
          "code": 2304,
          "category": 1,
          "messageKey": "Cannot_find_name_0_2304",
          "messageArgs": [
            "ReturnType"
          ]
        }
      ]
    ]
  ],
  "size": 2263
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/MessageablePerson.ts
*refresh*    /home/src/workspaces/project/main.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/MessageablePerson.ts
(computed .d.ts) /home/src/workspaces/project/main.ts


Edit [2]:: no change

tsgo --incremental
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mMessageablePerson.ts[0m:[93m7[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'InstanceType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                         ~~~~~~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m7[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'ReturnType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                                      ~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: MessageablePerson.ts[90m:7[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: modify protected to public
//// [/home/src/workspaces/project/MessageablePerson.ts] *modified* 
const Messageable = () => {
    return class MessageableClass {
        public message = 'hello';
    }
};
const wrapper = () => Messageable();
type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
export default MessageablePerson;

tsgo --incremental
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mMessageablePerson.ts[0m:[93m7[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'InstanceType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                         ~~~~~~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m7[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'ReturnType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                                      ~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: MessageablePerson.ts[90m:7[0m

//// [/home/src/workspaces/project/MessageablePerson.js] *rewrite with same content*
//// [/home/src/workspaces/project/main.js] *rewrite with same content*
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2024.full.d.ts","./MessageablePerson.ts","./main.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"500cfddf7f97c595e46579b9b5afc9bd-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;","signature":"3847cb0c7d8f5a6eaa57e0b19ab33ea8-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n","impliedNodeFormat":1},{"version":"f1d6119c9df9ff1b48604c0e5c5f624f-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"module":99},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[2,[{"pos":169,"end":181,"code":2304,"category":1,"messageKey":"Cannot_find_name_0_2304","messageArgs":["InstanceType"]},{"pos":182,"end":192,"code":2304,"category":1,"messageKey":"Cannot_find_name_0_2304","messageArgs":["ReturnType"]}]]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./MessageablePerson.ts",
        "./main.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2024.full.d.ts",
    "./MessageablePerson.ts",
    "./main.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2024.full.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./MessageablePerson.ts",
      "version": "500cfddf7f97c595e46579b9b5afc9bd-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;",
      "signature": "3847cb0c7d8f5a6eaa57e0b19ab33ea8-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "500cfddf7f97c595e46579b9b5afc9bd-const Messageable = () => {\n    return class MessageableClass {\n        public message = 'hello';\n    }\n};\nconst wrapper = () => Messageable();\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;",
        "signature": "3847cb0c7d8f5a6eaa57e0b19ab33ea8-declare const wrapper: () => {\n    new (): {\n        message: string;\n    };\n};\ntype MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;\nexport default MessageablePerson;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./main.ts",
      "version": "f1d6119c9df9ff1b48604c0e5c5f624f-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f1d6119c9df9ff1b48604c0e5c5f624f-import MessageablePerson from './MessageablePerson.js';\nfunction logMessage( person: MessageablePerson ) {\n    console.log( person.message );\n}",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./MessageablePerson.ts"
    ]
  ],
  "options": {
    "module": 99
  },
  "referencedMap": {
    "./main.ts": [
      "./MessageablePerson.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./MessageablePerson.ts",
      [
        {
          "pos": 169,
          "end": 181,
          "code": 2304,
          "category": 1,
          "messageKey": "Cannot_find_name_0_2304",
          "messageArgs": [
            "InstanceType"
          ]
        },
        {
          "pos": 182,
          "end": 192,
          "code": 2304,
          "category": 1,
          "messageKey": "Cannot_find_name_0_2304",
          "messageArgs": [
            "ReturnType"
          ]
        }
      ]
    ]
  ],
  "size": 2070
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/MessageablePerson.ts
*refresh*    /home/src/workspaces/project/main.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/MessageablePerson.ts
(computed .d.ts) /home/src/workspaces/project/main.ts


Edit [4]:: no change

tsgo --incremental
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mMessageablePerson.ts[0m:[93m7[0m:[93m26[0m - [91merror[0m[90m TS2304: [0mCannot find name 'InstanceType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                         ~~~~~~~~~~~~[0m

[96mMessageablePerson.ts[0m:[93m7[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'ReturnType'.

[7m7[0m type MessageablePerson = InstanceType<ReturnType<typeof wrapper>>;
[7m [0m [91m                                      ~~~~~~~~~~[0m


Found 2 errors in the same file, starting at: MessageablePerson.ts[90m:7[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::
