===ORIGINAL===

namespace M
{
    namespace M2
    {
        function foo() {
            // comment 1
            const x = 1;

            /**
             * comment 2 line 1
             * comment 2 line 2
             */
            function f() {
                return 100;
            }
            const y = 2; // comment 3
            return 1;
        }
    }
}
===MODIFIED===

namespace M
{
    function bar(): any
    {
        /**
         * comment 2 line 1
         * comment 2 line 2
         */
        function f()
        {
            return 100;
        }
        const y = 2; // comment 3
        return 1;
    }
    namespace M2
    {
        function foo() {
            // comment 1
            const x = 1;

            return bar();
        }
    }
}