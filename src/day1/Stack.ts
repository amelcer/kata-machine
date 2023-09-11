type Node<T> = {
    next?: Node<T>;
    value: T;
};

export default class Stack<T> {
    public length: number;

    private head: Node<T> | undefined;

    constructor() {
        this.length = 0;
    }

    push(item: T): void {
        this.length++;
        if (!this.head) {
            this.head = {
                value: item,
            };

            return;
        }

        const node: Node<T> = {
            value: item,
            next: this.head,
        };

        this.head = node;
    }

    pop(): T | undefined {
        if (!this.head) {
            return undefined;
        }
        this.length--;

        const value = this.head.value;
        this.head = this.head.next;

        return value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
