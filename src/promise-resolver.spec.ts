import { describe, expect, it } from '@jest/globals';

import { PromiseResolver } from "./promise-resolver";

describe('PromiseResolver', () => {
    it('should be able to resolve with `void`', () => {
        const resolver = new PromiseResolver<void>();
        expect(resolver.state).toBe('running');

        resolver.resolve();
        expect(resolver.state).toBe('resolved');
        expect(resolver.promise).resolves.toBe(undefined);
    });

    it('should be able to resolve with a value', () => {
        const resolver = new PromiseResolver<number>();

        resolver.resolve(42);
        expect(resolver.state).toBe('resolved');
        expect(resolver.promise).resolves.toBe(42);
    });

    it('should be able to reject with anything', () => {
        const resolver = new PromiseResolver<void>();

        const message = Date.now().toString();
        resolver.reject(new Error(message));
        expect(resolver.state).toBe('rejected');
        expect(resolver.promise).rejects.toHaveProperty('message', message);
    });
});
