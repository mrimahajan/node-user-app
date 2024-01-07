// eslint-disable-next-line import/prefer-default-export
export const uploadFileHandler = (req, res) => {
  // The uploaded file can be accessed via req.file
  // console.log(req.file);
  res.json({ success: true, message: 'File uploaded!' });
};
