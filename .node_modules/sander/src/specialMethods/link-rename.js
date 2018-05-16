import * as fs from 'graceful-fs';
import { dirname } from 'path';
import mkdirp from 'mkdirp';
import resolvePath from '../utils/resolvePath';

export const rename = asyncMethod( 'rename' );
export const link = asyncMethod( 'link' );

export const renameSync = syncMethod( 'renameSync' );
export const linkSync = syncMethod( 'linkSync' );

function asyncMethod ( methodName ) {
	return function () {
		const src = resolvePath( arguments );

		return {
			to () {
				const dest = resolvePath( arguments );

				return new Promise( ( fulfil, reject ) => {
					mkdirp( dirname( dest ), err => {
						if ( err ) {
							reject( err );
						} else {
							fs[ methodName ]( src, dest, err => {
								if ( err ) {
									reject( err );
								} else {
									fulfil();
								}
							});
						}
					});
				});
			}
		};
	};
}

function syncMethod ( methodName ) {
	return function () {
		const src = resolvePath( arguments );

		return {
			to () {
				const dest = resolvePath( arguments );

				mkdirp.sync( dirname( dest ) );
				return fs[ methodName ]( src, dest );
			}
		};
	};
}