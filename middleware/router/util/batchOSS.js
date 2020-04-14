'use static';

const upFiles = ossList => {
  return new Promise((resolve, reject) => {
    Promise.all([...ossList])
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })
  });
};

module.exports = upFiles;
