import { resolve } from 'path';

export default function resolvePath ( args ) {
	return resolve.apply( null, args );
}