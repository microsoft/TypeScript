var temp: any;

// Error: incorrect type on left-hand side 
(! --temp) ** 3;
(!temp--) ** 3;
(!3) ** 4;
(!temp++) ** 4;
(!temp--) ** 4;

(! --temp) ** 3 ** 1;
(!temp--) ** 3 ** 1;
(!3) ** 4 ** 1;
(!temp++) ** 4 ** 1;
(!temp--) ** 4 ** 1;

(typeof --temp) ** 3;
(typeof temp--) ** 3;
(typeof 3) ** 4;
(typeof temp++) ** 4;
(typeof temp--) ** 4;

1 ** (typeof --temp) ** 3;
1 ** (typeof temp--) ** 3;
1 ** (typeof 3) ** 4;
1 ** (typeof temp++) ** 4;
1 ** (typeof temp--) ** 4;

(delete --temp) ** 3;
(delete ++temp) ** 3;
(delete temp--) ** 3;
(delete temp++) ** 3;

1 ** (delete --temp) ** 3;
1 ** (delete ++temp) ** 3;
1 ** (delete temp--) ** 3;
1 ** (delete temp++) ** 3;