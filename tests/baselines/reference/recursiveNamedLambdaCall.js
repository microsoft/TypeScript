//// [recursiveNamedLambdaCall.ts]
var promise = function( obj ) {
	
		if ( top && top.doScroll ) {
			(function doScrollCheck() {
				if ( false ) {

					try {
						top.doScroll("left");
					} catch(e) {
						return setTimeout( doScrollCheck, 50 );
					}

					// detach all dom ready events
					detach();

				}
			})();
		}
};

//// [recursiveNamedLambdaCall.js]
var promise = function (obj) {
    if (top && top.doScroll) {
        (function doScrollCheck() {
            if (false) {
                try {
                    top.doScroll("left");
                }
                catch (e) {
                    return setTimeout(doScrollCheck, 50);
                }
                // detach all dom ready events
                detach();
            }
        })();
    }
};
