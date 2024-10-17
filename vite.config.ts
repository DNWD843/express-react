import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// eslint-disable-next-line no-restricted-exports, import/no-default-export
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@base': path.resolve(dirname, 'src-base'),
            '@client': path.resolve(dirname, 'src-client'),
        },
    },
})
