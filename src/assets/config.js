let config = {
    production: {
        hostname: `https://countries-server-test.vercel.app`,
        fronthostname: "https://countries-test-red.vercel.app"
    },
    development: {
        hostname: `http://localhost:3000`,
        fronthostname: "http://localhost:5173"
    }
};

export default config;