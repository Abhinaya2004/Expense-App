const expenseValidationSchema = {
    expenseDate: {
        in: ['body'],
        exists: {
            errorMessage: 'expense date is required'
        },
        notEmpty: {
            errorMessage: 'date cannot be empty'
        },
        isDate: {
            options: {format: "yyyy-mm-dd"},
            errorMessage: 'date should be in yyyy-mm-dd'
        },
        trim: true
    },
    title: {
        in: ['body'],
        exists: {
            errorMessage: 'title field is required'
        },
        notEmpty: {
            errorMessage: 'title cannot be empty'
        },
        isLength: {
            options: {min:3},
            errorMessage: 'title should be atleast 3 characters'
        },
        trim: true
    },
    amount: {
        in: ['body'],
        exists: {
            errorMessage: 'amount field is required'
        },
        notEmpty: {
            errorMessage: 'amount cannot be empty'
        },
        isFloat: {
            options: {min:1},
            errorMessage: 'amount should be a number with atleast 1 '
        },
    },
    category :{
        in: ['body'],
        exists: {
            errorMessage: 'category field is required'
        },
        isMongoId: {
            errorMessage: 'category id is invalid'
        }
    },
    description:{
        in: ['body'],
        optional: true,
        exists: {
            errorMessage: 'description field is required'
        },
        trim: true
    }


}
module.exports = expenseValidationSchema