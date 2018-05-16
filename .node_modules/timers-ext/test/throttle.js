"use strict";

module.exports = function (t, a, d) {
	var called = 0;
	var fn = t(function () {
		++called;
	}, 100);

	fn();
	a(called, 1);
	fn();
	fn();
	a(called, 1);
	// Wait 60ms
	setTimeout(function () {
		a(called, 1);
		fn();
		// Wait 60ms
		setTimeout(function () {
			a(called, 2);
			fn();
			fn();

			// Wait 40ms
			setTimeout(function () {
				a(called, 2);

				// Wait 60ms
				setTimeout(function () {
					a(called, 3);

					// Wait 200ms
					setTimeout(function () {
						a(called, 3);
						d();
					}, 200);
				}, 60);
			}, 40);
		}, 60);
	}, 60);
};
