import React, {useState,useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NEWS_API_KEY} from './config'
import axios from 'axios';
import ReactLoading from 'react-loading';
import Search from './Search'

const App = () => {

  const [articles,setArticles] = useState([]);
  const [apiError,setApiError] = useState("");
  const [category,setCategory] = useState("all");
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
    const getArticles = async () => {
      try{
          const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${category}&apiKey=${NEWS_API_KEY}`
        );
        setArticles(response.data.articles);
        setIsLoading(false);
      }
      catch(err){
        console.log(err);
      }
      
    }
    getArticles()
   },[category]);

  console.log(articles);
  return (
    <div className="App">
      <Search searchText={(text)=>setCategory(text)}/>
      {isLoading ? (
        <div className="container" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <ReactLoading type="cylon" color="#111111" width={500} />
        </div>
        ) : (
        <section className="m-5">
          {articles.map((article)=>{

            const {title, urlToImage, author, publishedAt, description, source:{id, name}, url} = article;
            return(
              <div className="conatiner-fluid my-4" key={id+title}>
                <div className="card flex-md-row mb-4 box-shadow h-md-250">
                  <div className="card-body d-flex flex-column">
                    <strong className="d-inline-block mb-2 text-primary text-uppercase">{category}</strong>
                    <h3 className="mb-1">
                      <a className="text-dark" href={url} target="_blank" rel="noreferrer" >{title}</a>
                    </h3>
                    <div className="mb-1 text-muted">{author}</div>
                    <div className="mb-1 text-muted">{publishedAt.substring(0,10)}</div>
                    <p className="card-text mb-auto">{description}</p>
                    <a href={url} target="_blank" rel="noreferrer">Continue reading</a>
                  </div>
                  <img className="card-img-right flex-auto d-none d-md-block rounded-2" src={urlToImage} alt="thumbnail" style={{width:"100%",objectFit:"cover"}}/>
                </div>
              </div>
            )

          })}
        </section>
        )}
    </div>
  );
}

export default App;
