var fs = require( 'fs' ),
	path = require( 'path' );

module.exports = function ( stream ) {
	fs.readFile( path.join( __dirname, 'help.md' ), function ( err, result ) {
		var help;

		if ( err ) throw err;

		help = result.toString().replace( '<%= version %>', require( '../package.json' ).version );
		( stream || process.stderr ).write( '\n' + help + '\n' );
	});
};