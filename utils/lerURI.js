var Jimp = require('jimp/es');

const lerURI = (e) => {
  if (e.target.files) {
    const files = Array.from(e.target.files);

    return Promise.all(
      files.map((file, index) => {
        const imagemProcessada = Jimp.read(file)
          .then(
            image => {
              return image
                .resize(1000, 1000)
                .quality(60)
            }
          )

        console.log(imagemProcessada)

        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          console.log()
          reader.addEventListener("load", (ev) => {
            resolve({ result: ev.target.result, files: e.target.files[index] });
          });
          reader.addEventListener("error", reject);
          reader.readAsDataURL(file);
        });
      })
    );
  }
};

export default lerURI;
