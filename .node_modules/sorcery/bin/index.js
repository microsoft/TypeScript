#!/usr/bin/env node

var path = require( 'path' );
var minimist = require( 'minimist' );
var sander = require( 'sander' );
var showHelp = require( './showHelp' );
var command;
var sorcery = require( '../' );

var validExtensions = { js: true };

command = minimist( process.argv.slice( 2 ), {
	alias: {
		i: 'input',
		o: 'output',
		v: 'version',
		h: 'help',
		d: 'datauri',
		x: 'excludeContent'
	}
});

if ( command.help ) {
	showHelp( process.stdout );
}

else if ( process.argv.length <= 2 && process.stdin.isTTY ) {
	showHelp( process.stderr );
}

else if ( command.version ) {
	console.log( 'Sorcery version ' + require( '../package.json' ).version );
}

else if ( !command.input ) {
	console.error( 'Error: You must supply an --input (-i) argument. Type sorcery --help for more info' );
}

else {
	sander.stat( command.input ).then( function ( stats ) {
		if ( stats.isDirectory() ) {
			return sander.lsr( command.input ).then( function ( files ) {
				files = files.filter( function ( file ) {
					return validExtensions[ path.extname( file ).slice( 1 ) ];
				});

				return files.reduce( function ( promise, file ) {
					return promise.then( function () {
						var input = path.join( command.input, file );
						var output = path.join( command.output || command.input, file );

						return sorcery.load( input ).then( function ( chain ) {
							return chain.write( output, {
								inline: command.datauri,
								includeContent: !command.excludeContent
							});
						});
					});
				}, Promise.resolve() );
			});
		}

		return sorcery.load( command.input ).then( function ( chain ) {
			return chain.write( command.output || command.input, {
				inline: command.datauri,
				includeContent: !command.excludeContent
			});
		});
	}).catch( function ( err ) {
		setTimeout( function () {
			throw err;
		});
	});
}
