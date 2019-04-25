declare function takeTwo(a: string, b: string): void;
declare const t2: [string, string];
declare const t3: [string, string, string];

takeTwo('a', ...t2); // error on ...t2
takeTwo('a', 'b', 'c', ...t2); // error on 'c' and ...t2
takeTwo('a', 'b', ...t2, 'c'); // error on ...t2 and 'c'
takeTwo('a', 'b', 'c', ...t2, 'd'); // error on 'c', ...t2 and 'd'
takeTwo(...t2, 'a'); // error on 'a'
takeTwo(...t3); // error on ...t3