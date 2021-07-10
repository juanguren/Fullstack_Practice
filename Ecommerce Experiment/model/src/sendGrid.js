const sendGrid = require("@sendgrid/mail");
const axios = require("axios");
require("dotenv").config();

const handleEmailOperation = async (req, res) => {
  const { REACT_APP_SENDGRID_KEY: API_KEY } = process.env;
  sendGrid.setApiKey(API_KEY);
  const messagePayload = req.body;

  try {
    if (req.body) {
      (async () => {
        try {
          const messageResponse = await sendGrid.send(messagePayload);
          console.log(messageResponse);
          const code = messageResponse[0].statusCode;
          code === 202
            ? res.status(code).json({
                Message: `Email succesfully sent to *${messagePayload.to}*`,
              })
            : res.status(404).json({ Error: "Message failed" });
        } catch (error) {
          if (error.response) {
            const error_message = error.response.body.errors;
            console.log(error_message);
            return res.status(error.code).json(error_message);
          }
        }
      })();
    } else {
      return res.status(422).json({
        Message:
          "Unprocessable payload. Please make sure that all values are complete",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = handleEmailOperation;
