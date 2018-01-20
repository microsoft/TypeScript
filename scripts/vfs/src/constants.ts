// file type
export const S_IFMT   = 0o170000; // file type
export const S_IFSOCK = 0o140000; // socket
export const S_IFLNK  = 0o120000; // symbolic link
export const S_IFREG  = 0o100000; // regular file
export const S_IFBLK  = 0o060000; // block device
export const S_IFDIR  = 0o040000; // directory
export const S_IFCHR  = 0o020000; // character device
export const S_IFIFO  = 0o010000; // FIFO

// file mode bits
export const S_ISUID  = 0o004000; // set-user-ID bit
export const S_ISGID  = 0o002000; // set-group-ID bit
export const S_ISVTX  = 0o001000; // sticky bit

// file permission bits
export const S_IRUSR  = 0o000400; // read by owner
export const S_IWUSR  = 0o000200; // write by owner
export const S_IXUSR  = 0o000100; // execute by owner
export const S_IRWXU  = 0o000700; // read/write/execute by owner
export const S_IRGRP  = 0o000040; // read by group
export const S_IWGRP  = 0o000020; // write by group
export const S_IXGRP  = 0o000010; // execute by group
export const S_IRWXG  = 0o000070; // read/write/execute by group
export const S_IROTH  = 0o000004; // read by others
export const S_IWOTH  = 0o000002; // write by others
export const S_IXOTH  = 0o000001; // execute by others
export const S_IRWXO  = 0o000007; // read/write/execute by others

export const SEEK_SET = 0;
export const SEEK_CUR = 1;
export const SEEK_END = 2;

export const O_ACCMODE          = 0o00000003;
export const O_RDONLY           = 0o00000000;
export const O_WRONLY           = 0o00000001;
export const O_RDWR             = 0o00000002;

export const O_CREAT            = 0o00000100;
export const O_EXCL             = 0o00000200;
export const O_TRUNC            = 0o00001000;
export const O_APPEND           = 0o00002000;
export const O_SYNC             = 0o00010000; // explicit fsync
export const O_DIRECTORY        = 0o00200000;
export const O_NOFOLLOW         = 0o00400000;
export const O_PATH             = 0o10000000;


export const F_OK               = 0o00000000; // path is visible to the current process
export const X_OK               = 0o00000001; // path can be executed or searched by the current process
export const W_OK               = 0o00000002; // path can be written to by the current process
export const R_OK               = 0o00000004; // path can be read by the current process

export const CAP_CHOWN          = 0; // can change file ownership
export const CAP_FOWNER         = 3; // overrdies file ownership restrictions
export const CAP_FSETID         = 4; // allows S_ISGID and S_ISUID flags
export const CAP_FSETGID        = 6; // allows use of setgid and setgroups
export const CAP_FSETUID        = 7; // allows use of setuid