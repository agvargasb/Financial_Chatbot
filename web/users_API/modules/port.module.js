module.exports = {
    port: process.env.PORT || 3000,
    callback : function() {
        console.log("abriendo servidor corriendo en el puerto " + (process.env.URL + process.env.PORT || 3000));
    }
}