import mkdirp from 'mkdirp';
import resolvePath from '../utils/resolvePath';

export function mkdir () {
	const dir = resolvePath( arguments );

	return new Promise( ( fulfil, reject ) => {
		mkdirp( dir, err => {
			if ( err ) {
				reject( err );
			} else {
				fulfil();
			}
		});
	});
}

export function mkdirSync () {
	const dir = resolvePath( arguments );
	mkdirp.sync( dir );
}