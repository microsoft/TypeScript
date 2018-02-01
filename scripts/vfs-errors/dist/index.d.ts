export declare const IOErrorMessages: Readonly<{
    "EACCES": string;
    "EIO": string;
    "ENOENT": string;
    "EEXIST": string;
    "ELOOP": string;
    "ENOTDIR": string;
    "EISDIR": string;
    "EBADF": string;
    "EINVAL": string;
    "ENOTEMPTY": string;
    "EPERM": string;
    "EROFS": string;
}>;
export declare class IOError extends Error {
    readonly code: string;
    readonly syscall: string | undefined;
    readonly path: string | undefined;
    readonly dest: string | undefined;
    constructor(code: keyof typeof IOErrorMessages, syscall?: string);
    constructor(code: keyof typeof IOErrorMessages, syscall: string, path?: string);
    constructor(code: keyof typeof IOErrorMessages, syscall: string, path: string, dest?: string);
}
