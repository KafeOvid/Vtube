import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


// Configuration
cloudinary.config({ 
        cloud_name: CLOUDINARY_CLOUD_NAME, 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) {
            throw new Error('No file path provided');
        }
        const response = await cloudinary.uploader.upload(
           localFilePath, {
               resource_type: "auto"// Automatically detect resource type (image, video, etc.)
           })
       .catch((error) => {
           console.log(error);
       });
       console.log('File uploaded successfully');
       response.url();
    return response;
    }
    catch(error) {
        fs.unlinkSync(localFilePath); // Clean up local file if upload fails
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
} 

export default uploadOnCloudinary;