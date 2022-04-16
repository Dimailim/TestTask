module.exports = function (app, db) {
    app.post('/createOrder', (request, response) => {
        let order = request.body;
        const dbName = db.db("Orders");
        dbName.collection("OrdersCollection").insertOne(order, (err) => {
            if (err) {
                response.send({"Error": "An error has occurred"});
            } else {
                console.log(request.body);
                response.send({"RequestId": request.body._id.toString(), "Amount": request.body.Amount});
            }
        })
    });
}