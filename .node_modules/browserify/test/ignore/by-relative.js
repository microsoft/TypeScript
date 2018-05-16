/**
 * This test is to check to make sure that files that are ignored do not get
 * bundled when referenced with a nested relative path.
 */
t.deepEqual(require('./relative'), {});
