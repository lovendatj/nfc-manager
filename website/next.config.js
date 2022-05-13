/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'http://localhost:3000',
    AUTH_URL: 'http://localhost:5000/api/auth',
    NEXTAUTH_URL: 'http://localhost:3000/api/auth'
  }
}

module.exports = nextConfig
