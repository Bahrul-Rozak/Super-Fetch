export function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isRetryableError(status) {
    return [500, 502, 503, 504].includes(status);
}
