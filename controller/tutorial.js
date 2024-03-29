const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    try{
        if(req.body.title.length < 50){

            Tutorial.findOrCreate({
                where : { title : req.body.title}
            }).then(
                data => {res.status(200).send(data);}
            ).catch(err => {
                res.status(500).send({message : err.message || "Some error occured while creating the tutorial."});
            });
        }
    }catch(err){
        res.status(500).send({message : err.message || "The title should be less than 50 characters."});
    }

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Tutorial.findAll({ where: condition })
        .then(data => {res.send(data);})
        .catch(err => {
            res.status(500)
            .send({message:err.message || "Some error occurred while retrieving tutorials."});
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404)
            .send({message: `Cannot find Tutorial with id=${id}.`});
        }
    })
    .catch(err => {
      res.status(500)
      .send({message: "Error retrieving Tutorial with id=" + id});
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Tutorial.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({message: "Tutorial was updated successfully."});
        }
        else {
            res.send({message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`});
        }
    })
    .catch(err => {
        res.status(500)
        .send({message: "Error updating Tutorial with id=" + id});
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({message: "Tutorial was deleted successfully!"});
        }
        else {
            res.send({message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`});
        }
    })
    .catch(err => {
        res.status(500)
        .send({message: "Could not delete Tutorial with id=" + id});
    });
};

// Delete all Tutorials from the database.
/* exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
        res.status(500)
        .send({message:err.message || "Some error occurred while removing all tutorials."});
    });
}; */

// Find all published Tutorials
/* exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500)
        .send({message:err.message || "Some error occurred while retrieving tutorials."});
    });
}; */