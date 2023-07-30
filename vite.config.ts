import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path' // @types/node

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src/'), // @types/node
		},
	},
})
