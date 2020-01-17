const express = require("express");

const Actions = require("./actionModel");
const Projects = require("./projectModel");
const router = express.Router();

// TODO - List of Projects ('/')
router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      console.log(projects);
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      // todo how do you cancel the request?
      res.status(500).json({
        error: "The project information could not be retrieved."
      });
    });
});
// TODO - Add a Project ('/')
router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the project to the database."
      });
    });
});
// TODO - Delete a Project ('/:id')
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({
      message: " The project with the specified ID does not exist."
    });
  }
  Projects.remove(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: "The project could not be removed."
      });
    });
});
// TODO - Update a Project ('/:id')
router.put("/:id", (req, res) => {
  console.log(req.body);
  const { name, description } = req.body;
  const id = req.params.id;

  if (!id[0]) {
    res.status(404).json({
      message: "The project with the specified ID does not exist."
    });
  }
  if (!name || !description) {
    res.status(400).json({
      errorMessage: "Please provide name and description for the project."
    });
  }
  Projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        error: "The project information could not be modified."
      });
    });
});

// TODO - List of Actions ('/:id/actions')
router.get("/:id/actions", (req, res) => {
  console.log(req);

  Projects.getProjectActions(req.params.id).then(actions => {
    if (!actions[0]) {
      res.status(400).json({
        message: "The project with the specified ID does not have any actions."
      });
    } else if (actions) {
      console.log(actions);
      res.status(200).json(actions);
    } else
      res.status(500).json({
        error: "The actions information could not be retrieved."
      });
  });
});
// TODO - Add an Action ('/:id/actions')
router.post("/:id/actions", (req, res) => {
  console.log(req.body);
  console.log(req.body.description);
  console.log(req.body.notes);
  console.log(req.params);
  console.log(req.params.id);
  const { description, notes } = req.body;
  const project_id = Number(req.params.id);
  if (!req.params.id) {
    console.log(req.params.id);
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
router.delete("/:id/actions", (req, res) => {
  const { id } = req.params.id;
  console.log(req.params);
  if (!id) {
    res.status(404).json({
      message: " The project with the specified ID does not exist."
    });
  }
  Actions.remove(req.params.id)
    .then(action => {
      console.log(id);
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({
        error: "The action could not be removed."
      });
    });
});
// TODO - Update an Action ('/:id/actions')

router.put("/:id/actions", (req, res) => {
  console.log(req.body);
  const { description, notes } = req.body;
  const id = req.params.id;

  if (!id[0]) {
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

module.exports = router;
