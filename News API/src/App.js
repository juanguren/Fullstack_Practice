import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const Loading = () => (
  <div>
    <p>Loading Users...</p>
  </div>
);

const News = ({ news }) => {
  return news.map((article) => {
    return (
      <div key={article.id}>
        <img
          style={{ maxWidth: "200px" }}
          alt="article images"
          src={article.urlToImage}
        ></img>
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

  const fetchAndSetUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/news");
      setNews(response.data.news);

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetUsers();
  }, []);

  return (
    <div
      className="App"
      style={{
        textAlign: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <h1>React.js on Serverless Cloud</h1>

      <p>
        The information below is being fetched from your Serverless Cloud API:
      </p>
      <form>
        <input type="text" onChange={(e) => setKeyword(e.target.value)}></input>
      </form>
      <div
        style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
      >
        {loading ? <Loading /> : <News news={news} />}
      </div>

      <h3>Edit this React.js app locally:</h3>
      <p>
        Open your terminal to the project directory and run <code>npm i</code>{" "}
        to install the React dependencies. Then run <code>cloud dev</code> to
        launch the local React dev server. You can access the API on your
        personal developer sandbox by appending <code>/api</code> to the local
        dev server's localhost address.
      </p>
    </div>
  );
};

export default App;
