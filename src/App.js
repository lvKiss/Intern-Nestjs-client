import PostUser from "./Components/postUser";
import GetUser from "./Components/user";
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import SideBar from "./Components/SideBar"
function App() {
    return (
      <>
        <BrowserRouter>
        <SideBar />
        <Routes>       
            <Route path="/" element={<GetUser />} />
            <Route path="/addUser" element={<PostUser />}/>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  
  export default App;