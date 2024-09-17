import { HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { URL } from "url";

const BUCKET = process.env.AWS_BUCKET_NAME;
export const S3_IMAGE_DOMAIN = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`;

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  }
});

const extractFileNameFromNotionUrl = (urlString: string): string => {
  const url = new URL(urlString);
  const pathParts = url.pathname.split("/");
  const fileNameWithExtension = pathParts[pathParts.length - 1];

  return fileNameWithExtension || "unknown";
};

const generateFileName = (imageUrl: string): string => {
  const id = extractFileNameFromNotionUrl(imageUrl);
  const decodedFileName = decodeURIComponent(id);

  return decodedFileName;
};

const downloadImageToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer.toString("base64");
  } catch (error) {
    console.error("Error downloading image:", error);
    throw error;
  }
};

const checkIfImageExists = async (fileName: string): Promise<boolean> => {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: fileName }));
    return true;
  } catch (error) {
    return false;
  }
};

const uploadS3Image = async (image: string, fileName: string): Promise<string> => {
  try {
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const params = {
      Bucket: BUCKET,
      Key: fileName,
      Body: buffer,
      ContentEncoding: "base64",
      ContentType: "image/jpg"
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    return `${S3_IMAGE_DOMAIN}/${fileName}`;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
};

const convertImageUrl = async (notionImageUrl: string): Promise<string> => {
  try {
    const fileName = generateFileName(notionImageUrl);
    const hasS3Image = await checkIfImageExists(fileName);

    if (!hasS3Image) {
      const imageBuffer = await downloadImageToBase64(notionImageUrl);
      return await uploadS3Image(imageBuffer, fileName);
    } else {
      return `${S3_IMAGE_DOMAIN}/${fileName}`;
    }
  } catch (error) {
    console.error(`Failed to convert image URL: ${notionImageUrl}`, error);
    throw error;
  }
};

export { convertImageUrl };
