class ConcurrencyManager {
    constructor(limit) {
        this.limit = limit;
        this.running = 0;
        this.queue = [];
    }

    async run(task) {
        if (this.running >= this.limit) {
            await new Promise((resolve) => this.queue.push(resolve));
        }
        this.running++;
        const result = await task();
        this.running--;

        if (this.queue.length > 0) {
            const next = this.queue.shift();
            next();
        }

        return result;
    }
}

export default ConcurrencyManager;
