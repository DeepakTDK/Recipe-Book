import react from 'react';
import { useState, useEffect } from 'react';
import Recipe from './Recipe';


const Main = () => {

    const APP_ID = 'f47a0381';
    const APP_KEY = 'e37b83e9fb9adfd9745e4dcadc0ff924';

    //states for updating data var
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('fish');

    //render recipe for every render/btn click
    useEffect(() => {
        GET_RECIPES();
    }, [query]);

    //fetch recipe based on query param q
    const GET_RECIPES = async () => {
        const RESPONSE = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const DATA = await RESPONSE.json();
        setRecipes(DATA.hits);
        console.log(DATA.hits);
    };

    //update search state
    const UPDATE_SEARCH = e => {
        setSearch(e.target.value);
    }

    //update query state
    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
    }


    return (
        <main className="wrapper">
        <h1 className="mainTitle">Search your favorite recipe</h1>
        <form onSubmit={getSearch} className="search-form">
            <input className="search-bar" type="text" value={search} onChange={UPDATE_SEARCH} />
            <button className="search-button" type="submit">
            Search
            </button>
        </form> 

        <div className="recipes">
            {recipes.map(recipe => (
            <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            image={recipe.recipe.image}
            calories={`${Math.round(recipe.recipe.calories * 100) / 100}`}
            ingredients={recipe.recipe.ingredients}>
            </Recipe>
            ))}
        </div>

    </main>
    );
};

export default Main;