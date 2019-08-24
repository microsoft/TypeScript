declare function takeTwo(a: string, b: string): void;
declare const t2: [string, string];
declare const t3: [string, string, string];
declare function takeTwoOrMore (a: string, b: string, ...c: string[]): void
declare const t4: [string, string, ...string[]]
declare const t5: string[]

// error
takeTwo('a', ...t2); // error on ...t2
takeTwo('a', 'b', 'c', ...t2); // error on 'c' and ...t2
takeTwo('a', 'b', ...t2, 'c'); // error on ...t2 and 'c'
takeTwo('a', 'b', 'c', ...t2, 'd'); // error on 'c', ...t2 and 'd'
takeTwo(...t2, 'a'); // error on 'a'
takeTwo(...t3); // error on ...t3

// ok
takeTwoOrMore(...t4);
takeTwoOrMore(...t4, ...t5);
takeTwoOrMore(...t4, ...t4);
takeTwoOrMore(...t5, ...t4);
