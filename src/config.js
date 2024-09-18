const config = {
    timeout: 5000, // Timeout 5 detik
    retries: 3,    // Retry maksimal 3 kali
    cacheTTL: 60000, // Cache TTL selama 1 menit
    concurrencyLimit: 5 // Maksimal 5 request bersamaan
};

export default config;
