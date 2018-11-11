import React, { Component } from 'react';
import axios from 'axios';
import './card.css'

class Card extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
        }
    }

    toggleShowDetails(){
        var { showDetails } = this.state;
        this.setState({
            showDetails: !showDetails
        });
    }
    render(){
        const imgSrc = (this.props.content && this.props.content.idName) ? `http://www.clashapi.xyz/images/cards/${this.props.content.idName}.png` : null;
        var { content } = this.props;
        var { showDetails } = this.state;
        return(
            <div   id='card-content' onClick={() =>this.toggleShowDetails() }>
                {
                    !content ? 'loading ...' :
                    <div>
                        {
                            !showDetails ?
                                <div>
                                    <button className="card-button" >
                                     <img src={imgSrc}></img></button>
                                     <p id="elixir-cost">Elixir Cost: {content.elixirCost}</p>
                                </div>
                                :
                                <div onClick={() => this.toggleShowDetails} id="close-card">
                                <div id="details">
                                    <img src={imgSrc}></img>
                                    <p>Name: {content.name}</p>
                                    <p>Rarity: {content.rarity}</p>
                                    <p>Description: {content.description}</p>
                                    <p>Type: {content.type}</p>
                                    <p>Elixir Cost: {content.elixirCost}</p>
                                </div>
                                </div>
                    }
                    </div>
                }
            </div>

        )
    }

    componentWillMount(){
        if (this.props.content && this.props.content.idName)
            axios.get(`http://www.clashapi.xyz/images/cards/${this.props.content.idName}.png`)
    }
}

export default Card;