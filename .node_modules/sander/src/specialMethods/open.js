import { dirname } from 'path';
import * as fs from 'graceful-fs';
import mkdirp from 'mkdirp';
import resolvePath from '../utils/resolvePath';

function normaliseArguments ( args ) {
	let options;
	let flags;
	let i;

	if ( typeof args[ args.length - 1 ] === 'object' ) {
		options = args[ args.length - 1 ];
		flags = args[ args.length - 2 ];
		i = args.length - 2;
	} else {
		options = {};
		flags = args[ args.length - 1 ];
		i = args.length - 1;
	}

	let pathargs = new Array( i );
	while ( i-- ) {
		pathargs[i] = args[i];
	}

	const resolvedPath = resolvePath( pathargs );

	return { resolvedPath, options, flags };
}

function bailIfExists ( src, flags, mode ) {
	let alreadyExists;

	try {
		fs.statSync( src );
		alreadyExists = true;
	} catch ( err ) {
		if ( err.code !== 'ENOENT' ) {
			throw err;
		}
	}

	if ( alreadyExists ) {
		// attempt the operation = that way, we get the intended error message
		// TODO can't we just do this in the first place?
		fs.openSync( src, flags, mode );
	}
}

export function open () {
	const { resolvedPath: src, options, flags } = normaliseArguments( arguments );

	if ( /^.x/.test( flags ) ) {
		bailIfExists( src, flags, options.mode );
	}

	return new Promise( ( fulfil, reject ) => {
		function open () {
			fs.open( src, flags, options.mode, ( err, fd ) => {
				if ( err ) {
					reject( err );
				} else {
					fulfil( fd );
				}
			});
		}

		// create dirs if necessary
		if ( /^[wa]/.test( flags ) ) {
			mkdirp( dirname( src ), err => {
				if ( err ) {
					reject( err );
				} else {
					open();
				}
			});
		} else {
			open();
		}
	});
}


export function openSync () {
	const { resolvedPath: src, options, flags } = normaliseArguments( arguments );

	if ( /^.x/.test( flags ) ) {
		bailIfExists( src, flags, options.mode );
	}

	// create dirs if necessary
	if ( /^[wa]/.test( flags ) ) {
		mkdirp.sync( dirname( src ) );
	}

	return fs.openSync( src, flags, options.mode );
}