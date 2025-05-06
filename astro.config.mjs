// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';


import netlify from '@astrojs/netlify';


// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  adapter: netlify()
});
