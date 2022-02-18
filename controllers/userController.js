const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //update the user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, {$set:{username: req.body.username, email: req.body.email}}, function(err, res){
      if(err){
        console.log("Something wrong when updating data!");
      }
    })
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No such user exists' })
        : res.json({
          user,
        }))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // Delete a user and remove their thoughts
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.deleteMany({ _id: req.params.userId })
          .then(function(){
            console.log("Data deleted"); 
          }).catch(function(error){
            console.log(error); // 
          }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

//I haven't done the friend routes yet. 