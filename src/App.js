
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Chatbot from './components/Chatbot';
import Login from './components/login';
import Register from './components/Register';
import AuthGuard from './Authguard';
import Background from './components/Background';

function App() {
  return (
<>
<Routes>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register/>} />
<Route path="/" element={<Chatbot />} />
<Route path="/back" element={<AuthGuard><Background/></AuthGuard>} />

</Routes>

</>
  );
}

export default App;
