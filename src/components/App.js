import "./App.css";
import Authorization from "./Authorization/Authorization";
import Registration from "./Registration/Registration";
import CreatePost from "./Posts/CreatePost";
import CheckPost from "./Posts/CheckPost";
import CheckAllPosts from "./Posts/CheckAllPosts";
import Layout from "./Layout/Layout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Authorization />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration/>}/>
          <Route path="/posts" element={<CheckAllPosts/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
          <Route  path="/posts/:id" element={<CheckPost/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
