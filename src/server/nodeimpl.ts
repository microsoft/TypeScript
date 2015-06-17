/// <reference path="node.d.ts" />
module ts.server {
    export class NodeEnvironment implements Environment {
        byteLength = Buffer.byteLength;
        hrtime = process.hrtime;
    }  
}