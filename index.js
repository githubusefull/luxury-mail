const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({value, position, location, location2, Date, Dateoff, timeOne,timeTow }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mohamedabdelwahidi@gmail.com",
        pass: "gnhs twcj obcu owzn",
      },
    });

    const mail_configs = {
      from: "mohamedabdelwahidi@gmail.com",
      to: "mohamedabdelwahidi@gmail.com",
      html: `
      <div style="background-color: #010101; color: White;
      font-family: Arial, Helvetica, sans-serif;
   font-weight: 600; font-size:1.2vw; padding: 3vw">
   <p style="text-align: left; margin-left: 0vw"><img style="display: block; width:150px;" 
   src="https://luxury-77c91.web.app/assets/Logo-LTee_aRB.png"></p>
   <p style="font-size:2vw;">&nbsp; &nbsp; Luxury</p>
   
   <div style="margin: 1vw; font-size:12px;">
   <p style="text-align: left;">&nbsp; &nbsp;<span style="color:#808080"; font-weight: 600;>City :</span> ${position}&nbsp; &nbsp; &nbsp;<span style="color:#808080"; font-weight: 600;>Position :</span> ${value}</p>
   <p style="text-align: left;">&nbsp; &nbsp;<span style="color:#808080"; font-weight: 600;>Up Location :</span> ${location}&nbsp; &nbsp; &nbsp;   <span style="color:#808080"; font-weight: 600;>Off Location :</span> ${location2}</p>
   <p style="text-align: left;">&nbsp; &nbsp;<span style="color:#808080"; font-weight: 600;>Up Date :</span> ${Date}&nbsp; &nbsp; &nbsp; <span style="color:#808080"; font-weight: 600;>Up Time :</span>${timeOne}</p>
   <p style="text-align: left;">&nbsp; &nbsp;<span style="color:#808080"; font-weight: 600;>Off Date :</span> ${Dateoff}&nbsp; &nbsp; &nbsp;  <span style="color:#808080"; font-weight: 600;>Off Time: :</span> ${timeTow}</p>
   </div>
   
   </div>
      `,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  }); 
}

app.get("/", (req, res) => {
  sendEmail(req.query)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});