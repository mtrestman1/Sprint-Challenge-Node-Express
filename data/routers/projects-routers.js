const express = require('express');

const Projects = require('../helpers/projectModel');

const router = express.Router();


router.get('/', (req, res) => {
    return Projects.get()
    .then(projects => {
        res.status(201).json(projects)
    })
    .catch(error => {
        res.status(500).json({ message: 'the projects info couldnt be retrieved'})
    })
})

router.post('/', (req, res) => {
    const { name, description } = req.body;
    if(!name || !description) {
        return res.status(400).json({ message: 'Please provide name and description'})
    } else {
        return Projects.insert({name, description})
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(500).json({ error: 'there was an error while saving your projects info'})
        })
    }
})

router.get('/:id', (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(404).json({ message: 'the project with the specified id does not exist'})
    } else {
        return Projects.getProjectActions(id)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(500).json({ error: 'there was an error while saving your projects'})
        })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
   
    if(!id) {
        return res.status(404).json({ message: 'the project with the specified id does not exist'})
    } else {
        return Projects.remove(id)
        .then(project => {
            res.status(201).end()
        })
        .catch(error => {
            res.status(500).json({ error: 'this project could not be deleted'})
        })
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const { name, description, completed } = req.body;
    if(!id) {
        return res.status(404).json({ message: 'the project with the specified id does not exist'})
    } else if (!name || !description) {
        return res.status(400).json({ message: 'please provide name and description'})
    } else {
        return Projects.update(id, {name, description, completed})
        .then(updated => {
            res.status(201).json(updated)
        })
        .catch(error => {
            res.status(500).json({ error: 'this project could not be deleted'})
        })
    }
})


module.exports = router;