import { v2 as cloudinary } from 'cloudinary';
import { createClient } from '@supabase/supabase-js'
import { CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from '$app/env/private';
import { CLOUDINARY_UPLOAD_PRESET, PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$app/env/public'

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
const cloud_name = 'CLOUDINARY_CLOUD_NAME';
const upload_preset = 'CLOUDINARY_UPLOAD_PRESET';
const cloudinaryURL = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;
const form = document.querySelector('form');

//Uploads to Cloudinary + Optimizes Imgs
	export async function UploadImage() {

		// Config
		cloudinary.config({ 
			cloud_name: CLOUDINARY_CLOUD_NAME, 
			api_key: CLOUDINARY_API_SECRET, 
			api_secret: CLOUDINARY_API_KEY,
			secure: true
		});
		
		// Upload an image
		const uploadResult = await cloudinary.uploader
		.upload(
			'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg'
		)
		.catch((error) => {
			console.log(error);
		});
		
		console.log(uploadResult);
		
		// Optimize delivery by resizing and applying auto-format and auto-quality
		const optimizeUrl = cloudinary.url( uploadResult.public_id, {
			transformation: [{
				fetch_format: 'auto',
				quality: 'auto'
			}]
		});
		
		console.log(optimizeUrl);
		  
	};

//Uploads to Supabase
	export async function upload_to_supabase() {
		const { data, error } = await supabase
			.from('images')
			.insert([{image_link}])
			.select('cloudinaryURL')
			.single()

		if (error) throw error;
		return data.cloudinaryURL;
	};

