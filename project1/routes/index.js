const express = require('express');
const router = express.Router();

// Rota principal de boas-vindas (Step 2)
router.get('/', (req, res) => {
  res.send('Hello World');
});

// Redireciona tudo o que for /contacts para o ficheiro de rotas de contatos
router.use('/contacts', require('./contacts'));

module.exports = router;