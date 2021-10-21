const lerURI = (e) => {
  if (e.target.files) {
    const files = Array.from(e.target.files);

    return Promise.all(
      files.map((file, index) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener("load", (ev) => {
            resolve({result: ev.target.result, files: e.target.files[index]});
          });
          reader.addEventListener("error", reject);
          reader.readAsDataURL(file);
        });
      })
    );
  }
};

export default lerURI;
