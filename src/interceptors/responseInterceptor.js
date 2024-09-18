const responseInterceptors = [];

export function addResponseInterceptor(interceptor) {
    responseInterceptors.push(interceptor);
}

export async function applyResponseInterceptors(response) {
    let modifiedResponse = response;

    for (const interceptor of responseInterceptors) {
        modifiedResponse = await interceptor(modifiedResponse);
    }

    return modifiedResponse;
}
