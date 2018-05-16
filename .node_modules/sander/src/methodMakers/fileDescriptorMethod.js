import * as fs from 'graceful-fs';

export function asyncFileDescriptorMethod ( methodName ) {
	return function () {
		let args = [];
		let i = arguments.length;

		while ( i-- ) {
			args[i] = arguments[i];
		}

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