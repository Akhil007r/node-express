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
//     Code changed for security reasons update url as per your credentials 1
    const JsonData = JSON.stringify(data)
    const url = "https://us2.api.mailchimp.com/3.0/Lists/" Add your own unique acc Id"";
    const options = {
        method: "POST",
        auth: "NAME : Add your Api"
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
//

// List Id
// 
