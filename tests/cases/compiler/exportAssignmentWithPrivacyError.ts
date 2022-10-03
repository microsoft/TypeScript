//@module: amd
interface connectmodule {
    (res, req, next): void;
}
interface connectexport {
    use: (mod: connectmodule) => connectexport;
    listen: (port: number) => void;
}

var server: {
    (): connectexport;
    test1: connectmodule;
    test2(): connectmodule;
};

export = server;

