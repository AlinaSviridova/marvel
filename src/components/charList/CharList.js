import {Component} from 'react';
import MarvelService from '../../services/MarvelService'
// import Spinner from '../spinner/Spinner'
import './charList.scss';




class CharList extends Component {

    state = {
        chars: [],
    }

     componentDidMount() {
        this.updateChar();
    }

    marvelService = new MarvelService();
    updateChar = () => {  
        this.marvelService
        .getAllCharacters()
        .then(this.createList)
    }

    createList = (chars) => {
      
        const elements = chars.map (item => {
        const {name, thumbnail} = item; 

            return(
                 <li className="char__item">
                        <img src={thumbnail} alt="abyss"/>
                        <div className="char__name">{name}</div>
                    </li> 
            )
        })
         
        this.setState({ 
            chars : elements 
        });
    }
   
    render() {

        const { chars } = this.state;
       

        return (
            <div className="char__list">
                <ul className="char__grid">
                {this.state.chars}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;