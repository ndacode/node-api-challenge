// TODO - Add an Action ('/:id/actions')

const express = require("express");
const Projects = require("./projectModel");
const Actions = require("./actionModel");
const actionRouter = express.Router();

actionRouter.post("/:id", (req, res) => {
  console.log(req.body);
  console.log(req.body.description);
  console.log(req.body.notes);
  console.log(req.params);
  console.log(req.params.id);
  const { description, notes } = req.body;
  const project_id = Number(req.params.id);
  if (!req.params.id) {
    console.log(req.params);
    res.status(404).json({
      errorMessage: "The project with the specified ID does not exist."
    });
  }
  if (!req.body.description) {
    console.log(description);
    res.status(400).json({
      errorMessage: "Please provide description for the action."
    });
  }
  if (!req.body.notes) {
    console.log(notes);
    res.status(400).json({
      errorMessage: "Please provide notes for the action."
    });
  }
  Actions.insert({ project_id, description, notes })
    .then(actions => {
      // console.log(post_id);
      res.status(201).json(actions);
    })
    .catch(err => {
      console.log("error", err);
      console.log({ project_id, description, notes });
      res.status(500).json({
        error: "There was an error while saving the action to the database."
      });
    });
});
// TODO - Delete an Action ('/:id/actions')
actionRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  Projects.getProjectActions(req.params.id).then(actions => {
    console.log(actions);
    if (!actions[0]) {
      res.status(404).json({
        message: "The action with the specified ID does not exist."
      });
    }
    Actions.remove(req.params.id)
      .then(actions => {
        console.log(id);
        res.status(200).json(actions);
      })
      .catch(err => {
        res.status(500).json({
          error: "The action could not be removed."
        });
      });
  });
});
// TODO - Update an Action ('/:id/actions')

actionRouter.put("/:id", (req, res) => {
  console.log();
  const { description, notes } = req.body;
  const id = req.params.id;

  if (!id) {
    res.status(404).json({
      message: "The project with the specified ID does not exist."
    });
  }
  if (!description || !notes) {
    res.status(400).json({
      errorMessage: "Please provide description and notes for the action."
    });
  }
  Actions.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        error: "The action information could not be modified."
      });
    });
});

module.exports = actionRouter;
