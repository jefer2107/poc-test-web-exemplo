import { Link } from "react-router-dom"

export const Home = () => {
    return(
        <div className="font-bold flex justify-center items-center flex-col w-full">
            <div className="">Home</div>
            <Link to="/page-test">Ir para a página de teste</Link>
        </div>
    )
}