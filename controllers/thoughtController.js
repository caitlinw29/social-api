const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtsObj = {
          thoughts,
        };
        return res.json(thoughtsObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  //update the thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$set:{thoughtText: req.body.thoughtText}}, function(err, res){
      if(err){
        console.log("Something wrong when updating data!");
      }
    })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No such thought exists' })
        : res.json({
          thought,
        }))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : res.status(200).json({message: 'Thought deleted!'})
        )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

//I haven't done the reaction routes yet. 