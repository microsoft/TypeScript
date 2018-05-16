/**
 * travis-fold module
 */
module.exports = (function() {

	function encode(group) {
		return group.
			replace(/[^A-Za-z\d]+/g, '-').
			replace(/-$/, '');
	}

	function format(type, group) {
		return isTravis() ? ("travis_fold:" + type + ":" + encode(group)) : '';
	}

	function push(ret, type, group) {
		var fold = format(type, group);

		if (fold !== '' && typeof ret.push === 'function') {
			ret.push(fold);
		}
	}

	function isTravis() {
		var env = (typeof phantom !== 'undefined') ? require('system').env : process.env; // PhantomJS / node.js
		return env.TRAVIS === 'true';
	}

	// expose public API
	return {
		start: function(group) {
			return format('start', group);
		},
		end: function(group) {
			return format('end', group);
		},

		wrap: function(group, content) {
			return [
				this.start(group),
				(content || '').trim(),
				this.end(group)
			].join('\n').trim();
		},

		pushStart: function(ret, group) {
			push(ret, 'start', group);
		},
		pushEnd: function(ret, group) {
			push(ret, 'end', group);
		},

		isTravis: isTravis
	};
})();
