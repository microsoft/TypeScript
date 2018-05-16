import * as fs from 'graceful-fs';
import * as es6Promise from 'es6-promise';
import { syncMethod, asyncMethod } from './methodMakers/standardMethod';
import { asyncFileDescriptorMethod } from './methodMakers/fileDescriptorMethod';

// standard async methods
export const chmod = asyncMethod( 'chmod' );
export const chown = asyncMethod( 'chown' );
export const createReadStream = asyncMethod( 'createReadStream' );
export const createWriteStream = asyncMethod( 'createWriteStream' );
export const lchmod = asyncMethod( 'lchmod' );
export const lchown = asyncMethod( 'lchown' );
export const lstat = asyncMethod( 'lstat' );
export const readdir = asyncMethod( 'readdir' );
export const readFile = asyncMethod( 'readFile' );
export const readlink = asyncMethod( 'readlink' );
export const realpath = asyncMethod( 'realpath' );
export const rmdir = asyncMethod( 'rmdir' );
export const stat = asyncMethod( 'stat' );
export const truncate = asyncMethod( 'truncate' );
export const unlink = asyncMethod( 'unlink' );
export const utimes = asyncMethod( 'utimes' );
export const unwatchFile = asyncMethod( 'unwatchFile' );
export const watch = asyncMethod( 'watch' );
export const watchFile = asyncMethod( 'watchFile' );

// standard sync methods
export const chmodSync = syncMethod( 'chmodSync' );
export const chownSync = syncMethod( 'chownSync' );
export const lchmodSync = syncMethod( 'lchmodSync' );
export const lchownSync = syncMethod( 'lchownSync' );
export const lstatSync = syncMethod( 'lstatSync' );
export const readdirSync = syncMethod( 'readdirSync' );
export const readFileSync = syncMethod( 'readFileSync' );
export const readlinkSync = syncMethod( 'readlinkSync' );
export const realpathSync = syncMethod( 'realpathSync' );
export const rmdirSync = syncMethod( 'rmdirSync' );
export const statSync = syncMethod( 'statSync' );
export const truncateSync = syncMethod( 'truncateSync' );
export const unlinkSync = syncMethod( 'unlinkSync' );
export const utimesSync = syncMethod( 'utimesSync' );

// file descriptor async methods
export const close = asyncFileDescriptorMethod( 'close' );
export const fchmod = asyncFileDescriptorMethod( 'fchmod' );
export const fchown = asyncFileDescriptorMethod( 'fchown' );
export const fstat = asyncFileDescriptorMethod( 'fstat' );
export const fsync = asyncFileDescriptorMethod( 'fsync' );
export const ftruncate = asyncFileDescriptorMethod( 'ftruncate' );
export const futimes = asyncFileDescriptorMethod( 'futimes' );
export const read = asyncFileDescriptorMethod( 'read' );

// file descriptor sync methods
export const closeSync = fs.closeSync;
export const fchmodSync = fs.fchmodSync;
export const fchownSync = fs.fchownSync;
export const fstatSync = fs.fstatSync;
export const fsyncSync = fs.fsyncSync;
export const ftruncateSync = fs.ftruncateSync;
export const futimesSync = fs.futimesSync;
export const readSync = fs.readSync;

// special methods
export { createReadStream, createWriteStream } from './specialMethods/createReadStream-createWriteStream'; // TODO aren't these covered by the standard methods?
export { exists, existsSync } from './specialMethods/exists';
export { link, linkSync, rename, renameSync } from './specialMethods/link-rename';
export { mkdir, mkdirSync } from './specialMethods/mkdir';
export { open, openSync } from './specialMethods/open';
export { symlink, symlinkSync } from './specialMethods/symlink';
export { writeFile, writeFileSync, appendFile, appendFileSync } from './specialMethods/writeFile-appendFile';

// extra methods
export { copydir, copydirSync } from './extraMethods/copydir';
export { copyFile, copyFileSync } from './extraMethods/copyFile';
export { lsr, lsrSync } from './extraMethods/lsr';
export { rimraf, rimrafSync } from './extraMethods/rimraf';
export { symlinkOrCopy, symlinkOrCopySync } from './extraMethods/symlinkOrCopy';

// expose Promise for convenience
// https://github.com/esperantojs/esperanto/issues/161
export const Promise = es6Promise.Promise;