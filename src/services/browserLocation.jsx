//would be good to make us of the idea to seperate the functiosn from
//the rest of the code
export function getBrowserLocation(){
    try {
        return new Promise((resolve, reject) => 
            navigator.geolocation.getCurrentPosition(resolve, reject)
        );
    } catch (error) {
        console.log(error)
    }
}