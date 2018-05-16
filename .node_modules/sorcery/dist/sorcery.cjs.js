'use strict';

var path = require('path');
var sander = require('sander');

var charToInteger = {};
var integerToChar = {};

'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split( '' ).forEach( function ( char, i ) {
	charToInteger[ char ] = i;
	integerToChar[ i ] = char;
});

function decode$1 ( string ) {
	var result = [],
		len = string.length,
		i,
		hasContinuationBit,
		shift = 0,
		value = 0,
		integer,
		shouldNegate;

	for ( i = 0; i < len; i += 1 ) {
		integer = charToInteger[ string[i] ];

		if ( integer === undefined ) {
			throw new Error( 'Invalid character (' + string[i] + ')' );
		}

		hasContinuationBit = integer & 32;

		integer &= 31;
		value += integer << shift;

		if ( hasContinuationBit ) {
			shift += 5;
		} else {
			shouldNegate = value & 1;
			value >>= 1;

			result.push( shouldNegate ? -value : value );

			// reset
			value = shift = 0;
		}
	}

	return result;
}

function encode$1 ( value ) {
	var result, i;

	if ( typeof value === 'number' ) {
		result = encodeInteger( value );
	} else {
		result = '';
		for ( i = 0; i < value.length; i += 1 ) {
			result += encodeInteger( value[i] );
		}
	}

	return result;
}

function encodeInteger ( num ) {
	var result = '', clamped;

	if ( num < 0 ) {
		num = ( -num << 1 ) | 1;
	} else {
		num <<= 1;
	}

	do {
		clamped = num & 31;
		num >>= 5;

		if ( num > 0 ) {
			clamped |= 32;
		}

		result += integerToChar[ clamped ];
	} while ( num > 0 );

	return result;
}

function decodeSegments(encodedSegments) {
	var i = encodedSegments.length;
	var segments = new Array(i);

	while (i--) {
		segments[i] = decode$1(encodedSegments[i]);
	}return segments;
}

function decode(mappings) {
	var sourceFileIndex = 0; // second field
	var sourceCodeLine = 0; // third field
	var sourceCodeColumn = 0; // fourth field
	var nameIndex = 0; // fifth field

	var lines = mappings.split(';');
	var numLines = lines.length;
	var decoded = new Array(numLines);

	var i = undefined;
	var j = undefined;
	var line = undefined;
	var generatedCodeColumn = undefined;
	var decodedLine = undefined;
	var segments = undefined;
	var segment = undefined;
	var result = undefined;

	for (i = 0; i < numLines; i += 1) {
		line = lines[i];

		generatedCodeColumn = 0; // first field - reset each time
		decodedLine = [];

		segments = decodeSegments(line.split(','));

		for (j = 0; j < segments.length; j += 1) {
			segment = segments[j];

			if (!segment.length) {
				break;
			}

			generatedCodeColumn += segment[0];

			result = [generatedCodeColumn];
			decodedLine.push(result);

			if (segment.length === 1) {
				// only one field!
				continue;
			}

			sourceFileIndex += segment[1];
			sourceCodeLine += segment[2];
			sourceCodeColumn += segment[3];

			result.push(sourceFileIndex, sourceCodeLine, sourceCodeColumn);

			if (segment.length === 5) {
				nameIndex += segment[4];
				result.push(nameIndex);
			}
		}

		decoded[i] = decodedLine;
	}

	return decoded;
}

function encode(decoded) {
	var offsets = {
		generatedCodeColumn: 0,
		sourceFileIndex: 0, // second field
		sourceCodeLine: 0, // third field
		sourceCodeColumn: 0, // fourth field
		nameIndex: 0 // fifth field
	};

	return decoded.map(function (line) {
		offsets.generatedCodeColumn = 0; // first field - reset each time
		return line.map(encodeSegment).join(',');
	}).join(';');

	function encodeSegment(segment) {
		if (!segment.length) {
			return segment;
		}

		var result = new Array(segment.length);

		result[0] = segment[0] - offsets.generatedCodeColumn;
		offsets.generatedCodeColumn = segment[0];

		if (segment.length === 1) {
			// only one field!
			return encode$1(result);
		}

		result[1] = segment[1] - offsets.sourceFileIndex;
		result[2] = segment[2] - offsets.sourceCodeLine;
		result[3] = segment[3] - offsets.sourceCodeColumn;

		offsets.sourceFileIndex = segment[1];
		offsets.sourceCodeLine = segment[2];
		offsets.sourceCodeColumn = segment[3];

		if (segment.length === 5) {
			result[4] = segment[4] - offsets.nameIndex;
			offsets.nameIndex = segment[4];
		}

		return encode$1(result);
	}
}

/**
 * Decodes a base64 string
 * @param {string} base64 - the string to decode
 * @returns {string}
 */
function atob ( base64 ) {
	return new Buffer( base64, 'base64' ).toString( 'utf8' );
}

// this looks ridiculous, but it prevents sourcemap tooling from mistaking
// this for an actual sourceMappingURL
var SOURCEMAPPING_URL = 'sourceMa';
SOURCEMAPPING_URL += 'ppingURL';

var SOURCEMAPPING_URL$1 = SOURCEMAPPING_URL;

function parseJSON ( json, url ) {
	try {
		return JSON.parse( json );
	} catch ( err ) {
		throw new Error( ("Could not parse sourcemap (" + url + "): " + (err.message)) );
	}
}

/**
 * Turns a sourceMappingURL into a sourcemap
 * @param {string} url - the sourceMappingURL. Can be a
   base64-encoded data URI
 * @param {string} base - the URL against which relative URLS
   should be resolved
 * @param {boolean} sync - if `true`, return a promise, otherwise
   return the sourcemap
 * @returns {object} - a version 3 sourcemap
 */
function getMapFromUrl ( url, base, sync ) {
	if ( /^data:/.test( url ) ) { // TODO beef this up
		var match = /base64,(.+)$/.exec( url );

		if ( !match ) {
			throw new Error( ("" + SOURCEMAPPING_URL$1 + " is not base64-encoded") );
		}

		var json = atob( match[1] );
		var map = parseJSON( json, ("data URI in " + base) );
		return sync ? map : sander.Promise.resolve( map );
	}

	url = path.resolve( path.dirname( base ), decodeURI( url ) );

	if ( sync ) {
		return parseJSON( sander.readFileSync( url, { encoding: 'utf-8' }), url );
	} else {
		return sander.readFile( url, { encoding: 'utf-8' }).then( function ( json ) { return parseJSON( json, url ); } );
	}
}

function getSourceMappingUrl ( str ) {
	var index, substring, url, match;

	// assume we want the last occurence
	index = str.lastIndexOf( ("" + SOURCEMAPPING_URL$1 + "=") );

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

function getMap ( node, sourceMapByPath, sync ) {
	if ( node.file in sourceMapByPath ) {
		var map = sourceMapByPath[ node.file ];
		return sync ? map : sander.Promise.resolve( map );
	}

	else {
		var url = getSourceMappingUrl( node.content );

		if ( !url ) {
			node.isOriginalSource = true;
			return sync ? null : sander.Promise.resolve( null );
		}

		return getMapFromUrl( url, node.file, sync );
	}
}

function Node (ref) {
	var file = ref.file;
	var content = ref.content;

	this.file = file ? path.resolve( file ) : null;
	this.content = content || null; // sometimes exists in sourcesContent, sometimes doesn't

	if ( !this.file && this.content === null ) {
		throw new Error( 'A source must specify either file or content' );
	}

	// these get filled in later
	this.map = null;
	this.mappings = null;
	this.sources = null;
	this.isOriginalSource = null;

	this._stats = {
		decodingTime: 0,
		encodingTime: 0,
		tracingTime: 0,

		untraceable: 0
	};
}

Node.prototype = {
	load: function load ( sourcesContentByPath, sourceMapByPath ) {
		var this$1 = this;

		return getContent( this, sourcesContentByPath ).then( function ( content ) {
			this$1.content = sourcesContentByPath[ this$1.file ] = content;

			return getMap( this$1, sourceMapByPath ).then( function ( map ) {
				if ( !map ) return null;

				this$1.map = map;

				var decodingStart = process.hrtime();
				this$1.mappings = decode( map.mappings );
				var decodingTime = process.hrtime( decodingStart );
				this$1._stats.decodingTime = 1e9 * decodingTime[0] + decodingTime[1];

				var sourcesContent = map.sourcesContent || [];

				var sourceRoot = path.resolve( path.dirname( this$1.file ), map.sourceRoot || '' );

				this$1.sources = map.sources.map( function ( source, i ) {
					return new Node({
						file: source ? path.resolve( sourceRoot, source ) : null,
						content: sourcesContent[i]
					});
				});

				var promises = this$1.sources.map( function ( node ) { return node.load( sourcesContentByPath, sourceMapByPath ); } );
				return sander.Promise.all( promises );
			});
		});
	},

	loadSync: function loadSync ( sourcesContentByPath, sourceMapByPath ) {
		if ( !this.content ) {
			if ( !sourcesContentByPath[ this.file ] ) {
				sourcesContentByPath[ this.file ] = sander.readFileSync( this.file, { encoding: 'utf-8' });
			}

			this.content = sourcesContentByPath[ this.file ];
		}

		var map = getMap( this, sourceMapByPath, true );
		var sourcesContent;

		if ( !map ) {
			this.isOriginalSource = true;
		} else {
			this.map = map;
			this.mappings = decode( map.mappings );

			sourcesContent = map.sourcesContent || [];

			var sourceRoot = path.resolve( path.dirname( this.file ), map.sourceRoot || '' );

			this.sources = map.sources.map( function ( source, i ) {
				var node = new Node({
					file: path.resolve( sourceRoot, source ),
					content: sourcesContent[i]
				});

				node.loadSync( sourcesContentByPath, sourceMapByPath );
				return node;
			});
		}
	},

	/**
	 * Traces a segment back to its origin
	 * @param {number} lineIndex - the zero-based line index of the
	   segment as found in `this`
	 * @param {number} columnIndex - the zero-based column index of the
	   segment as found in `this`
	 * @param {string || null} - if specified, the name that should be
	   (eventually) returned, as it is closest to the generated code
	 * @returns {object}
	     @property {string} source - the filepath of the source
	     @property {number} line - the one-based line index
	     @property {number} column - the zero-based column index
	     @property {string || null} name - the name corresponding
	     to the segment being traced
	 */
	trace: function trace ( lineIndex, columnIndex, name ) {
		// If this node doesn't have a source map, we have
		// to assume it is the original source
		var this$1 = this;

		if ( this.isOriginalSource ) {
			return {
				source: this.file,
				line: lineIndex + 1,
				column: columnIndex || 0,
				name: name
			};
		}

		// Otherwise, we need to figure out what this position in
		// the intermediate file corresponds to in *its* source
		var segments = this.mappings[ lineIndex ];

		if ( !segments || segments.length === 0 ) {
			return null;
		}

		if ( columnIndex != null ) {
			var len = segments.length;
			var i;

			for ( i = 0; i < len; i += 1 ) {
				var generatedCodeColumn = segments[i][0];

				if ( generatedCodeColumn > columnIndex ) {
					break;
				}

				if ( generatedCodeColumn === columnIndex ) {
					if ( segments[i].length < 4 ) return null;

					var sourceFileIndex$1 = segments[i][1];
					var sourceCodeLine$1 = segments[i][2];
					var sourceCodeColumn = segments[i][3];
					var nameIndex$1 = segments[i][4];

					var parent$1 = this$1.sources[ sourceFileIndex$1 ];
					return parent$1.trace( sourceCodeLine$1, sourceCodeColumn, this$1.map.names[ nameIndex$1 ] || name );
				}
			}
		}

		// fall back to a line mapping
		var sourceFileIndex = segments[0][1];
		var sourceCodeLine = segments[0][2];
		var nameIndex = segments[0][4];

		var parent = this.sources[ sourceFileIndex ];
		return parent.trace( sourceCodeLine, null, this.map.names[ nameIndex ] || name );
	}
};

function getContent ( node, sourcesContentByPath ) {
	if ( node.file in sourcesContentByPath ) {
		node.content = sourcesContentByPath[ node.file ];
	}

	if ( !node.content ) {
		return sander.readFile( node.file, { encoding: 'utf-8' });
	}

	return sander.Promise.resolve( node.content );
}

/**
 * Encodes a string as base64
 * @param {string} str - the string to encode
 * @returns {string}
 */
function btoa ( str ) {
	return new Buffer( str ).toString( 'base64' );
}

function SourceMap ( properties ) {
	this.version = 3;

	this.file           = properties.file;
	this.sources        = properties.sources;
	this.sourcesContent = properties.sourcesContent;
	this.names          = properties.names;
	this.mappings       = properties.mappings;
}

SourceMap.prototype = {
	toString: function toString () {
		return JSON.stringify( this );
	},

	toUrl: function toUrl () {
		return 'data:application/json;charset=utf-8;base64,' + btoa( this.toString() );
	}
};

function slash ( path ) {
	return typeof path === 'string' ?
		path.replace( /\\/g, '/' ) :
		path;
}

var SOURCEMAP_COMMENT = new RegExp( "\n*(?:" +
	"\\/\\/[@#]\\s*" + SOURCEMAPPING_URL$1 + "=([^'\"]+)|" +      // js
	"\\/\\*#?\\s*" + SOURCEMAPPING_URL$1 + "=([^'\"]+)\\s\\*\\/)" + // css
'\\s*$', 'g' );

function Chain ( node, sourcesContentByPath ) {
	this.node = node;
	this.sourcesContentByPath = sourcesContentByPath;

	this._stats = {};
}

Chain.prototype = {
	stat: function stat () {
		return {
			selfDecodingTime: this._stats.decodingTime / 1e6,
			totalDecodingTime: ( this._stats.decodingTime + tally( this.node.sources, 'decodingTime' ) ) / 1e6,

			encodingTime: this._stats.encodingTime / 1e6,
			tracingTime: this._stats.tracingTime / 1e6,

			untraceable: this._stats.untraceable
		};
	},

	apply: function apply ( options ) {
		var this$1 = this;
		if ( options === void 0 ) options = {};

		var allNames = [];
		var allSources = [];

		var applySegment = function ( segment, result ) {
			if ( segment.length < 4 ) return;

			var traced = this$1.node.sources[ segment[1] ].trace( // source
				segment[2], // source code line
				segment[3], // source code column
				this$1.node.map.names[ segment[4] ]
			);

			if ( !traced ) {
				this$1._stats.untraceable += 1;
				return;
			}

			var sourceIndex = allSources.indexOf( traced.source );
			if ( !~sourceIndex ) {
				sourceIndex = allSources.length;
				allSources.push( traced.source );
			}

			var newSegment = [
				segment[0], // generated code column
				sourceIndex,
				traced.line - 1,
				traced.column
			];

			if ( traced.name ) {
				var nameIndex = allNames.indexOf( traced.name );
				if ( !~nameIndex ) {
					nameIndex = allNames.length;
					allNames.push( traced.name );
				}

				newSegment[4] = nameIndex;
			}

			result[ result.length ] = newSegment;
		};

		// Trace mappings
		var tracingStart = process.hrtime();

		var i = this.node.mappings.length;
		var resolved = new Array( i );

		var j, line, result;

		while ( i-- ) {
			line = this$1.node.mappings[i];
			resolved[i] = result = [];

			for ( j = 0; j < line.length; j += 1 ) {
				applySegment( line[j], result );
			}
		}

		var tracingTime = process.hrtime( tracingStart );
		this._stats.tracingTime = 1e9 * tracingTime[0] + tracingTime[1];

		// Encode mappings
		var encodingStart = process.hrtime();
		var mappings = encode( resolved );
		var encodingTime = process.hrtime( encodingStart );
		this._stats.encodingTime = 1e9 * encodingTime[0] + encodingTime[1];

		var includeContent = options.includeContent !== false;

		return new SourceMap({
			file: path.basename( this.node.file ),
			sources: allSources.map( function ( source ) { return slash( path.relative( options.base || path.dirname( this$1.node.file ), source ) ); } ),
			sourcesContent: allSources.map( function ( source ) { return includeContent ? this$1.sourcesContentByPath[ source ] : null; } ),
			names: allNames,
			mappings: mappings
		});
	},

	trace: function trace ( oneBasedLineIndex, zeroBasedColumnIndex ) {
		return this.node.trace( oneBasedLineIndex - 1, zeroBasedColumnIndex, null );
	},

	write: function write ( dest, options ) {
		if ( typeof dest !== 'string' ) {
			options = dest;
			dest = this.node.file;
		}

		options = options || {};

		var ref = processWriteOptions( dest, this, options ), resolved = ref.resolved, content = ref.content, map = ref.map;

		var promises = [ sander.writeFile( resolved, content ) ];

		if ( !options.inline ) {
			promises.push( sander.writeFile( resolved + '.map', map.toString() ) );
		}

		return Promise.all( promises );
	},

	writeSync: function writeSync ( dest, options ) {
		if ( typeof dest !== 'string' ) {
			options = dest;
			dest = this.node.file;
		}

		options = options || {};

		var ref = processWriteOptions( dest, this, options ), resolved = ref.resolved, content = ref.content, map = ref.map;

		sander.writeFileSync( resolved, content );

		if ( !options.inline ) {
			sander.writeFileSync( resolved + '.map', map.toString() );
		}
	}
};

function processWriteOptions ( dest, chain, options ) {
	var resolved = path.resolve( dest );

	var map = chain.apply({
		includeContent: options.includeContent,
		base: options.base ? path.resolve( options.base ) : path.dirname( resolved )
	});

	var url = options.inline ? map.toUrl() : ( options.absolutePath ? resolved : path.basename( resolved ) ) + '.map';

	// TODO shouldn't url be relative?
	var content = chain.node.content.replace( SOURCEMAP_COMMENT, '' ) + sourcemapComment( url, resolved );

	return { resolved: resolved, content: content, map: map };
}

function tally ( nodes, stat ) {
	return nodes.reduce( function ( total, node ) {
		return total + node._stats[ stat ];
	}, 0 );
}

function sourcemapComment ( url, dest ) {
	var ext = path.extname( dest );
	url = encodeURI( url );

	if ( ext === '.css' ) {
		return ("\n/*# " + SOURCEMAPPING_URL$1 + "=" + url + " */\n");
	}

	return ("\n//# " + SOURCEMAPPING_URL$1 + "=" + url + "\n");
}

function load ( file, options ) {
	var ref = init( file, options ), node = ref.node, sourcesContentByPath = ref.sourcesContentByPath, sourceMapByPath = ref.sourceMapByPath;

	return node.load( sourcesContentByPath, sourceMapByPath )
		.then( function () { return node.isOriginalSource ? null : new Chain( node, sourcesContentByPath ); } );
}

function loadSync ( file, options ) {
	if ( options === void 0 ) options = {};

	var ref = init( file, options ), node = ref.node, sourcesContentByPath = ref.sourcesContentByPath, sourceMapByPath = ref.sourceMapByPath;

	node.loadSync( sourcesContentByPath, sourceMapByPath );
	return node.isOriginalSource ? null : new Chain( node, sourcesContentByPath );
}

function init ( file, options ) {
	if ( options === void 0 ) options = {};

	var node = new Node({ file: file });

	var sourcesContentByPath = {};
	var sourceMapByPath = {};

	if ( options.content ) {
		Object.keys( options.content ).forEach( function ( key ) {
			sourcesContentByPath[ path.resolve( key ) ] = options.content[ key ];
		});
	}

	if ( options.sourcemaps ) {
		Object.keys( options.sourcemaps ).forEach( function ( key ) {
			sourceMapByPath[ path.resolve( key ) ] = options.sourcemaps[ key ];
		});
	}

	return { node: node, sourcesContentByPath: sourcesContentByPath, sourceMapByPath: sourceMapByPath };
}

exports.load = load;
exports.loadSync = loadSync;
//# sourceMappingURL=sorcery.cjs.js.map