import mainPageImage from "./images/mainPageImage.png";
import logo from "./images/logo.png";

export function Home(){
    return(
        <>
        <img id="logo" src={logo}></img>
        <div id="homeDiv">
            <h1>Discover the Obersee</h1>
            <p>Discover the breathtaking beauty of the Obersee, nestled within the enchanting landscapes surrounding Lake Zurich. Immerse yourself in nature's splendor as you embark on an unforgettable journey through our extensive network of trails. Whether you're a seasoned hiker or a leisurely stroller, there's something for everyone to enjoy in this captivating destination.</p>
            <h1>Create your own journey</h1>
            <p>At Obersee Trails, we believe that every hiker has a unique sense of adventure. That's why we're thrilled to offer you the opportunity to design your very own trail through our interactive website. With just a few clicks, you can become the architect of your outdoor exploration, tailoring the experience to suit your preferences and interests.</p>
            <h1>No Money? No Problem!</h1>
            <p>Our service is completely free! Just get yourself an <a href="/login">account</a> and you're ready to go!</p>
        </div>
        </>
    )
}