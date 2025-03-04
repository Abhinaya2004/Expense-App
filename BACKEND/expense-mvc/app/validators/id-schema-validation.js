const idValidationSchema = {
    id:{
        in:['params'],
        isMongoId:{
            errorMessage:'not a valid id'
        }
    }
}

module.exports = idValidationSchema