import { Promise } from 'sander';
import getMapFromUrl from './getMapFromUrl.js';
import getSourceMappingUrl from './getSourceMappingUrl.js';

export default function getMap ( node, sourceMapByPath, sync ) {
	if ( node.file in sourceMapByPath ) {
		const map = sourceMapByPath[ node.file ];
		return sync ? map : Promise.resolve( map );
	}

	else {
		const url = getSourceMappingUrl( node.content );

		if ( !url ) {
			node.isOriginalSource = true;
			return sync ? null : Promise.resolve( null );
		}

		return getMapFromUrl( url, node.file, sync );
	}
}
