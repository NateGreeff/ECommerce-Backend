const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const catagoryData = await Category.findAll({include: [{ model: Product }]});
    const catagories = catagoryData.map((catagory) => catagory.get({ plain: true }));
    return res.status(200).json(catagories);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
      
      const catagoryData = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
  
      if (!catagoryData) {
        res.status(404).json({ message: 'No catagory found with this id!' });
        return;
      }
  
      const catagory = catagoryData.get({ plain: true });
  
      res.status(200).json(catagory);
} catch (err) {
      res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((catagory) => {
    res.status(200).json(catagory);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id },
  })
  .then((catagory) => {
    res.status(200).json(catagory);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({ where: { id: req.params.id } })
  .then((catagory) => {
    res.status(200).json(catagory);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;