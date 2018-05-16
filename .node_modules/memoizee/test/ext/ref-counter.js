/* eslint max-lines: 0, id-length: 0, no-undef: 0 */

"use strict";

var memoize  = require("../..")
  , nextTick = require("next-tick")
  , Promise  = require("plain-promise");

module.exports = function () {
	return {
		"Regular": function (a) {
			var i = 0
			  , fn = function (x, y, z) {
				++i;
				return x + y + z;
			}
			  , mfn;
			mfn = memoize(fn, { refCounter: true });
			a(mfn.deleteRef(3, 5, 7), null, "Delete before");
			a(mfn(3, 5, 7), 15, "Initial");
			a(mfn(3, 5, 7), 15, "Cache");
			a(mfn.deleteRef(3, 5, 7), false, "Delete #1");
			mfn(3, 5, 7);
			a(mfn.deleteRef(3, 5, 7), false, "Delete #2");
			mfn(3, 5, 7);
			a(mfn.deleteRef(3, 5, 7), false, "Delete #3");
			mfn(3, 5, 7);
			a(i, 1, "Not deleteed");
			a(mfn.deleteRef(3, 5, 7), false, "Delete #4");
			a(mfn.deleteRef(3, 5, 7), true, "Delete final");
			mfn(3, 5, 7);
			a(i, 2, "Restarted");
			mfn(3, 5, 7);
			a(i, 2, "Cached again");
		},
		"Regular: Async": function (a, d) {
			var mfn, fn, u = {}, i = 0;
			fn = function (x, y, cb) {
				nextTick(function () {
					++i;
					cb(null, x + y);
				});
				return u;
			};

			mfn = memoize(fn, { async: true, refCounter: true });

			a(mfn.deleteRef(3, 7), null, "Delete ref before");

			a(
				mfn(3, 7, function (err, res) {
					a.deep([err, res], [null, 10], "Result #1");
				}),
				u,
				"Initial"
			);
			a(
				mfn(3, 7, function (err, res) {
					a.deep([err, res], [null, 10], "Result #2");
				}),
				u,
				"Initial #2"
			);
			a(
				mfn(5, 8, function (err, res) {
					a.deep([err, res], [null, 13], "Result B #1");
				}),
				u,
				"Initial #2"
			);
			a(
				mfn(3, 7, function (err, res) {
					a.deep([err, res], [null, 10], "Result #3");
				}),
				u,
				"Initial #2"
			);
			a(
				mfn(5, 8, function (err, res) {
					a.deep([err, res], [null, 13], "Result B #2");
				}),
				u,
				"Initial #3"
			);

			nextTick(function () {
				a(i, 2, "Called #2");

				a(
					mfn(3, 7, function (err, res) {
						a.deep([err, res], [null, 10], "Again: Result");
					}),
					u,
					"Again: Initial"
				);
				a(
					mfn(5, 8, function (err, res) {
						a.deep([err, res], [null, 13], "Again B: Result");
					}),
					u,
					"Again B: Initial"
				);

				nextTick(function () {
					a(i, 2, "Again Called #2");

					a(mfn.deleteRef(3, 7), false, "Delete ref #1");
					a(mfn.deleteRef(3, 7), false, "Delete ref #2");
					a(mfn.deleteRef(3, 7), false, "Delete ref #3");
					a(mfn.deleteRef(3, 7), true, "Delete ref Final");

					a(
						mfn(3, 7, function (err, res) {
							a.deep([err, res], [null, 10], "Again: Result");
						}),
						u,
						"Again: Initial"
					);
					a(
						mfn(5, 8, function (err, res) {
							a.deep([err, res], [null, 13], "Again B: Result");
						}),
						u,
						"Again B: Initial"
					);

					nextTick(function () {
						a(i, 3, "Call After delete");
						d();
					});
				});
			});
		},
		"Regular: Promise": function (a, d) {
			var mfn, fn, i = 0;
			fn = function (x, y) {
				++i;
				return new Promise(function (res) {
					res(x + y);
				});
			};

			mfn = memoize(fn, { promise: true, refCounter: true });

			a(mfn.deleteRef(3, 7), null, "Delete ref before");

			mfn(3, 7).done(function (res) {
				a(res, 10, "Result #1");
			});
			mfn(3, 7).done(function (res) {
				a(res, 10, "Result #2");
			});
			mfn(5, 8).done(function (res) {
				a(res, 13, "Result B #1");
			});
			mfn(3, 7).done(function (res) {
				a(res, 10, "Result #3");
			});
			mfn(5, 8).done(function (res) {
				a(res, 13, "Result B #2");
			});

			setTimeout(function () {
				a(i, 2, "Called #2");

				mfn(3, 7).done(function (res) {
					a(res, 10, "Again: Result");
				});
				mfn(5, 8).done(function (res) {
					a(res, 13, "Again B: Result");
				});

				setTimeout(function () {
					a(i, 2, "Again Called #2");

					a(mfn.deleteRef(3, 7), false, "Delete ref #1");
					a(mfn.deleteRef(3, 7), false, "Delete ref #2");
					a(mfn.deleteRef(3, 7), false, "Delete ref #3");
					a(mfn.deleteRef(3, 7), true, "Delete ref Final");

					mfn(3, 7).done(function (res) {
						a(res, 10, "Again: Result");
					});
					mfn(5, 8).done(function (res) {
						a(res, 13, "Again B: Result");
					});

					setTimeout(function () {
						a(i, 3, "Call After delete");
						d();
					}, 10);
				}, 10);
			}, 10);
		},
		"Primitive": function (a) {
			var i = 0
			  , fn = function (x, y, z) {
				++i;
				return x + y + z;
			}
			  , mfn;
			mfn = memoize(fn, { primitive: true, refCounter: true });
			a(mfn.deleteRef(3, 5, 7), null, "Delete before");
			a(mfn(3, 5, 7), 15, "Initial");
			a(mfn(3, 5, 7), 15, "Cache");
			a(mfn.deleteRef(3, 5, 7), false, "Delete #1");
			mfn(3, 5, 7);
			a(mfn.deleteRef(3, 5, 7), false, "Delete #2");
			mfn(3, 5, 7);
			a(mfn.deleteRef(3, 5, 7), false, "Delete #3");
			mfn(3, 5, 7);
			a(i, 1, "Not deleteed");
			a(mfn.deleteRef(3, 5, 7), false, "Delete #4");
			a(mfn.deleteRef(3, 5, 7), true, "Delete final");
			mfn(3, 5, 7);
			a(i, 2, "Restarted");
			mfn(3, 5, 7);
			a(i, 2, "Cached again");
		},
		"Primitive: Async": function (a, d) {
			var mfn, fn, u = {}, i = 0;
			fn = function (x, y, cb) {
				nextTick(function () {
					++i;
					cb(null, x + y);
				});
				return u;
			};

			mfn = memoize(fn, { async: true, primitive: true, refCounter: true });

			a(mfn.deleteRef(3, 7), null, "Delete ref before");

			a(
				mfn(3, 7, function (err, res) {
					a.deep([err, res], [null, 10], "Result #1");
				}),
				u,
				"Initial"
			);
			a(
				mfn(3, 7, function (err, res) {
					a.deep([err, res], [null, 10], "Result #2");
				}),
				u,
				"Initial #2"
			);
			a(
				mfn(5, 8, function (err, res) {
					a.deep([err, res], [null, 13], "Result B #1");
				}),
				u,
				"Initial #2"
			);
			a(
				mfn(3, 7, function (err, res) {
					a.deep([err, res], [null, 10], "Result #3");
				}),
				u,
				"Initial #2"
			);
			a(
				mfn(5, 8, function (err, res) {
					a.deep([err, res], [null, 13], "Result B #2");
				}),
				u,
				"Initial #3"
			);

			nextTick(function () {
				a(i, 2, "Called #2");

				a(
					mfn(3, 7, function (err, res) {
						a.deep([err, res], [null, 10], "Again: Result");
					}),
					u,
					"Again: Initial"
				);
				a(
					mfn(5, 8, function (err, res) {
						a.deep([err, res], [null, 13], "Again B: Result");
					}),
					u,
					"Again B: Initial"
				);

				nextTick(function () {
					a(i, 2, "Again Called #2");

					a(mfn.deleteRef(3, 7), false, "Delete ref #1");
					a(mfn.deleteRef(3, 7), false, "Delete ref #2");
					a(mfn.deleteRef(3, 7), false, "Delete ref #3");
					a(mfn.deleteRef(3, 7), true, "Delete ref Final");

					a(
						mfn(3, 7, function (err, res) {
							a.deep([err, res], [null, 10], "Again: Result");
						}),
						u,
						"Again: Initial"
					);
					a(
						mfn(5, 8, function (err, res) {
							a.deep([err, res], [null, 13], "Again B: Result");
						}),
						u,
						"Again B: Initial"
					);

					nextTick(function () {
						a(i, 3, "Call After delete");
						d();
					});
				});
			});
		},
		"Primitive: Promise": function (a, d) {
			var mfn, fn, i = 0;
			fn = function (x, y) {
				++i;
				return new Promise(function (res) {
					res(x + y);
				});
			};

			mfn = memoize(fn, { promise: true, primitive: true, refCounter: true });

			a(mfn.deleteRef(3, 7), null, "Delete ref before");

			mfn(3, 7).done(function (res) {
				a(res, 10, "Result #1");
			});
			mfn(3, 7).done(function (res) {
				a(res, 10, "Result #2");
			});
			mfn(5, 8).done(function (res) {
				a(res, 13, "Result B #1");
			});
			mfn(3, 7).done(function (res) {
				a(res, 10, "Result #3");
			});
			mfn(5, 8).done(function (res) {
				a(res, 13, "Result B #2");
			});

			setTimeout(function () {
				a(i, 2, "Called #2");

				mfn(3, 7).done(function (res) {
					a(res, 10, "Again: Result");
				});
				mfn(5, 8).done(function (res) {
					a(res, 13, "Again B: Result");
				});

				setTimeout(function () {
					a(i, 2, "Again Called #2");

					a(mfn.deleteRef(3, 7), false, "Delete ref #1");
					a(mfn.deleteRef(3, 7), false, "Delete ref #2");
					a(mfn.deleteRef(3, 7), false, "Delete ref #3");
					a(mfn.deleteRef(3, 7), true, "Delete ref Final");

					mfn(3, 7).done(function (res) {
						a(res, 10, "Again: Result");
					});
					mfn(5, 8).done(function (res) {
						a(res, 13, "Again B: Result");
					});

					setTimeout(function () {
						a(i, 3, "Call After delete");
						d();
					}, 10);
				}, 10);
			}, 10);
		}
	};
};
