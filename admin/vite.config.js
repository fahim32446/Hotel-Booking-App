import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})



// export default defineConfig(({command, mode}) => ({
//   plugins: [react()],
//   server: {
//       port: 8081,
//       proxy: {
//           '/api': {
//               target: 'http://localhost:8080/trunk',
//               changeOrigin: true,
//           },
//       },
//   },
// }));