import React, {Component} from 'react';
import './RecipeInput.css';

class RecipeInput extends Component {
    //props methods
    static defaultProps = {
        onClose() {},
        onSave() {}
    }
    
    //initialize state for the form
    constructor(props){
        super(props);
        this.state = {
            title: '',
            instructions: "",
            ingredients: [''],
            img: ''
        };
        
        // these methods will use state so must be bind to this
        this.handleChange = this.handleChange.bind(this);
        this.handleNewIngredient = this.handleNewIngredient.bind(this);
        this.handleChangeIng = this.handleChangeIng.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // handleChange takes a broswer event as a parameter
    // will be used by multiple inputs
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    
    // handle New Ingredient method
    // ingredient array grow by 1 (from state)
    handleNewIngredient(e){
        const {ingredients} = this.state;
        this.setState({ingredients: [...ingredients, '']});
    }
    
    // use name{i} to determine which ing is added
    handleChangeIng(e){
        const index = Number(e.target.name.split('-')[1]);
        const ingredients = this.state.ingredients.map((ing, i) => (
            i === index ? e.target.value : ing
        ));
        this.setState({ingredients});
    }
    
    //save functionality is done by the parent
    handleSubmit(e){
        e.preventDefault();
        //invoke save mehod with all the form's data - copy of state
        this.props.onSave({...this.state});
        this.setState({
            title: '',
            instructions: '',
            ingredients: [''],
            img: ''
        });
    }
    
    
    //------ RENDER STARTS HERE -------//
    //--------------------------------//
    
    
    render(){
        const {title, instructions, img, ingredients} = this.state;
        //extract the onClose method from props
        const {onClose} = this.props;
        
        //make all the inputs from state's igredients array
        let inputs = ingredients.map((ing, i ) => (
            <div
                className="recipe-form-line"
                key={`ingredient-${i}`}>
                <label>{i+1}.
                    <input
                        type="text"
                        name={`ingredients-${i}`}
                        value={ing}
                        size={45}
                        autoComplete="off"
                        placeholder=" Ingredient"
                        onChange={this.handleChangeIng} />
                </label>
            </div>
        ));
        
        
        return (
            <div className="recipe-form-container">
            
                <form className='recipe-form' onSubmit={this.handleSubmit}>
                
                    {/* the close buttom */}
                    <button
                        type="button"
                        className="close-button"
                        //call method onClose
                        onClick={onClose}
                    >
                        X
                    </button>
                    
                    
                    {/* Title Input */}
                    <div className='recipe-form-line'>
                        <label htmlFor='recipe-title-input'>Title</label>
                        <input
                            id='recipe-title-input'
                            key='title'
                            name='title'
                            type='text'
                            value={title}
                            size={42}
                            autoComplete="off"
                            onChange={this.handleChange} 
                        />
                    </div>
                    
                    
                    {/* Instructions Input */}
                    <label
                        htmlFor='recipe-instructions-input'
                        style={{marginTop: '5px'}}
                    >Instructions
                    </label>
                    <textarea
                        key='instructions'
                        id='recipe-instructions-input'
                        type='Instructions'
                        name='instructions'
                        rows='8'
                        cols='50'
                        autoComplete='off'
                        value={instructions}
                        onChange={this.handleChange} />
                    
                    
                    {/* List of Ingredients */}
                    {inputs}
                    
                    
                    {/* Button for new Ingredient*/}
                    <button
                        type="button"
                        onClick={this.handleNewIngredient}
                        className="buttons"
                    >
                        +
                    </button>
                    
                    
                    {/* Image Input*/}
                    <div className='recipe-form-line'>
                        <label htmlFor='recipe-img-input'>Image Url</label>
                        <input
                            id='recipe-img-input'
                            type='text'
                            placeholder=''
                            name='img'
                            value={img}
                            size={36}
                            autoComplete='off'
                            onChange={this.handleChange} />
                    </div>
                    
                    
                    {/* Save Button*/}
                    <button
                        type="submit"
                        className="buttons"
                        style={{alignSelf: 'flex-end', marginRight: 0}}
                    >
                        SAVE
                    </button>
                    
                </form>
            
            </div>
        
        );
  
    }
    
}




export default RecipeInput;