import Resizer from 'react-image-file-resizer';

const lerURI = (e) => {
  if (e.target.files) {
    const files = Array.from(e.target.files);

    return Promise.all(
      files.map((file, index) => {
        
   
        const resizeFile = () =>
        new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            1000,
            1000,
            "JPEG",
            60,
            0,
            (uri) => {
              resolve(uri);
            },
            "file"
          );
        });

        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener("load", async (ev) => {
            resolve({ result: ev.target.result, files: await resizeFile() });
          });
          reader.addEventListener("error", reject);
          (async() => {          
            reader.readAsDataURL(await resizeFile());
          })();
        });
      })
    );
  }
};

export default lerURI;
