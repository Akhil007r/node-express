// jshint esversion:6
const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https")
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function (req, res) {
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const email = req.body.email;
    console.log(fname, lname, email)
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:
                {
                    FNAME: fname,
                    LNAME: lname
                }

            }
        ]
    }
    const JsonData = JSON.stringify(data)
    const url = "https://us21.api.mailchimp.com/3.0/Lists/22c6e3dcef";
    const options = {
        method: "POST",
        auth: "Akhil:a13b47b92cdc5f809c8d58e7446b8b6a9-us21"
    }
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data))
        })
    })
    request.write(JsonData);
    request.end();
})
app.post("/failure", function (req, res) {
    res.redirect("/")
})
app.listen(process.env.PORT || 3000, function () {
    console.log("Server port 3000")
})

// Api Key
// 13b47b92cdc5f809c8d58e7446b8b6a9-us21

// List Id
// 22c6e3dcef