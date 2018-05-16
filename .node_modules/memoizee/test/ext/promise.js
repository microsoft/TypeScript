/* eslint id-length: 0, handle-callback-err: 0, no-undef: 0, no-unused-vars: 0, func-names: 0 */

"use strict";

var memoize  = require("../..")
  , nextTick = require("next-tick")
  , Promise  = require("plain-promise");

module.exports = function () {
	return {
		"Regular": {
			Success: function (a, d) {
				var mfn, fn, i = 0, invoked = 0;
				fn = function (x, y) {
					return new Promise(function (res) {
						++i;
						res(x + y);
					});
				};

				mfn = memoize(fn, { promise: true });

				mfn(3, 7).done(function (res) {
					++invoked;
					a(res, 10, "Result #1");
				}, a.never);

				mfn(3, 7).done(function (res) {
					++invoked;
					a(res, 10, "Result #2");
				}, a.never);

				mfn(5, 8).done(function (res) {
					++invoked;
					a(res, 13, "Result B #1");
				}, a.never);

				mfn(3, 7).done(function (res) {
					++invoked;
					a(res, 10, "Result #3");
				}, a.never);

				mfn(5, 8).done(function (res) {
					++invoked;
					a(res, 13, "Result B #2");
				}, a.never);

				setTimeout(function () {
					a(i, 2, "Init Called");
					a(invoked, 5, "Cb Called");

					mfn(3, 7).done(function (res) {
						++invoked;
						a(res, 10, "Again: Result");
					}, a.never);

					mfn(5, 8).done(function (res) {
						++invoked;
						a(res, 13, "Again B: Result");
					}, a.never);

					setTimeout(function () {
						a(i, 2, "Init Called #2");
						a(invoked, 7, "Cb Called #2");

						mfn.delete(3, 7);

						mfn(3, 7).done(function (res) {
							++invoked;
							a(res, 10, "Again: Result");
						}, a.never);

						mfn(5, 8).done(function (res) {
							++invoked;
							a(res, 13, "Again B: Result");
						}, a.never);

						setTimeout(function () {
							a(i, 3, "Init  After delete");
							a(invoked, 9, "Cb After delete");
							d();
						}, 10);
					}, 10);
				}, 10);
			},
			Error: function (a, d) {
				var mfn, fn, i = 0, e = new Error("Test");
				fn = function (x, y) {
					++i;
					return new Promise(function (res, rej) {
						rej(e);
					});
				};

				mfn = memoize(fn, { promise: "done", dispose: a.never });

				mfn(3, 7).done(a.never, function (err) {
					a(err, e, "Result #1");
				});

				mfn(5, 8).done(a.never, function (err) {
					a(err, e, "Result B #2");
				});

				setTimeout(function () {
					a(i, 2, "Called #2");

					mfn(3, 7).done(a.never, function (err) {
						a(err, e, "Again: Result");
					});

					mfn(5, 8).done(a.never, function (err) {
						a(err, e, "Again B: Result");
					});

					setTimeout(function (err) {
						a(i, 4, "Again Called #2");
						d();
					}, 10);
				}, 10);
			}
		},
		"Primitive": {
			"Success": function (a, d) {
				var mfn, fn, i = 0;
				fn = function (x, y) {
					return new Promise(function (res) {
						++i;
						res(x + y);
					});
				};

				mfn = memoize(fn, { promise: true, primitive: true });

				mfn(3, 7).done(function (res) {
					a(res, 10, "Result #1");
				}, a.never);

				mfn(3, 7).done(function (res) {
					a(res, 10, "Result #2");
				}, a.never);

				mfn(5, 8).done(function (res) {
					a(res, 13, "Result B #1");
				}, a.never);

				mfn(3, 7).done(function (res) {
					a(res, 10, "Result #3");
				}, a.never);

				mfn(5, 8).done(function (res) {
					a(res, 13, "Result B #2");
				}, a.never);

				setTimeout(function () {
					a(i, 2, "Called #2");

					mfn(3, 7).done(function (res) {
						a(res, 10, "Again: Result");
					}, a.never);

					mfn(5, 8).done(function (res) {
						a(res, 13, "Again B: Result");
					}, a.never);

					setTimeout(function () {
						a(i, 2, "Again Called #2");

						mfn.delete(3, 7);

						mfn(3, 7).done(function (res) {
							a(res, 10, "Again: Result");
						}, a.never);

						mfn(5, 8).done(function (res) {
							a(res, 13, "Again B: Result");
						}, a.never);

						setTimeout(function () {
							a(i, 3, "Call After delete");
							d();
						}, 10);
					}, 10);
				}, 10);
			},
			"Error": function (a, d) {
				var mfn, fn, i = 0, e = new Error("Test");
				fn = function (x, y) {
					return new Promise(function (res, rej) {
						++i;
						rej(e);
					});
				};

				mfn = memoize(fn, { promise: "done", primitive: true });

				mfn(3, 7).done(a.never, function (err) {
					a(err, e, "Result #1");
				});

				mfn(5, 8).done(a.never, function (err) {
					a(err, e, "Result B #2");
				});

				setTimeout(function () {
					a(i, 2, "Called #2");

					mfn(3, 7).done(a.never, function (err) {
						a(err, e, "Again: Result");
					});

					mfn(5, 8).done(a.never, function (err) {
						a(err, e, "Again B: Result");
					});

					setTimeout(function (err) {
						a(i, 4, "Again Called #2");
						d();
					}, 10);
				}, 10);
			},
			"Primitive null arg case": function (a, d) {
				var mfn, x = {};
				mfn = memoize(
					function f(id) {
						return new Promise(function (res) {
							res(x);
						});
					},
					{
						promise: true,
						primitive: true
					}
				);

				mfn(null).done(function (res) {
					a.deep(res, x, "Args");
					d();
				}, a.never);
			}
		},
		"Sync Clear": function (a, d) {
			var mfn, fn;
			fn = function (x) {
				return new Promise(function (res) {
					nextTick(function () {
						res(x);
					});
				});
			};

			mfn = memoize(fn, { promise: true });

			mfn(1).done(function (res) {
				a(res, 1, "First");
			}, a.never);

			mfn(2).done(function (res) {
				a(res, 2, "Second");
				d();
			}, a.never);
		},
		"Sync Clear: Primitive": function (a, d) {
			var mfn, fn;
			fn = function (x) {
				return new Promise(function (res) {
					nextTick(function () {
						res(x);
					});
				});
			};

			mfn = memoize(fn, { promise: true, primitive: true });

			mfn(1).done(function (res) {
				a(res, 1, "First");
			}, a.never);

			mfn(2).done(function (res) {
				a(res, 2, "Second");
				d();
			}, a.never);
		}
	};
};
