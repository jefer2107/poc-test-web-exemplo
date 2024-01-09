import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { jwtDecode } from "jwt-decode"

export const PageTest = () => {
    const tokenStorage = localStorage.getItem("token")
    const payloadAccessToken = tokenStorage? jwtDecode(tokenStorage): null
    const [message, setMessage] = useState("")
    const [acessToken, setAcessToken] = useState(null)

    useEffect(() => {
        const checkExpires = () => {
            if(payloadAccessToken){
                const dateExpiresAcessToken = moment(payloadAccessToken?.exp ?? 0 * 1000)
                const now = moment()
        
                console.log("dateExpiresAcessToken", dateExpiresAcessToken)
                console.log("date", dateExpiresAcessToken.diff(now, 'minutes'))
                
                return dateExpiresAcessToken.diff(now, 'minutes') <= 0
    
            }else return false
        }

        if(!tokenStorage) authenticate()

        else{
            if(checkExpires()) tokenRenewal()
        }
    }, [tokenStorage, acessToken, payloadAccessToken])

    const authenticate = async () => {
        try {
            const { data } = await axios
            .get("http://localhost:3001/auth/spa02_client", {withCredentials: true})

            console.log("data", data)

            setAcessToken(() => data || null)

            if(data){
                localStorage.setItem("token", data)
                setMessage("Logado")

            } else setMessage("Não autorizado")

        } catch (error) {
            setMessage("Algo errado ocorreu")
        }
    }

    const tokenRenewal = async () => {
        try {
            const { data } = await axios
            .put("http://localhost:3001//auth/tokenRenewal/spa02_client", {withCredentials: true})

            setAcessToken(() => data || null)

            if(data){
                localStorage.setItem("token", data)
                setMessage("Logado")
                
            } else setMessage("Não autorizado")

        } catch (error) {
            setMessage("Algo errado ocorreu")
        }
    }

    return(
        <div className="font-bold flex justify-center items-center flex-col w-full">
            {JSON.stringify(payloadAccessToken)}
            <div className="">Teste</div>
            <Link to="/">Voltar</Link>
            <div className="p-40">
                <span>Message: {message}</span>
            </div>
        </div>

    )
}