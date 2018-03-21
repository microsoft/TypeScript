// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: bluebird.js

!function outer (f) { return f }(
    function inner () {
        function Async() {
            this._trampolineEnabled = true;
        }

        Async.prototype.disableTrampolineIfNecessary = function dtin(b) {
            if (b) {
                this._trampolineEnabled = false;
            }
        };
        var a = new Async()
        a._trampolineEnabled = true;
        a.disableTrampolineIfNecessary(false);
    })
