import ManageContents from "./components/ManageContents"
import ContentProvider from "./ContentContext"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ContentProvider>
      <ManageContents/>
      <ToastContainer />
    </ContentProvider>
  )
}

export default App
