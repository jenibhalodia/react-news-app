import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default function News({ category }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(6);
    const [totalDocs, setTotalDocs] = useState(0);

    const updateNews = async () => {
        // const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=92334a7ce6f669a86780c8f4d4c29ec4&page=${page}&pageSize=${pagesize}`;
        const url =`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=92334a7ce6f669a86780c8f4d4c29ec4&page=${page}&max=${pagesize}&lang=en`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalDocs(parsedData.totalArticles);
        setLoading(false);
    };

    useEffect(() => {
        document.title = `News-${
            category[0].toUpperCase() + category.substring(1)
        }`;
        updateNews();
    }, [category, pagesize, page]);

    return (
        <div className="container my-3">
            <h1 className="text-center" style={{ marginTop: "80px" }}>
                {category[0].toUpperCase() + category.substring(1)}-Top
                Headlines
            </h1>
            {loading ? (<Spinner />) : (
                <div className="row">
                    {articles &&
                        articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title? element.title.slice(0, 50): ""}
                                        description={element.description? element.description.slice(0,90): ""}
                                        imageUrl={element.image}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })}
                </div>
            )}

            <div className="container d-flex justify-content-between">
                <button
                    disabled={page <= 1 || loading}
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        setPage(page - 1);
                    }}
                >
                    &larr; Previous
                </button>
                <select
                    value={pagesize}
                    onChange={(e) => {                  
                        setPagesize(e.target.value);    
                    }}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
                <button
                    disabled={
                        (pagesize * page < totalDocs ? false : true) || loading
                    }
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        setPage(page + 1);
                    }}
                >
                    Next&rarr;
                </button>
               
            </div>
                <div className=" text-center  mt-3 "> Please ignore Next and Previous buttons as I am using free API which does not support pagination. Pagination only works on Paid API's.</div>
        </div>
    );
}

