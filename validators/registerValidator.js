

const {body , validationResult } = require("express-validator")

exports.registerValidator = [
    body("firstname").isString().isLength({min:3}).not().isEmpty(),
    body("email").isEmail().withMessage("Email format incorrent"),
    body("password").isString().isLength({min:3}).not().isEmpty(),
    body("contact").isString().isLength({min:5}).optional(),
    (req,res,next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array()
            })
        }
        next()
    }

]