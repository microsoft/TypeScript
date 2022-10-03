export interface IServer {
}

export interface IWorkspace {
	toAbsolutePath(server:IServer, workspaceRelativePath?:string):string;
}