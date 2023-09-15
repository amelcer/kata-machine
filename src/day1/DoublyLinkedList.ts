type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    prepend(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;

        if (!this.head) {
            this.head = node;
            this.tail = node;

            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (this.length < idx) {
            throw new Error("out of index");
        } else if (this.length === idx) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }

        this.length++;

        let curr = this.head;
        for (let i = 0; curr?.next && i < idx; i++) {
            curr = curr.next;
        }

        curr = curr as Node<T>;
        const node: Node<T> = { value: item };

        node.next = curr;
        node.prev = curr?.prev;
        curr.prev = node;

        if (node.prev) {
            node.prev.next = curr;
        }
    }

    append(item: T): void {
        if (!this.tail) {
            this.prepend(item);
            return;
        }

        this.length++;

        const node: Node<T> = { value: item };
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            if (item === curr.value) {
                break;
            }
            curr = curr.next;
        }

        if (!curr) {
            return undefined;
        }

        this.length--;
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;

            return out;
        }

        if (curr.prev) {
            curr.prev.next = curr.next;
        }

        if (curr.next) {
            curr.next.prev = curr.prev;
        }

        if (curr === this.head) {
            this.head = curr.next;
        }

        if (curr === this.tail) {
            this.tail = curr.prev;
        }

        curr.prev = undefined;
        curr.next = undefined;

        return curr.value;
    }

    get(idx: number): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }

        return curr?.value;
    }

    removeAt(idx: number): T | undefined {
        const value = this.get(idx);

        if (value) {
            this.remove(value);
        }

        return value;
    }
}
