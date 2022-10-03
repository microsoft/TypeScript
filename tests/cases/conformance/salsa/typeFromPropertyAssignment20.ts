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
    })
