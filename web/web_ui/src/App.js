import styles from "./style";
import Home from './pages/Home'
import { Footer, Navbar, Missing, Chat, RequireAuth, Activate, ComingSoon} from "./components";
import LoginSignupContainer from './pages/LoginSignupContainer'
import {Routes, Route} from "react-router-dom"

const App = () => (

  <>
  <div className="bg-primary w-full overflow-hidden">
  <div className="App">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/sign-up" element={<LoginSignupContainer/>}/>  
      <Route path="/activate" element={<Activate />} />
      <Route path="/coming_soon" element={<ComingSoon />} />
      {/* catch all */}
      <Route path="*" element={<Missing/>}/>

        <Route element={<RequireAuth />}>
          <Route path="/chat" element={<Chat/>}/>
        </Route>
  
    </Routes>
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Footer />
      </div>
    </div>
  </div>
  </div>
  </>
);

export default App;