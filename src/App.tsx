import {Routes, Route} from "react-router-dom";
import Main from "./pages/main";
import Basket from "./pages/basket";
import Header from "./components/header";
import "./App.css"
import Footer from "./components/footer";
import {useDispatch} from "react-redux";
import {SET_WINDOW_WIDTH} from "./store/commands";
import {useEffect} from "react";
function App() {
    const dispatch = useDispatch()
    window.addEventListener("resize",()=>{
        dispatch({type:SET_WINDOW_WIDTH,data:{width:window.innerWidth}})
    })
    useEffect(()=>{
        dispatch({type:SET_WINDOW_WIDTH,data:{width:window.innerWidth}})
    },[])
  return (
      <>
          <Header/>
          <div className="main">
              <Routes>
                  <Route Component={Main} path="/" ></Route>
                  <Route Component={Basket} path="/basket"></Route>
              </Routes>
          </div>
          <Footer/>
      </>
  )
}
export default App
