const express = require('express');

const app = express()

const port = process.env.PORT || 5000

const cors = require("cors")

app.use(cors())

app.use(express.json())

require("dotenv").config()


// here is teh  mongodb connect 


const { MongoClient, ServerApiVersion, Db, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASS}@cluster0.obla9o6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // here is the all databases
        const DB1 = client.db("usersInformation").collection("infosUSer")

        // here is the server all response  main

        app.get("/user", async (req, res) => {

            const cursor = DB1.find()

            const result = await cursor.toArray()

            res.send(result)

        })

        // here is the server all response  ends

        // here is the server post method

        app.post("/user", async (req, res) => {

            const user = req.body

            const result = await DB1.insertOne(user)

            res.send(result)

        })

        // here is the server post method ends


        // here is the delete method startsF
        app.delete("/user/:id", async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const result = await DB1.deleteOne(filter)
            res.send(result)
        })
        // here is the delete method ends


        // here is the getting object by id

        app.get("/user/:id", async (req, res) => {
            const id = req.params.id

            const filterOne = { _id: new ObjectId(id) }
            const result = await DB1.findOne(filterOne)
            res.send(result)
        })

        // here is the getting object by id ends


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// here is teh  mongodb connect  ends






// here is the server simple response done

app.get("/", (req, res) => {
    res.send("server is running ")
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
