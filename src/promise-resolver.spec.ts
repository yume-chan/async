import { PromiseResolver } from "./promise-resolver";

describe('promise resolver', () => {
  test('resolve void', () => {
    const resolver = new PromiseResolver<void>();

    expect(resolver.state).toBe('running');

    resolver.resolve();

    expect(resolver.state).toBe('resolved');
    expect(resolver.promise).resolves.toBe(undefined);
  });

  test('resolve value', () => {
    const resolver = new PromiseResolver<number>();

    resolver.resolve(42);

    expect(resolver.state).toBe('resolved');
    expect(resolver.promise).resolves.toBe(42);
  });

  test('reject', () => {
    const resolver = new PromiseResolver<void>();

    const message = Date.now().toString();
    resolver.reject(new Error(message));

    expect(resolver.state).toBe('rejected');
    expect(resolver.promise).rejects.toHaveProperty('message', message);
  });
});
