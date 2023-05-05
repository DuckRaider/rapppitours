import mainPageImage from "./images/mainPageImage.png";
import logo from "./images/logo.png";

export function Home(){
    return(
        <>
        <div>
            <img src={mainPageImage} id="mainImageHomepage"/>
            <img src={logo} id="logo"/>
        </div>

        <h1>Home</h1>
        </>
    )
}