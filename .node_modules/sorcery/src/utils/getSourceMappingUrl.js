import SOURCEMAPPING_URL from './sourceMappingURL.js';

export default function getSourceMappingUrl ( str ) {
	var index, substring, url, match;

	// assume we want the last occurence
	index = str.lastIndexOf( `${SOURCEMAPPING_URL}=` );

	if ( index === -1 ) {
		return null;
	}

	substring = str.substring( index + 17 );
	match = /^[^\r\n]+/.exec( substring );

	url = match ? match[0] : null;

	// possibly a better way to do this, but we don't want to exclude whitespace
	// from the sourceMappingURL because it might not have been correctly encoded
	if ( url && url.slice( -2 ) === '*/' ) {
		url = url.slice( 0, -2 ).trim();
	}

	return url;
}
