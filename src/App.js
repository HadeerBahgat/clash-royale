import React, { Component } from 'react';
import axios from 'axios';
import Card from './components/card/card';
import './App.css'

// import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  constructor(props){
    super(props);
      this.state={
        selectedCards: [],
        allCards:[],
        averageElixirCost :0

      }
    
  }
  componentWillMount(){
    axios.get('http://www.clashapi.xyz/api/cards')
    .then(res => {
      this.setState({allCards : res.data},()=>{
        this.selectRandomCards();
      })

    })
  }

  selectRandomCards= ()=>{
    if (!(this.state.allCards && this.state.allCards.length)) return;
    var newSelectedCards = [];
    var elixirTotal = 0;
    for (var i =0; i < 8; i++) {
     const newSelectedCard = this.state.allCards[Math.floor(Math.random() * (this.state.allCards.length -1))]; 
      newSelectedCards.push(newSelectedCard)
      elixirTotal+=newSelectedCard.elixirCost;
      
    }
    elixirTotal/=8;
    this.setState({
      selectedCards: newSelectedCards,
      averageElixirCost: elixirTotal
    });

  }
  render(){
    return(
      <div id='app-container'>
      <div id="main">
        <button id="new-battle" onClick={()=>this.selectRandomCards()}>Generate New Deck</button>
        <p id="battle-deck">Battle Deck   </p>
        <div id="card-deck-content">
          {this.state.selectedCards.map(card => {
              return(
                // <p>{card.idName}</p>
                <Card content={card} ></Card>
              )
            }
            )}
        </div>
            
        <p id="elixir-bar">Average Elixir Cost: {this.state.averageElixirCost}</p>
      </div>
      </div>
    )   
  }
}

export default App;
