

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Conversations from './components/Conversations'
import Chat from './components/Chat';





function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Conversations />} />

        <Route
          path="/chat/:id"
          element={<Chat />} />

      </Routes>
    </BrowserRouter>


  );
}

export default App;
