import React, {useState, useEffect} from 'react';
import './App.css';

const API_URL = 'http://localhost:8080';

let topScore = true;

function App() {

  const [scoreInput, setScoreInput] = useState('');
  const [scores, setScores] = useState ([]);
  const [nameInput, setNameInput] = useState ([]);

  useEffect(() => {
    const options = {
      method: 'GET',
    };
    fetch(`${API_URL}/scores`, options)
      .then(result => result.json())
      .then(data => {
        setScores(data);
      })
  }, []) ;

  function refreshScores () {
    const options = {
      method: 'GET',
    };
    fetch(`${API_URL}/scores`, options)
      .then(result => result.json())
      .then(data => {
        setScores(data);
      })
  }

  function handleScoreUpdate (event) {
    setNameInput(event.target.value);
    topScore = true;
  }

  function handleNameUpdate (event) {
    setScoreInput(event.target.value);
    topScore = true;
  }

  function handleAddButton (event) {
    const options = {
      method: 'POST',
      body: JSON.stringify(scoreInput),
    };

    fetch(`${API_URL}/scores/${scoreInput}/${nameInput}`, options)
      .then(result => result.json())
      .then(data => {
        console.log(data);
        setScores(data);
        refreshScores();
        topScore = true;
      })
  }

  function handleDeleteButton (event, id) {
    const options = {
      method: 'DELETE',
      body: JSON.stringify(scoreInput),
    };

    fetch(`${API_URL}/scores/${id}`, options)
      .then(result => result.json())
      .then(data => {
        console.log(data);
        setScores(data);
        topScore = true;
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Top Scores</h1>
        <label>Name <input type ='text' onChange={handleNameUpdate}/></label>
        <label>Score <input type ='text' onChange={handleScoreUpdate}/></label>
        <button onClick={(e) => handleAddButton(e)}> Add a score </button>
        {
          scores.map(score => (
            <li>
              {topScore ? <h3>Top Score!!! - </h3> : ''}
              {topScore=false}
              {score.name + ': '}
              {score.score + ' points '}
              <button onClick={(e) => handleDeleteButton(e, score._id)}> Delete a Score </button>
            </li>
          ))

        }
      </header>
    </div>
  );
}

export default App;
