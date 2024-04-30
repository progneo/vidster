/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5277/api/:path*'
            }
        ]
    },
    reactStrictMode: true,
    output: 'standalone'
};

export default nextConfig;
