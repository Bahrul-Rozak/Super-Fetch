const cache = new Map();

export function setCache(key, data, ttl) {
    const expireAt = Date.now() + ttl;
    cache.set(key, { data, expireAt });
}

export function getCache(key) {
    const cached = cache.get(key);
    if (cached && cached.expireAt > Date.now()) {
        return cached.data;
    }
    cache.delete(key);
    return null;
}
