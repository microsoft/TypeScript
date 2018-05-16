import _rimraf from 'rimraf';
import resolvePath from '../utils/resolvePath';

export function rimraf () {
	const target = resolvePath( arguments );

	return new Promise( ( fulfil, reject ) => {
		_rimraf( target, err => {
			if ( err ) {
				reject( err );
			} else {
				fulfil();
			}
		});
	});
}

export function rimrafSync () {
	_rimraf.sync( resolvePath( arguments ) );
}