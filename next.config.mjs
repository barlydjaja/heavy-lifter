import NextPWA from 'next-pwa'

const withPWA = NextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})
  
/** @type {import('next').NextConfig} */
const nextConfig = {
// your existing config
}
  
export default withPWA(nextConfig)