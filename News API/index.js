const { api, data, http, params } = require("@serverless/cloud");
const { default: axios } = require("axios");
http.on(404, "index.html");

const { API_KEY } = params;

api.get("/api/news/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const news = await axios.get(
      `https://newsapi.org/v2/everything?q=${key}&apiKey=${API_KEY}`
    );
    res.send({
      news: news.data.articles,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Catch all for missing API routes
api.get("/api/*", (req, res) => {
  console.log(`404 - api`);
  res.status(404).send({ error: "not found" });
});
