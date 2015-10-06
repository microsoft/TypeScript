// @target: es5
var temp: any;

(<number>temp) ** 3;
(<number>--temp) ** 3;
(<number>++temp) ** 3;
(<number>temp--) ** 3;
(<number>temp++) ** 3;

1 ** (<number>--temp) ** 3;
1 ** (<number>++temp) ** 3;
1 ** (<number>temp--) ** 3;
1 ** (<number>temp++) ** 3;

(void --temp) ** 3;
(void temp--) ** 3;
(void 3) ** 4;
(void temp++) ** 4;
(void temp--) ** 4;


1 ** (void --temp) ** 3;
1 ** (void temp--) ** 3;
1 ** (void 3) ** 4;
1 ** (void temp++) ** 4;
1 ** (void temp--) ** 4;

(~ --temp) ** 3;
(~ temp--) ** 3;
(~ 3) ** 4;
(~ temp++) ** 4;
(~ temp--) ** 4;

1 ** (~ --temp) ** 3;
1 ** (~ temp--) ** 3;
1 ** (~ 3) ** 4;
1 ** (~ temp++) ** 4;
1 ** (~ temp--) ** 4;