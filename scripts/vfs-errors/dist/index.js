"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOErrorMessages = Object.freeze({
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
class IOError extends Error {
    constructor(code, syscall, path, dest) {
        let message = `${code}: ${exports.IOErrorMessages[code]}`;
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
exports.IOError = IOError;

//# sourceMappingURL=index.js.map
