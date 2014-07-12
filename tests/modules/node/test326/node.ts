// node.ts
interface IReadableStream {}
interface IProcess { stdin: IReadableStream; }
declare var process: IProcess;
declare module "http" {export function createServer(fn:(request: IServerRequest, response: IServerResponse) => void): IServer;}
interface IServer {
    listen(port: number): void;
    listen(port: number, hostName: string): void;
    listen(port: number, hostName: string, fn:() => void): void;
}

interface IServerResponse {
    writeHead(statusCode: number, headers: any);
    end(body: string): void;
}
	
interface IServerRequest {
    url: string;
}