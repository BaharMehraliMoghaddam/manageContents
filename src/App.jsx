import ManageContents from "./components/ManageContents"
import ContentProvider from "./ContentContext"

function App() {
  return (
    <ContentProvider>
      <ManageContents/>
    </ContentProvider>
  )
}

export default App
