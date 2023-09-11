export default class ArrayList<T> {
    public length: number;
    private capacity: number;
    private array: Array<T | undefined>;

    constructor(capacity: number) {
        this.length = 0;
        this.capacity = capacity;
        this.array = new Array<T | undefined>(capacity);
    }

    prepend(item: T): void {
        const arrayCopy = this.array.slice();
        this.array[0] = item;

        if (this.length >= this.capacity) {
            this.capacity += this.capacity;
            this.array = new Array<T | undefined>(this.capacity);
        }

        this.length++;
        for (let i = 1; i < this.length; i++) {
            this.array[i] = arrayCopy[i - 1];
        }
    }

    insertAt(item: T, idx: number): void {
        if (idx >= this.length || idx < 0) {
            return;
        }

        const arrayCopy = this.array.slice();
        this.array[idx] = item;

        if (idx > 0) {
            for (let i = 0; i < idx; i++) {
                this.array[i] = arrayCopy[i];
            }
        }

        if (idx !== this.length - 1) {
            for (let i = idx + 1; i < idx; i++) {
                this.array[i] = arrayCopy[i];
            }
        }
    }

    append(item: T): void {
        if (this.length >= this.capacity) {
            const arrayCopy = this.array.slice();

            this.capacity += this.capacity;
            this.array = new Array<T | undefined>(this.capacity);

            for (let i = 0; i < this.length; i++) {
                this.array[i] = arrayCopy[i];
            }
        }

        this.array[this.length] = item;

        this.length++;
    }

    remove(item: T): T | undefined {
        let element;
        let elementIndex;
        for (let i = 0; i < this.length; i++) {
            if (this.array[i] === item) {
                element = item;
                elementIndex = i;
                break;
            }
        }

        const arrayCopy = this.array.slice();
        if (typeof elementIndex === "number" && elementIndex >= 0) {
            for (let i = elementIndex; i < this.length; i++) {
                this.array[i] = arrayCopy[i + 1] || undefined;
            }
            this.length--;
        }

        return element;
    }

    get(idx: number): T | undefined {
        if (idx >= this.length || idx < 0) {
            return undefined;
        }

        return this.array[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.length || idx < 0) {
            return undefined;
        }
        const arrayCopy = this.array.slice();
        const element = this.array[idx];

        for (let i = idx; i < this.length; i++) {
            this.array[i] = arrayCopy[i + 1] || undefined;
        }

        this.length--;
        return element;
    }
}
