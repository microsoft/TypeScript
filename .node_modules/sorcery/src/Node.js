import { dirname, resolve } from 'path';
import { readFile, readFileSync, Promise } from 'sander';
import { decode } from 'sourcemap-codec';
import getMap from './utils/getMap.js';

export default function Node ({ file, content }) {
	this.file = file ? resolve( file ) : null;
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
	load ( sourcesContentByPath, sourceMapByPath ) {
		return getContent( this, sourcesContentByPath ).then( content => {
			this.content = sourcesContentByPath[ this.file ] = content;

			return getMap( this, sourceMapByPath ).then( map => {
				if ( !map ) return null;

				this.map = map;

				let decodingStart = process.hrtime();
				this.mappings = decode( map.mappings );
				let decodingTime = process.hrtime( decodingStart );
				this._stats.decodingTime = 1e9 * decodingTime[0] + decodingTime[1];

				const sourcesContent = map.sourcesContent || [];

				const sourceRoot = resolve( dirname( this.file ), map.sourceRoot || '' );

				this.sources = map.sources.map( ( source, i ) => {
					return new Node({
						file: source ? resolve( sourceRoot, source ) : null,
						content: sourcesContent[i]
					});
				});

				const promises = this.sources.map( node => node.load( sourcesContentByPath, sourceMapByPath ) );
				return Promise.all( promises );
			});
		});
	},

	loadSync ( sourcesContentByPath, sourceMapByPath ) {
		if ( !this.content ) {
			if ( !sourcesContentByPath[ this.file ] ) {
				sourcesContentByPath[ this.file ] = readFileSync( this.file, { encoding: 'utf-8' });
			}

			this.content = sourcesContentByPath[ this.file ];
		}

		const map = getMap( this, sourceMapByPath, true );
		let sourcesContent;

		if ( !map ) {
			this.isOriginalSource = true;
		} else {
			this.map = map;
			this.mappings = decode( map.mappings );

			sourcesContent = map.sourcesContent || [];

			const sourceRoot = resolve( dirname( this.file ), map.sourceRoot || '' );

			this.sources = map.sources.map( ( source, i ) => {
				const node = new Node({
					file: resolve( sourceRoot, source ),
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
	trace ( lineIndex, columnIndex, name ) {
		// If this node doesn't have a source map, we have
		// to assume it is the original source
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
		const segments = this.mappings[ lineIndex ];

		if ( !segments || segments.length === 0 ) {
			return null;
		}

		if ( columnIndex != null ) {
			let len = segments.length;
			let i;

			for ( i = 0; i < len; i += 1 ) {
				let generatedCodeColumn = segments[i][0];

				if ( generatedCodeColumn > columnIndex ) {
					break;
				}

				if ( generatedCodeColumn === columnIndex ) {
					if ( segments[i].length < 4 ) return null;

					let sourceFileIndex = segments[i][1];
					let sourceCodeLine = segments[i][2];
					let sourceCodeColumn = segments[i][3];
					let nameIndex = segments[i][4];

					let parent = this.sources[ sourceFileIndex ];
					return parent.trace( sourceCodeLine, sourceCodeColumn, this.map.names[ nameIndex ] || name );
				}
			}
		}

		// fall back to a line mapping
		let sourceFileIndex = segments[0][1];
		let sourceCodeLine = segments[0][2];
		let nameIndex = segments[0][4];

		let parent = this.sources[ sourceFileIndex ];
		return parent.trace( sourceCodeLine, null, this.map.names[ nameIndex ] || name );
	}
};

function getContent ( node, sourcesContentByPath ) {
	if ( node.file in sourcesContentByPath ) {
		node.content = sourcesContentByPath[ node.file ];
	}

	if ( !node.content ) {
		return readFile( node.file, { encoding: 'utf-8' });
	}

	return Promise.resolve( node.content );
}
