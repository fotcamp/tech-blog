/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  images: {
    domains: ["prod-files-secure.s3.us-west-2.amazonaws.com", "www.notion.so"]
  }
};

export default nextConfig;
