# VSCode JSON RPC

[![NPM Version](https://img.shields.io/npm/v/vscode-jsonrpc.svg)](https://npmjs.org/package/vscode-jsonrpc)
[![NPM Downloads](https://img.shields.io/npm/dm/vscode-jsonrpc.svg)](https://npmjs.org/package/vscode-jsonrpc)
[![Build Status](https://dev.azure.com/vscode/vscode-languageserver-node/_apis/build/status%2Fvscode-languageserver-node?branchName=main)](https://dev.azure.com/vscode/vscode-languageserver-node/_build/latest?definitionId=52&branchName=main)

This npm module implements the base messaging protocol spoken between a VSCode language server and a VSCode language client.

The npm module can also be used standalone to establish a [JSON-RPC](http://www.jsonrpc.org/) channel between
a client and a server. Below an example how to setup a JSON-RPC connection. First the client side.

```ts
import * as cp from 'child_process';
import * as rpc from 'vscode-jsonrpc/node';

let childProcess = cp.spawn(...);

// Use stdin and stdout for communication:
let connection = rpc.createMessageConnection(
	new rpc.StreamMessageReader(childProcess.stdout),
	new rpc.StreamMessageWriter(childProcess.stdin));

let notification = new rpc.NotificationType<string, void>('testNotification');

connection.listen();

connection.sendNotification(notification, 'Hello World');
```

The server side looks very symmetrical:

```ts
import * as rpc from 'vscode-jsonrpc/node';


let connection = rpc.createMessageConnection(
	new rpc.StreamMessageReader(process.stdin),
	new rpc.StreamMessageWriter(process.stdout));

let notification = new rpc.NotificationType<string, void>('testNotification');
connection.onNotification(notification, (param: string) => {
	console.log(param); // This prints Hello World
});

connection.listen();
```

# History

### 5.0.0

- add progress support
- move JS target to ES2017

### 4.0.0

- move JS target to ES6.

### 3.0.0:

- converted the NPM module to use TypeScript 2.0.3.
- added strict null support.
- support for passing more than one parameter to a request or notification.
- Breaking changes:
  - due to the use of TypeScript 2.0.3 and differences in d.ts generation users of the new version need to move to
    TypeScript 2.0.3 as well.

## License
[MIT](https://github.com/Microsoft/vscode-languageserver-node/blob/master/License.txt)
