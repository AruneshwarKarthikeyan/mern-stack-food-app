
import {useHttp} from '../hooks/useHttp.js'
import MealItem from "./MealItem";
import Error from '../ui/Error.jsx';

const requestConfig = {};

function Meals() {
  const {data: meals, isLoading, error} = useHttp('https://food-app-ftf9.onrender.com/meals', requestConfig, []);

  if(isLoading) {
    return <p className='center'>Fetching...</p>;
  }

  if(error) {
    return <Error title='Failed to fetch meals!' message={error.message || 'something went wrong!'} />
  }
  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

export default Meals;
