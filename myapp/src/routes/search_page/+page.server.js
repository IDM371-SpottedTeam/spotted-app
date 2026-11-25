import { v2 as cloudinary } from 'cloudinary';
import { createClient } from '@supabase/supabase-js'
import { CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from '$app/env/private';
import { CLOUDINARY_UPLOAD_PRESET, PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$app/env/public'

// Config Stuff
	cloudinary.config({ 
		cloud_name: CLOUDINARY_CLOUD_NAME, 
		api_key: CLOUDINARY_API_KEY, 
		api_secret: CLOUDINARY_API_SECRET,
		secure: true
	});

	const cloudinaryURL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
	let img_URL = '';

//Image Upload
	/** @type {import('./$types').Actions} */
	export const actions = {
		upload: async ({ request }) => {
			//Gets img from form
			const img_data = await request.formData()
			const img = img_data.get('uploaded_image');

			if (!img) {
				console.log('No image submitted');
				return;
			}

			//Uploads to Cloudinary 
			img_data.append('file', img);
			img_data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

			const uploadResult = await fetch(
				cloudinaryURL, {
					method: 'POST',
					body: img_data
				}
			)
			
			if (!uploadResult.ok) {
				console.log('Cloudinary upload failed');
				return;
			}

			//Gets Cloudinary img link
			const img_URL = await uploadResult.json();
			const secure_img_URL = img_URL.secure_url;

			//Uploads to Supabase
			const { error } = await supabase
				.from('images')
				.insert([{
					image_link: secure_img_URL
				}])
				
			if (error) {
				console.log('Supabase error:', error);
			} else {
				console.log('Successfully added image URL to Supabase');
			};

			return {
				success: true,
				secure_img_URL: secure_img_URL
			};
		}
	}