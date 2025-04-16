export default {
	build: {
		cssMinify: false,
		rollupOptions: {
			output: {
				entryFileNames: 'js/main.js',
				assetFileNames: ({ name }) => {
					if (name && name.endsWith('.css')) {
						return 'css/styles.css';
					}
					return 'assets/[name]-[hash][extname]';
				},
				chunkFileNames: 'js/[name]-[hash].js',
			}
		}
	},
}