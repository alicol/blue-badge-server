const router = require("express").Router();
const Recipe = require("../db").import("../models/recipe");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validateSession = require("../middleware/validate-session");
let sequelize = require("../db");

//Create Log (good)

router.post("/create", validateSession, (req, res) => {
    const recipe = {
      recipeName: req.body.recipe.recipeName,
      category: req.body.recipe.category,
      source: req.body.recipe.source,
      yield: req.body.recipe.yield,
      ingredients: req.body.recipe.ingredients,
      directions: req.body.recipe.directions,
      notes: req.body.recipe.notes,
      rating: req.body.recipe.rating,
      owner: req.user.id,
    };
    Recipe.create(recipe)
      .then((recipe) => res.status(200).json(recipe))
      .catch((err) => res.status(500).json({ error: err }));
  });

  //GET ALL ENTRIES (good)
router.get("/get", (req, res) => {
    Recipe.findAll()
      .then((recipe) => res.status(200).json(recipe))
      .catch((err) => res.status(500).json({ error: err }));
  });
  
  //GET ENTRIES BY USER
  router.get("/get/:id", validateSession, (req, res) => {
    let id = req.params.id;
    Recipe.findAll({
      where: { owner: id },
    })
      .then((recipe) => res.status(200).json(recipe))
      .catch((err) => res.status(500).json({ error: err }));
  });

  //GET ENTRIES BY TITLE //Get rid of if get keyword working
  router.get("/:title", validateSession, (req, res) => {
      let title = req.params.title;

      Recipe.findAll({
          where: {recipeName: title}
      })
      .then(recipes => res.status(200).json(recipes))
      .catch(err => res.status(500).json({error: err }))
  })

  //GET ENTRIES BY KEYWORD - STILL WORKING ON!!
  router.get("/search/:keyword", validateSession, (req, res) => {
      let keyword = req.params.keyword;
      let owner = req.user.id;
      let recipeTitle = req.body.recipe.recipeName;
  
      sequelize.query(`select * from recipes where owner=${owner} AND ingredients like '%${keyword}%'`)

      .then(recipes => res.status(200).json(recipes))
      .catch(err => res.status(500).json({error: err }))
  })

  //GET ENTRIES BY CATEGORY
  router.get("/search/cat/:category", validateSession, (req, res) => {
    let targetCategory = req.params.category;

    Recipe.findAll({
        where: {category: targetCategory}
    })
    .then(recipes => res.status(200).json(recipes))
    .catch(err => res.status(500).json({error: err }))
})
  
  //UPDATING ENTRY// PUT METHOD
  router.put("/update/:id", validateSession, function (req, res) {
    const recipe = {
            recipeName: req.body.recipe.recipeName,
            category: req.body.recipe.category,
            source: req.body.recipe.source,
            yield: req.body.recipe.yield,
            ingredients: req.body.recipe.ingredients,
            directions: req.body.recipe.directions,
            notes: req.body.recipe.notes,
            rating: req.body.recipe.rating
       
    };
  
    const query = { where: { id: req.params.id, owner: req.user.id } };
  
    Recipe.update(recipe, query)
      .then((recipe) => res.status(200).json(recipe))
      .catch((err) => res.status(500).json({ error: err }));
  });
  
  //DELETE - DELETING A JOURNAL ENTRY
  router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id } };
  
    Recipe.destroy(query)
      .then(() => res.status(200).json({ message: "Recipe Removed" }))
      .catch((err) => res.status(500).json({ error: err }));
  });

  module.exports = router;