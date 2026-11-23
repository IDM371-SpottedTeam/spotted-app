import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from '$app/env/private';

// Config
	cloudinary.config({ 
		cloud_name: CLOUDINARY_CLOUD_NAME, 
		api_key: CLOUDINARY_API_SECRET, 
		api_secret: CLOUDINARY_API_KEY,
		secure: true
	});

//Upload to Cloudinary 
/** @type {import('./$types').Actions} */
export const actions = {
    upload: async ({ request }) => {
        const img_data = await request.formData()

        const img = img_data.get('uploaded_image')?.valueOf();

        console.log()
    }

}