/**
 * 
 */
import home from "./home.js"
import about from "./about.js"
import patient from "./patient.js"
import doctor from "./doctor.js"
const navbar=()=>{
	return (`	<nav id="navbar">
	            <ul>
	                <li><a href="home">Home</a></li>
	                <li><a href="about" >about</a></li>
	                <li><a href="patient" >Patient</a></li>
	                <li><a href="doctor" >Doctor</a></li>
	                <li><a href="appointment" >Appointment</a></li>
	                <li><a href="billing" >Billing</a></li>
	                <li><a href="#" >Login</a></li>
	                <li><a href="#" >Signup</a></li>
	            </ul>
	        </nav>`)
}

export default navbar

export let bindingAllAnchor=()=>{
	let allAnchor = document.querySelectorAll("a")
	let container = document.querySelector("#container")
	let pageReloader={
		"/home":home,
		"/about":about,
		"/patient":patient,
		"/doctor":doctor
	}
	let handleClick = (e)=> {
		e.preventDefault()
		history.pushState(null,"",`${e.target.pathname}`)
		let page  = window.location.pathname
		page = page.replace("/html","")
		if(page == "/home" || page =="/index.html"){
			root.innerHTML=pageReloader["/home"]()
		}
		else{
			container.innerHTML = pageReloader[page]()
		}
	}
	
	allAnchor.forEach((a)=>{
		a.addEventListener('click',handleClick)
	})
}