const router = require("express").Router();
const { Category, Product } = require("../../models");

//finds all the categories in the db
router.get("/", (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })

    .then((dbCatData) => {
      if (!dbCatData) {
        res.status(404).json({ message: "No categories found" });
        return;
      }
      res.json(dbCatData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//finds one category in the db
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })

    .then((dbCatData) => {
      if (!dbCatData) {
        res.status(404).json({ message: "No categories found" });
        return;
      }
      res.json(dbCatData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // creates a new category
  Category.create({ category_name: req.body.category_name })
    .then((dbCatData) => res.json(dbCatData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // updates the category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })

    .then((dbCatData) => {
      if (!dbCatData) {
        res.status(404).json({ message: "No id found in this category" });
        return;
      }
      res.json(dbCatData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // deletes a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })

    .then((dbCatData) => {
      if (!dbCatData) {
        res.status(404).json({ message: "No id found in this category" });
        return;
      }
      res.json(dbCatData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
