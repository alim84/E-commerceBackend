async function CreateCategory(req, res) {
  let { name, image, description } = req.body;
  console.log(req.file)
  res.send(req.body);
}

module.exports = { CreateCategory };
