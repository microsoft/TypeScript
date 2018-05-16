import { basename, dirname, extname, relative, resolve } from 'path';
import { writeFile, writeFileSync } from 'sander';
import { encode } from 'sourcemap-codec';
import SourceMap from './SourceMap.js';
import slash from './utils/slash.js';
import SOURCEMAPPING_URL from './utils/sourceMappingURL.js';

const SOURCEMAP_COMMENT = new RegExp( `\n*(?:` +
	`\\/\\/[@#]\\s*${SOURCEMAPPING_URL}=([^'"]+)|` +      // js
	`\\/\\*#?\\s*${SOURCEMAPPING_URL}=([^'"]+)\\s\\*\\/)` + // css
'\\s*$', 'g' );

export default function Chain ( node, sourcesContentByPath ) {
	this.node = node;
	this.sourcesContentByPath = sourcesContentByPath;

	this._stats = {};
}

Chain.prototype = {
	stat () {
		return {
			selfDecodingTime: this._stats.decodingTime / 1e6,
			totalDecodingTime: ( this._stats.decodingTime + tally( this.node.sources, 'decodingTime' ) ) / 1e6,

			encodingTime: this._stats.encodingTime / 1e6,
			tracingTime: this._stats.tracingTime / 1e6,

			untraceable: this._stats.untraceable
		};
	},

	apply ( options = {} ) {
		let allNames = [];
		let allSources = [];

		const applySegment = ( segment, result ) => {
			if ( segment.length < 4 ) return;

			const traced = this.node.sources[ segment[1] ].trace( // source
				segment[2], // source code line
				segment[3], // source code column
				this.node.map.names[ segment[4] ]
			);

			if ( !traced ) {
				this._stats.untraceable += 1;
				return;
			}

			let sourceIndex = allSources.indexOf( traced.source );
			if ( !~sourceIndex ) {
				sourceIndex = allSources.length;
				allSources.push( traced.source );
			}

			let newSegment = [
				segment[0], // generated code column
				sourceIndex,
				traced.line - 1,
				traced.column
			];

			if ( traced.name ) {
				let nameIndex = allNames.indexOf( traced.name );
				if ( !~nameIndex ) {
					nameIndex = allNames.length;
					allNames.push( traced.name );
				}

				newSegment[4] = nameIndex;
			}

			result[ result.length ] = newSegment;
		};

		// Trace mappings
		let tracingStart = process.hrtime();

		let i = this.node.mappings.length;
		let resolved = new Array( i );

		let j, line, result;

		while ( i-- ) {
			line = this.node.mappings[i];
			resolved[i] = result = [];

			for ( j = 0; j < line.length; j += 1 ) {
				applySegment( line[j], result );
			}
		}

		let tracingTime = process.hrtime( tracingStart );
		this._stats.tracingTime = 1e9 * tracingTime[0] + tracingTime[1];

		// Encode mappings
		let encodingStart = process.hrtime();
		let mappings = encode( resolved );
		let encodingTime = process.hrtime( encodingStart );
		this._stats.encodingTime = 1e9 * encodingTime[0] + encodingTime[1];

		let includeContent = options.includeContent !== false;

		return new SourceMap({
			file: basename( this.node.file ),
			sources: allSources.map( source => slash( relative( options.base || dirname( this.node.file ), source ) ) ),
			sourcesContent: allSources.map( source => includeContent ? this.sourcesContentByPath[ source ] : null ),
			names: allNames,
			mappings
		});
	},

	trace ( oneBasedLineIndex, zeroBasedColumnIndex ) {
		return this.node.trace( oneBasedLineIndex - 1, zeroBasedColumnIndex, null );
	},

	write ( dest, options ) {
		if ( typeof dest !== 'string' ) {
			options = dest;
			dest = this.node.file;
		}

		options = options || {};

		const { resolved, content, map } = processWriteOptions( dest, this, options );

		let promises = [ writeFile( resolved, content ) ];

		if ( !options.inline ) {
			promises.push( writeFile( resolved + '.map', map.toString() ) );
		}

		return Promise.all( promises );
	},

	writeSync ( dest, options ) {
		if ( typeof dest !== 'string' ) {
			options = dest;
			dest = this.node.file;
		}

		options = options || {};

		const { resolved, content, map } = processWriteOptions( dest, this, options );

		writeFileSync( resolved, content );

		if ( !options.inline ) {
			writeFileSync( resolved + '.map', map.toString() );
		}
	}
};

function processWriteOptions ( dest, chain, options ) {
	const resolved = resolve( dest );

	const map = chain.apply({
		includeContent: options.includeContent,
		base: options.base ? resolve( options.base ) : dirname( resolved )
	});

	const url = options.inline ? map.toUrl() : ( options.absolutePath ? resolved : basename( resolved ) ) + '.map';

	// TODO shouldn't url be relative?
	const content = chain.node.content.replace( SOURCEMAP_COMMENT, '' ) + sourcemapComment( url, resolved );

	return { resolved, content, map };
}

function tally ( nodes, stat ) {
	return nodes.reduce( ( total, node ) => {
		return total + node._stats[ stat ];
	}, 0 );
}

function sourcemapComment ( url, dest ) {
	const ext = extname( dest );
	url = encodeURI( url );

	if ( ext === '.css' ) {
		return `\n/*# ${SOURCEMAPPING_URL}=${url} */\n`;
	}

	return `\n//# ${SOURCEMAPPING_URL}=${url}\n`;
}
