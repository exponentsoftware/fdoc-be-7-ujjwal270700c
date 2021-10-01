const { Todos } = require("../models");


exports.create=async(req, res)=> {
  try {
    console.log(req.body);
    await Todos.create({
      ...req.body,
      addedby: req.user.id,
    });
    res.send("Todo Added");
  } catch (error) {
    res.send(error.message);
  }
}


exports.get=async(req, res)=> {
  try {
    const todos = await Todos.findAll({ where: { addedby: req.user.id } });
    res.send(todos);
  } catch (error) {
    res.send(error.message);
  }
}


exports.Destroy=async(req, res)=> {
  try {
    const id = req.params.id;
    const found = await Todos.findOne({
      where: {
        addedby: req.user.id,
        id: id,
      },
    });
    if (!found) res.status(400).json({ msg: "data not match to be deleted" });
    await Todos.destroy({
      where: {
        addedby: req.user.id,
        id: id,
      },
    });
    res.send("Todo deleted");
  } catch (error) {
    res.send(error.message);
  }
}
