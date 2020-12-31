import AsyncOperationManager from "./index";

describe('async operation manager', () => {
    test('return value', () => {
        const manager = new AsyncOperationManager();
        expect(manager.add()).toStrictEqual([0, expect.any(Promise)]);
    });

    test('custom initial id', () => {
        const id = 65535;
        const manager = new AsyncOperationManager(id);
        expect(manager.add()).toStrictEqual([id, expect.any(Promise)]);
    });

    test('resolve', () => {
        const manager = new AsyncOperationManager();
        const [id, promise] = manager.add<number>();

        expect(manager.resolve(id, 42)).toBe(true);
        expect(promise).resolves.toBe(42);
    });

    test('resolve non-exist operation', () => {
        const manager = new AsyncOperationManager();
        expect(manager.resolve(0, 42)).toBe(false);
    });

    test('reject', () => {
        const manager = new AsyncOperationManager();

        const [id, promise] = manager.add<number>();

        const message = Date.now().toString();
        expect(manager.reject(id, new Error(message))).toBe(true);
        expect(promise).rejects.toHaveProperty('message', message);
    });

    test('reject non-exist operation', () => {
        const manager = new AsyncOperationManager();
        expect(manager.reject(0, new Error())).toBe(false);
    });
});
