const express = require("express");

const Projects = require("./projectModel");
const Actions = require("./actionModel");
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
  Projects.get(req.params.id).then(project => {
    if (!project) {
      res.status(404).json({
        message: "The project with the specific ID does not exist."
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
});
// TODO - Update a Project ('/:id')
router.put("/:id", (req, res) => {
  console.log(req.body);
  const { name, description } = req.body;
  const id = req.params.id;
  Projects.get(req.params.id).then(project => {
    if (!project) {
      res.status(404).json({
        message: "The project with the specific ID does not exist."
      });
    } else if (!project.name || !project.description) {
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

module.exports = router;
