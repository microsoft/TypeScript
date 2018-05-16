import { stat, statSync } from '../sander';
import { copydir, copydirSync } from './copydir';
import { copyFile, copyFileSync } from './copyFile';
import { symlink, symlinkSync } from '../specialMethods/symlink';
import resolvePathAndOptions from '../utils/resolvePathAndOptions';

const isWindows = process.platform === 'win32';

export function symlinkOrCopy () {
	if ( isWindows ) {
		const { resolvedPath: src, options: readOptions } = resolvePathAndOptions( arguments );

		let copyDirOrFileTo = stat( src )
			.then( stats => {
				return ( stats.isDirectory() ? copydir : copyFile )
					.apply( null, arguments )
					.to;
			});

		return {
			to () {
				return copyDirOrFileTo
					.then(fn => {
						return fn.apply(null, arguments);
					});
			}
		};
	}

	return symlink.apply( null, arguments );
}

export function symlinkOrCopySync () {
	if ( isWindows ) {
		const { resolvedPath: src, options: readOptions } = resolvePathAndOptions( arguments );
		return ( statSync( src ).isDirectory() ? copydirSync : copyFileSync ).apply( null, arguments );
	}

	return symlinkSync.apply( null, arguments );
}