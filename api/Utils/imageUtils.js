import multer from 'multer';

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/'); // Pasta de destino
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Nome do arquivo
  }
});

const ImageUtils = multer({ storage });

export default ImageUtils;
