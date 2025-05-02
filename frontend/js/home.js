
import navbar,{bindingAllAnchor} from "./navbar.js"
let home=()=>{
	setTimeout(()=>{
		bindingAllAnchor()
	})
	return `${navbar()}
	<div id="container"></div>`
}
export default home