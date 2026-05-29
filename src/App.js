import { Routes, Route } from 'react-router-dom';
import './App.css';
import Chatbot from './components/Chatbot';
import Login from './components/login';
import Register from './components/Register';
import AuthGuard from './components/Authguard';
import Background from './components/Background';
import Token from './components/Token';

function App() {
  return (
    <Token.Provider value={localStorage.getItem("token") || null}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Chatbot />} />
        <Route path="/back" element={<AuthGuard><Background /></AuthGuard>} />
      </Routes>
    </Token.Provider>
  );
}

export default App;