import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const Loading = () => (
  <div>
    <p>Loading News...</p>
  </div>
);

const News = ({ news }) => {
  return news.map((article) => {
    return (
      <div key={article.id}>
        <a href={article.url} target="_blank" rel="noreferrer">
          <img
            style={{ maxWidth: "200px" }}
            alt="article images"
            src={article.urlToImage}
          ></img>
        </a>

        <h3>{article.title}</h3>
        <p>{article.description}</p>
      </div>
    );
  });
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [news, setNews] = useState([]);

  const loadNews = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.get(`/api/news/${keyword}`);
      setNews(response.data.news);

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <div
      className="App"
      style={{
        textAlign: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1>News via API</h1>

      <form style={{ marginBottom: "2em" }} onSubmit={loadNews}>
        <input
          placeholder="Try 'climate optimism'"
          style={{ padding: "0.5em" }}
          type="text"
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
      </form>
      <div
        style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
      >
        {loading ? <Loading /> : <News news={news} />}
      </div>
    </div>
  );
};

export default App;
