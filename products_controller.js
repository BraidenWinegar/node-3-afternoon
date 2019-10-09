
module.exports = {

    create: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { name, description, price, image_url } = req.body;

        dbInstance.create_product([name, description, price, image_url])
        .then( ()=> res.sendStatus(200) )
        .catch( err => {
            res.status(500).send({errorMessage: 'Oops!'});
            console.log('create', err)
        } );
    },

    getOne: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params

        dbInstance.read_product(id)
        .then( product => res.status(200).send( product ) )
        .catch( err => {
            res.status(500).send({errorMessage: 'Oops!'});
            console.log('getOne', err)
        } );
    },

    getAll: ( req, res, next ) => {
        const dbInstance = req.app.get('db');

        dbInstance.read_products()
        .then( product => res.status(200).send( product ) )
        .catch( err => {
            res.status(500).send({errorMessage: 'Oops!'});
            console.log('getAll', err)
        } );
    },

    update: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params;
        const { query } = req;

        dbInstance.update_product([ id, query.desc ])
        .then( () => res.sendStatus(200) )
        .catch( err => {
            res.status(500).send({errorMessage: 'Oops!'});
            console.log('update', err)
        } );
    },

    delete: ( req, res, next ) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params;

        dbInstance.delete_product( id )
        .then( product => res.sendStatus(200) )
        .catch( err => {
            res.status(500).send({errorMessage: 'Oops!'});
            console.log('delete', err)
        } );
    }
}