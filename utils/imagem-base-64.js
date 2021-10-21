export const base64 = (files) => {
  const fileToLoad = files[0];
  const fileReader = new FileReader();
  let base64;

  fileReader.onload = function (fileLoadedEvent) {
    base64 = fileLoadedEvent.target.result; // <--- data: base64
  }

  return fileReader.readAsDataURL(fileToLoad);
}