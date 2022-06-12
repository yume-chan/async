import { describe, expect, it } from '@jest/globals';

import { delay } from "./delay";

describe('delay', () => {
    it('should resolve after timeout', async () => {
        const promise = delay(100);
        await expect(promise).resolves.toBeUndefined();
    });
})
