import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { PageTest } from "./PageTest"


export const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/page-test" element={<PageTest />}/>
            </Routes>
        </BrowserRouter>
    )
}