import { saveAs } from 'file-saver';

export function dataURLToFile(dataURL: string = '') {
  const arr = dataURL.split(',');
  const bstr = atob(arr[1]);
  const type = arr[0].replace('data:', '').replace(';base64', '');
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], 'file', { type });
}

export { saveAs };
