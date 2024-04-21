let config = {
    production: {
        // env,
        domain: 'localhost',
        hostname: `https://countries-server-test.vercel.app`,
        fronthostname: "http://192.168.1.101:5173"
    },
    development: {
        // env,
        domain: 'localhost',
        hostname: `http://localhost:3000`,
        fronthostname: "http://localhost:5173"
    }
};

export default config;