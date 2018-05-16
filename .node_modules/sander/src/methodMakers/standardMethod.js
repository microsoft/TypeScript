import * as fs from 'graceful-fs';
import resolvePath from '../utils/resolvePath';

function normaliseArguments ( args ) {
	const len = args.length;

	let buildingPath = true;
	let pathargs = [];
	let normalised = [ null ]; // null is a placeholder for the resolved path
	let i;

	for ( i = 0; i < len; i += 1 ) {
		if ( buildingPath && typeof args[i] === 'string' ) {
			pathargs[i] = args[i];
		} else {
			buildingPath = false;
			normalised.push( args[i] );
		}
	}

	normalised[0] = resolvePath( pathargs );

	return normalised;
}

export function asyncMethod ( methodName ) {
	return function () {
		const args = normaliseArguments( arguments );

		return new Promise( ( fulfil, reject ) => {
			args.push( ( err, result ) => {
				if ( err ) {
					reject( err );
				} else {
					fulfil( result );
				}
			});

			fs[ methodName ].apply( fs, args );
		});
	};
}

export function syncMethod ( methodName ) {
	return function () {
		const args = normaliseArguments( arguments );
		return fs[ methodName ].apply( fs, args );
	};
}