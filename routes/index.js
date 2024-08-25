import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Mercado Libre Challenge' });
});

export default router;