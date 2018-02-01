"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// file type
exports.S_IFMT = 0o170000; // file type
exports.S_IFSOCK = 0o140000; // socket
exports.S_IFLNK = 0o120000; // symbolic link
exports.S_IFREG = 0o100000; // regular file
exports.S_IFBLK = 0o060000; // block device
exports.S_IFDIR = 0o040000; // directory
exports.S_IFCHR = 0o020000; // character device
exports.S_IFIFO = 0o010000; // FIFO
// file mode bits
exports.S_ISUID = 0o004000; // set-user-ID bit
exports.S_ISGID = 0o002000; // set-group-ID bit
exports.S_ISVTX = 0o001000; // sticky bit
// file permission bits
exports.S_IRUSR = 0o000400; // read by owner
exports.S_IWUSR = 0o000200; // write by owner
exports.S_IXUSR = 0o000100; // execute by owner
exports.S_IRWXU = 0o000700; // read/write/execute by owner
exports.S_IRGRP = 0o000040; // read by group
exports.S_IWGRP = 0o000020; // write by group
exports.S_IXGRP = 0o000010; // execute by group
exports.S_IRWXG = 0o000070; // read/write/execute by group
exports.S_IROTH = 0o000004; // read by others
exports.S_IWOTH = 0o000002; // write by others
exports.S_IXOTH = 0o000001; // execute by others
exports.S_IRWXO = 0o000007; // read/write/execute by others
exports.SEEK_SET = 0;
exports.SEEK_CUR = 1;
exports.SEEK_END = 2;
exports.O_ACCMODE = 0o00000003;
exports.O_RDONLY = 0o00000000;
exports.O_WRONLY = 0o00000001;
exports.O_RDWR = 0o00000002;
exports.O_CREAT = 0o00000100;
exports.O_EXCL = 0o00000200;
exports.O_TRUNC = 0o00001000;
exports.O_APPEND = 0o00002000;
exports.O_SYNC = 0o00010000; // explicit fsync
exports.O_DIRECTORY = 0o00200000;
exports.O_NOFOLLOW = 0o00400000;
exports.O_PATH = 0o10000000;
exports.F_OK = 0o00000000; // path is visible to the current process
exports.X_OK = 0o00000001; // path can be executed or searched by the current process
exports.W_OK = 0o00000002; // path can be written to by the current process
exports.R_OK = 0o00000004; // path can be read by the current process
exports.CAP_CHOWN = 0; // can change file ownership
exports.CAP_FOWNER = 3; // overrdies file ownership restrictions
exports.CAP_FSETID = 4; // allows S_ISGID and S_ISUID flags
exports.CAP_FSETGID = 6; // allows use of setgid and setgroups
exports.CAP_FSETUID = 7; // allows use of setuid

//# sourceMappingURL=constants.js.map
