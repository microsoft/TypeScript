import fs = require('fs');
import server = require('server');

export interface IConfiguration {
    workspace: server.IWorkspace;
    server?: server.IServer;
}
