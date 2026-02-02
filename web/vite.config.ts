import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  server: {
    headers: {
      'Content-Security-Policy':
        [
          // Necessary for development (app + Vite)
          // "connect-src 'self' ws://localhost:8080", // 8443
          // "connect-src 'self' ws://petermichon.fr:8080",
          "script-src 'self' blob:", // 'strict-dynamic'
          "worker-src 'self' blob:",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self'",
          "manifest-src 'self'",

          // Block everything else
          // "default-src 'none'",
          "font-src 'none'",
          "media-src 'none'",
          "object-src 'none'",
          "frame-src 'none'",
          "child-src 'none'",
          "form-action 'none'",
          "base-uri 'none'",
          "frame-ancestors 'none'",
          // 'upgrade-insecure-requests',
        ].join('; ') + ';',
    },
  },
})
