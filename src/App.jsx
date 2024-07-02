import React from 'react';
import TodoApp from './components/TodoApp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App" style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      <div className="container">
        <TodoApp />
      </div>
    </div>
  );
}

export default App;
