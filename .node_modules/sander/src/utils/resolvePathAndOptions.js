import { resolve } from 'path';

export default function resolvePathAndOptions ( args ) {
	let options;
	let pathargs;

	if ( typeof args[ args.length - 1 ] === 'object' ) {
		options = args[ args.length - 1 ];

		let i = args.length - 1;
		pathargs = new Array( i );

		while ( i-- ) {
			pathargs[i] = args[i];
		}
	} else {
		options = {};
		pathargs = args;
	}

	const resolvedPath = resolve.apply( null, pathargs );

	return { options, resolvedPath };
}