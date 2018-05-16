'use strict';

var BEEP_DELAY = 500;

function beep() {
	process.stdout.write('\u0007');
}

function melodicalBeep(val, cb) {
	if (val.length === 0) {
		cb();
		return;
	}

	setTimeout(function () {
		if (val.shift() === '*') {
			beep();
		}

		melodicalBeep(val, cb);
	}, BEEP_DELAY);
}

module.exports = function (val, cb) {
	if (!process.stdout.isTTY ||
		process.argv.indexOf('--no-beep') !== -1 ||
		process.argv.indexOf('--beep=false') !== -1) {
		return;
	}

	cb = cb || function () {};

	if (val === parseInt(val)) {
		if (val < 0) {
			throw new TypeError('Negative numbers are not accepted');
		}

		if (val === 0) {
			cb();
			return;
		}

		for (var i = 0; i < val; i++) {
			setTimeout(function (i) {
				beep();

				if (i === val - 1) {
					cb();
				}
			}, BEEP_DELAY * i, i);
		}
	} else if (!val) {
		beep();
		cb();
	} else if (typeof val === 'string') {
		melodicalBeep(val.split(''), cb);
	} else {
		throw new TypeError('Not an accepted type');
	}
};
