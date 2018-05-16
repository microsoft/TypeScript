import * as fs from 'fs';
import { resolve, sep } from 'path';
import resolvePath from '../utils/resolvePath';

function walk ( dir, callback ) {
	let results = [];

	fs.readdir( dir, ( err, files ) => {
		if ( err ) return callback( err );

		let pending = files.length;
		if ( !pending ) return callback( null, results );

		files.forEach( file => {
			file = resolve( dir, file );

			fs.stat( file, ( err, stats ) => {
				if ( stats && stats.isDirectory() ) {
					walk( file, ( err, res ) => {
						results = results.concat( res );
						if ( !--pending ) callback( null, results );
					});
				} else {
					results.push( file );
					if ( !--pending ) callback( null, results );
				}
			});
		});
	});
};

export function lsr () {
	const basedir = resolvePath( arguments );

	return new Promise( ( fulfil, reject ) => {
		walk( basedir, function ( err, result ) {
			if ( err ) return reject( err );

			// files should be relative to basedir
			const index = basedir.length + 1;
			let i = result.length;
			while ( i-- ) {
				result[i] = result[i].substring( index );
			}

			fulfil( result );
		});
	});
}

export function lsrSync () {
	const basedir = resolvePath( arguments );

	let result = [];

	function processdir ( dir ) {
		fs.readdirSync( dir ).forEach( file => {
			const filepath = dir + sep + file;

			if ( fs.statSync( filepath ).isDirectory() ) {
				processdir( filepath );
			} else {
				result.push( filepath.replace( basedir + sep, '' ) );
			}
		});
	}

	processdir( basedir );
	return result;
}