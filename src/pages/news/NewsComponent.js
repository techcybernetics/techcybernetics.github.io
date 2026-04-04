import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import "./NewsComponent.css";

const CATEGORIES = ["All", "AI", "Robotics", "Innovation"];

const categoryIcons = {
  AI: "fas fa-brain",
  Robotics: "fas fa-robot",
  Innovation: "fas fa-lightbulb",
};

class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      lastUpdated: null,
      activeCategory: "All",
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    fetch(process.env.PUBLIC_URL + "/news.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load news");
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
          lastUpdated: data.lastUpdated,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  }

  render() {
    const { articles, lastUpdated, activeCategory, loading, error } = this.state;

    const filtered =
      activeCategory === "All"
        ? articles
        : articles.filter((a) => a.category === activeCategory);

    return (
      <div className="news-page">
        <Header theme={this.props.theme} />
        <main className="news-main">
          <div className="news-hero">
            <div className="news-hero__badge">
              <i className="fas fa-satellite-dish" />
              Updated daily by AI
            </div>
            <h1 className="news-hero__title">AI & Tech News</h1>
            <p className="news-hero__sub">
              Latest breakthroughs in artificial intelligence, robotics, and tech innovation — curated daily.
            </p>
            {lastUpdated && (
              <p className="news-hero__updated">
                <i className="fas fa-clock" />
                Last updated: {new Date(lastUpdated).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>

          <div className="news-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`news-filter${activeCategory === cat ? " news-filter--active" : ""}`}
                onClick={() => this.setState({ activeCategory: cat })}
              >
                {cat !== "All" && <i className={categoryIcons[cat]} />}
                {cat}
              </button>
            ))}
          </div>

          {loading && (
            <div className="news-state">
              <div className="news-spinner" />
              <p>Loading latest news...</p>
            </div>
          )}

          {error && (
            <div className="news-state news-state--error">
              <i className="fas fa-exclamation-circle" />
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <p className="news-count">{filtered.length} articles</p>
              <div className="news-grid">
                {filtered.map((article) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-card"
                  >
                    <div className="news-card__top">
                      <span className={`news-card__category news-card__category--${article.category.toLowerCase()}`}>
                        <i className={categoryIcons[article.category]} />
                        {article.category}
                      </span>
                      <span className="news-card__date">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="news-card__title">{article.title}</h3>
                    <p className="news-card__summary">{article.summary}</p>
                    <div className="news-card__footer">
                      <span className="news-card__source">
                        <i className="fas fa-link" />
                        {article.source}
                      </span>
                      <span className="news-card__read">
                        Read more <i className="fas fa-arrow-right" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </main>
        <Footer theme={this.props.theme} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default NewsComponent;
