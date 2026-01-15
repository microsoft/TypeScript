//@module: commonjs
interface connectModule {
    (res, req, next): void;
}
interface connectExport {
    use: (mod: connectModule) => connectExport;
    listen: (port: number) => void;
}
declare const server: {
    (): connectExport;
    test1: connectModule;
    test2(): connectModule;
};
export = server;
export = connectExport;
 
