# path-platform

This is a transitional package for those not on 0.12 that provides a compatible
interface to the builtin `path` module, but adds `path.posix` and `path.win32`
so you can `path.posix.normalize` on a win32 platform, or vice versa.
