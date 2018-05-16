import * as fs from 'graceful-fs';
import resolvePath from '../utils/resolvePath';

export function exists () {
	const target = resolvePath( arguments );

	return new Promise( fulfil => {
		fs.exists( target, exists => fulfil( exists ) );
	});
}

export function existsSync () {
	return fs.existsSync( resolvePath( arguments ) );
}