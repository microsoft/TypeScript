interface MsgConstructor<T extends Message> {
  new(data: Array<{}>): T;
}
class Message {
  clone(): this {
    return this;
  }
}
interface MessageList<T extends Message> extends Message {
  methodOnMessageList(): T[];
}

function fetchMsg<V extends Message>(protoCtor: MsgConstructor<V>): V {
  return null!;
}

class DataProvider<T extends Message, U extends MessageList<T>> {
  constructor(
    private readonly message: MsgConstructor<T>,
    private readonly messageList: MsgConstructor<U>,
  ) { }

  fetch() {
    const messageList = fetchMsg(this.messageList);
    messageList.methodOnMessageList();
  }
}

// The same bug as the above but using indexed accesses
// (won't surface directly unless unsound indexed access assignments are forbidden)
function f<
  U extends {TType: MessageList<T>},
  T extends Message
>(message: MsgConstructor<T>, messageList: MsgConstructor<U["TType"]>) {
  fetchMsg(messageList).methodOnMessageList();
}
