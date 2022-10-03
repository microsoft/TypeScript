module Bugs {
                export interface IToken {
                                startIndex:number;
                                type:string;
                                bracket:number;
                }
                
                export interface IState {
                }

                export interface IStateToken extends IToken {
                                state: IState;
                                length: number;
                }
                
                function bug3() {
                                var tokens:IToken[]= [];
                                tokens.push({ startIndex: 1, type: '', bracket: 3 });
                                tokens.push(<IToken>({ startIndex: 1, type: '', bracket: 3, state: null, length: 10 }));
                }
}