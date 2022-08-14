import { useDispatch, useSelector } from 'react-redux';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  console.log(selector.users)
  return (
    <>
    </>
  );
}

export default App;
