import React from  'react';
import './App.css';
import Row from './components/row/row.components';
import requests from './requests';
import Banner from './components/banner/banner';
import Navbar from './components/navbar/navabr.components';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Banner />

        <Row title="NETFLIX ORIGINAL" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />


    </div>
  );
}

export default App;
