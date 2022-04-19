import './App.scss';
import store from './redux/store';
import { Provider } from 'react-redux';
import Main from './Main/Main';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
