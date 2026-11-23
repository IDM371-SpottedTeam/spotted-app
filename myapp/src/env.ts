import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	CLOUDINARY_API_SECRET: {},
    CLOUDINARY_API_KEY: {},
    CLOUDINARY_CLOUD_NAME:{},
    CLOUDINARY_UPLOAD_PRESET:{
        public: true
    },
    PUBLIC_SUPABASE_URL: {
        public: true
    },
    PUBLIC_SUPABASE_ANON_KEY: {
        public: true
    },
});