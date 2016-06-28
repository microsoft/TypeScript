//// [typeParameterDiamond2.ts]
function diamondTop<Top>() {
    function diamondMiddle<T extends Top, U>() {
        function diamondBottom<Bottom extends T | U>() {
            var top: Top;
            var middle: T | U;
            var bottom: Bottom;

            top = middle;
            middle = bottom;
            top = bottom;
        }
    }
}

//// [typeParameterDiamond2.js]
function diamondTop() {
    function diamondMiddle() {
        function diamondBottom() {
            var top;
            var middle;
            var bottom;
            top = middle;
            middle = bottom;
            top = bottom;
        }
    }
}
