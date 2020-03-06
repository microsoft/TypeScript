//// [complicatedIndexedAccessKeyofReliesOnKeyofNeverUpperBound.ts]
interface TextChannel {
    id: string;
    type: 'text';
    phoneNumber: string;
}

interface EmailChannel {
    id: string;
    type: 'email';
    addres: string;
}

type Channel = TextChannel | EmailChannel;

export type ChannelType = Channel extends { type: infer R } ? R : never;

type Omit<T, K extends keyof T> = Pick<
    T,
    ({ [P in keyof T]: P } & { [P in K]: never } & { [x: string]: never })[keyof T]
>;

type ChannelOfType<T extends ChannelType, A = Channel> = A extends { type: T }
    ? A
    : never;


export type NewChannel<T extends Channel> = Pick<T, 'type'> &
    Partial<Omit<T, 'type' | 'id'>> & { localChannelId: string };


export function makeNewChannel<T extends ChannelType>(type: T): NewChannel<ChannelOfType<T>> {
    const localChannelId = `blahblahblah`;
    return { type, localChannelId };
}

const newTextChannel = makeNewChannel('text');
// This should work
newTextChannel.phoneNumber = '613-555-1234';

const newTextChannel2 : NewChannel<TextChannel> = makeNewChannel('text');
// Compare with this, which ofc works.
newTextChannel2.phoneNumber = '613-555-1234';


//// [complicatedIndexedAccessKeyofReliesOnKeyofNeverUpperBound.js]
"use strict";
exports.__esModule = true;
exports.makeNewChannel = void 0;
function makeNewChannel(type) {
    var localChannelId = "blahblahblah";
    return { type: type, localChannelId: localChannelId };
}
exports.makeNewChannel = makeNewChannel;
var newTextChannel = makeNewChannel('text');
// This should work
newTextChannel.phoneNumber = '613-555-1234';
var newTextChannel2 = makeNewChannel('text');
// Compare with this, which ofc works.
newTextChannel2.phoneNumber = '613-555-1234';
