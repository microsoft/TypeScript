import * as fs from 'graceful-fs';
import { dirname } from 'path';
import mkdirp from 'mkdirp';
import resolvePathAndOptions from '../utils/resolvePathAndOptions';

export function copyFile () {
	const { resolvedPath: src, options: readOptions } = resolvePathAndOptions( arguments );

	return {
		to () {
			const { resolvedPath: dest, options: writeOptions } = resolvePathAndOptions( arguments );

			return new Promise( ( fulfil, reject ) => {
				mkdirp( dirname( dest ), err => {
					if ( err ) {
						reject( err );
					} else {
						const readStream = fs.createReadStream( src, readOptions );
						const writeStream = fs.createWriteStream( dest, writeOptions );

						readStream.on( 'error', reject );
						writeStream.on( 'error', reject );

						writeStream.on( 'close', fulfil );

						readStream.pipe( writeStream );
					}
				});
			});
		}
	};
}

export function copyFileSync () {
	const { resolvedPath: src, options: readOptions } = resolvePathAndOptions( arguments );

	return {
		to () {
			const { resolvedPath: dest, options: writeOptions } = resolvePathAndOptions( arguments );

			const data = fs.readFileSync( src, readOptions );

			mkdirp.sync( dirname( dest ) );
			fs.writeFileSync( dest, data, writeOptions );
		}
	};
}