const express = require('express');

const Actions = require('../helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    return Actions.get()
    .then(actions => {
        res.status(201).json(actions)
    })
    .catch(error => {
        res.status(500).json({message: 'the actions info couldnt be retrieved'})
    })
})

router.post('/', (req, res) => {
    const {description, notes, project_id} = req.body;
    if(!description || !notes || !project_id) {
        return res.status(400).json({ message: 'Please provide description, notes, and projectID'})
    } else {
        return Actions.insert({description, notes, project_id})
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
            res.status(500).json({ error: 'there was an error while saving this action'})
        })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    
    if(!id) {
        return res.status(404).json({ message: 'the action with the specified id does not exist'})
    } else {
        return Actions.remove(id)
        .then(action => {
            res.status(201).end()
        })
        .catch(error => {
            res.status(500).json({ error: 'this action could not be deleted'})
        })
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {description, notes, project_id, completed} = req.body;
    if(!id) {
        return res.status(404).json({ message: 'the action with the specified id does not exist'})
    } else if (!description || !notes || !project_id) {
        return res.status(400).json({ message: 'Please provide description, notes, and projectID'})
    } else {
        return Actions.update(id, {description, notes, project_id, completed})
        .then(updated => {
            res.status(201).json(updated)
        })
        .catch(error => {
            res.status(500).json({ error: 'this action could not be deleted'})
        })
    }
})


module.exports = router;