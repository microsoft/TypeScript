export default function slash ( path ) {
	return typeof path === 'string' ?
		path.replace( /\\/g, '/' ) :
		path;
}
