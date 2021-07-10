import { constructMessageLayout } from "../utils/helpers";

const handleEmailOperation = async (payload) => {
  const htmlData = constructMessageLayout(payload);
  const { userEmail } = payload;

  const messagePayload = {
    to: userEmail,
    from: "juanararo@unisabana.edu.co",
    subject: "Your order summary",
    html: htmlData,
  };

  console.log(messagePayload);
  const request = await fetch("/sendOrder", {
    method: "POST",
    body: JSON.stringify(messagePayload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return request.json();
};

export default handleEmailOperation;
