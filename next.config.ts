import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  /* Allow loading images from the Rick and Morty API */
  images: {
    remotePatterns: [new URL('https://rickandmortyapi.com/api/character/avatar/**')],
  },
};

export default nextConfig;
