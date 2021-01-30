import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

const [newReview, setNewReview] = useState("");

  //GETTING REVIEWS FROM DB
  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((response) => {
      //whatever the variable is will contain the data (response)
      //console.log(response.data)     //see data being passed inside of the console
      setMovieList(response.data);
    });
  }, []);

  // POSTING A REVIEW TO DB
  const submitReview = () => {
    axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    //alert("successful insert");

    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]); //after making POST request we are setting the same movie list but pushing the new element from the db
  };

  //DELETING REVIEW FROM DB
  const deleteReview = (movie) => {
    axios.delete(`http://localhost:3001/api/delete/${movie}`);    //typically send id, but we do not have an id movie is identifier
  }


  //UPDATING REVIEW FROM DB
  const updateReview = (movie) => {
    axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");     //clear
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label htmlFor="">Movie Name:</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label htmlFor="">Review:</label>
        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />

        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>

              <button onClick={() => {deleteReview(val.movieName)}}>Delete</button>   
              <input type="text" id="updateInput" onChange={(e) => { setNewReview(e.target.value)}} />
              <button onClick={() => {updateReview(val.movieName)}}>Update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default App;
