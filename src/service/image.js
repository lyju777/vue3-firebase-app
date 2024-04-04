import { readAndCompressImage } from 'browser-image-resizer';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from 'src/boot/firebase';
import { v4 as uuidv4 } from 'uuid';

export async function uploadImage(file) {
  const fileName = `images/${uuidv4()}.${getExtension(file.name)}`;
  const storageRef = ref(storage, fileName);
  console.log('fileName:', fileName);
  const thumbnail = await compressImage(file);
  const uploadResult = await uploadBytes(storageRef, thumbnail);
  const downloadURL = await getDownloadURL(uploadResult.ref);
  console.log('downloadURL:', downloadURL);
  return downloadURL;
}

function getExtension(fileName) {
  return fileName.split('.').pop();
}

async function compressImage(file) {
  return readAndCompressImage(file, {
    quality: 0.8,
  });
}
