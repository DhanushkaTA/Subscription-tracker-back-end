const authorize = async (req, res, next) => {

    try {

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        }

    } catch (e) {
        res.status(401).json({message: 'Unauthorized', error:e.message})
    }

}