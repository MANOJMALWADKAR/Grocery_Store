//for error handle fo create product if filed is empty
module.exports = theFunc => (req, res, next) => {

    Promise.resolve(theFunc(req, res, next)).catch(next)
}