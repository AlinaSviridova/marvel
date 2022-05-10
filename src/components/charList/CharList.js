import {Component} from 'react';
import {PropTypes} from 'prop-types';
import MarvelService from '../../services/MarvelService'
// import Spinner from '../spinner/Spinner'
import './charList.scss';




class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        newIremLoading: false,
        offset: 210,
        charEnded: false
    }
    marvelService = new MarvelService();
     componentDidMount() { 
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
        .getAllCharacters(offset)
        .then(this.createList)
        .catch(this.onError)
    } 

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
 
    createList = (newCharList) => { 
        let ended = false; 
        if (newCharList.length < 9){
            ended = true;
        }

        this.setState( ({offset, chars}) => ({ 
            chars : [...chars, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }
    

    render() {

        const { chars, offset, newItemLoading, charEnded } = this.state;
         const elements = chars.map (item => {
        const {name, thumbnail, id} = item; 
            return( 
                 <li className="char__item" key={id}
                 onClick={() => this.props.onCharSelected(id)}> 
                        <img src={thumbnail} alt={name}/>
                        <div className="char__name">{name}</div>
                    </li> 
            )
        })

        return (
            <div className="char__list">
                <ul className="char__grid">
                {elements}
                </ul>
                <button className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = { 
    onCharSelected: PropTypes.func
}

export default CharList;