export const IOErrorMessages = Object.freeze({
    "EACCES": "access denied",
    "EIO": "an I/O error occurred",
    "ENOENT": "no such file or directory",
    "EEXIST": "file already exists",
    "ELOOP": "too many symbolic links encountered",
    "ENOTDIR": "no such directory",
    "EISDIR": "path is a directory",
    "EBADF": "invalid file descriptor",
    "EINVAL": "invalid value",
    "ENOTEMPTY": "directory not empty",
    "EPERM": "operation not permitted",
    "EROFS": "file system is read-only"
});

export class IOError extends Error {
    public readonly code: string;
    public readonly syscall: string | undefined;
    public readonly path: string | undefined;
    public readonly dest: string | undefined;

    constructor(code: keyof typeof IOErrorMessages, syscall?: string);
    constructor(code: keyof typeof IOErrorMessages, syscall: string, path?: string);
    constructor(code: keyof typeof IOErrorMessages, syscall: string, path: string, dest?: string);
    constructor(code: keyof typeof IOErrorMessages, syscall?: string, path?: string, dest?: string) {
        let message = `${code}: ${IOErrorMessages[code]}`;
        if (syscall !== undefined) {
            message += `, ${syscall}`;
            if (path !== undefined) {
                message += ` '${path}'`;
                if (dest !== undefined) {
                    message += ` -> '${dest}'`;
                }
            }
        }
        super(message);
        this.name = "Error";
        this.code = code;
        this.syscall = syscall;
        this.path = path;
        this.dest = dest;
    }
}

