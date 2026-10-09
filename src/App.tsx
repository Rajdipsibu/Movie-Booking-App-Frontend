import { BrowserRouter } from 'react-router-dom';
import './App.css'
import AppRoutes from './routes/AppRoutes';
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
        <Toaster
        position="top-center"
        toastOptions={{
          duration: 1000,
        }}
      />
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </>
  )
}

export default App
