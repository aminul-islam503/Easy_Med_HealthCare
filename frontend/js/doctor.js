/**
 * 
 */

// doctor.js

let doctor=()=> {
	setTimeout(()=>{
		bindingAllButton();
	})
    
    return `
        <h2>Doctor Management</h2>
        <div id="doctor-action-container">
		<button data-action="add">Add Doctor</button>
		<button data-action="view">View Doctors</button>
		<button data-action="search">Search Doctor</button>
		<button data-action="update">Update Doctor</button>
		<button data-action="delete">Delete Doctor</button>
        </div>
        <div id="doctor-form-container"></div>
    `;

  
}
export default doctor;

export function bindingAllButton() {
	const allButton = document.querySelectorAll("button[data-action]");

	let pageReloader = {
			"add": addDoctorForm,
			"view": viewDoctors,
			"search": searchById,
			"update": updateDoctor,
			"delete": deleteDoctor
		}
	const handleClick = (e) => {
		const action = e.target.getAttribute("data-action");
		if (action && pageReloader[action]) {
			pageReloader[action]();
		}
	};

	allButton.forEach((btn) => {
		btn.addEventListener("click", handleClick);
	});
}


// Add Doctor
function addDoctorForm() {
    const container = document.getElementById("doctor-form-container");
    container.innerHTML = `
        <h3>Add Doctor</h3>
        <form id="addDoctorForm">
            <input type="text" name="doctorName" placeholder="Name" required>
            <input type="text" name="doctorSpecialization" placeholder="Specialization" required>
            <input type="text" name="doctorEmail" placeholder="Email" required>
            <input type="text" name="doctorPhone" placeholder="Phone" required>
            <button type="submit">Add</button>
        </form>
    `;

    let form = document.getElementById("addDoctorForm")
    let input = document.querySelectorAll("input")

    let handleSubmit=(e)=>{

        e.preventDefault();
        const payload = {};
		input.forEach(inp => {
			payload[inp.name] = inp.value;
		});
        try {
            (async ()=>{
                const response = await fetch("http://localhost:8080/api/doctors/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                const result = await response.json();
                alert("Doctor added!");
            })()
        } 
        catch (error) {
            console.error("Error "+error);
            alert(' error while adding doctor')
            
        }

    }
    form.addEventListener("submit",handleSubmit);
}

// View All Doctors
export function viewDoctors() {
    const container = document.getElementById("doctor-form-container");
    container.innerHTML = `
    <h3>All Doctors</h3>
    <table id="patientsTable">
		<thead>
        	<tr>
         		<th>ID</th>
				<th>Name</th>
				<th>Specialization</th>
				<th>Email</th>
				<th>Phone</th>
        	</tr>
		</thead>
		<tbody id="tableBody"></tbody>
	</table>
    `;

    try {
        (async ()=>{
            const res = await fetch("http://localhost:8080/api/doctors/fetchAll");
            const doctors = await res.json();
            const tbody = document.querySelector("#tableBody")
            tbody.innerHTML="";
            doctors.forEach(doctor=>{
                let row = `
                <tr>
					<td>${doctor.doctorId}</td>
					<td>${doctor.doctorName}</td>
					<td>${doctor.doctorSpecialization}</td>
					<td>${doctor.doctorEmail}</td>
					<td>${doctor.doctorPhone}</td>
				</tr>
                `;
                tbody.innerHTML+=row
            })

        })()

    } catch (err) {
        console.error("Failed to fetch doctors", err);
    }
}

// Search Doctor
function searchById() {
    const container = document.getElementById("doctor-form-container");
    container.innerHTML = `
        <h3>Search Doctor</h3>
        <form id="searchDoctorForm">
            <input type="number" id="searchDoctorId" placeholder="Doctor ID" required>
            <button type="submit">Search</button>
        </form>
        <div id="doctorSearchResult"></div>
    `;

    let doctorForm=document.getElementById("searchDoctorForm")
    let resultDiv =  document.getElementById("doctorSearchResult");
    let handleSubmit=(e)=>{

        e.preventDefault()
        const doctorId = document.getElementById("searchDoctorId").value;

        try {
            (async ()=>{

                const res = await fetch(`http://localhost:8080/api/doctors/fetchDoctorById?doctorId=${doctorId}`);
            const doc = await res.json();
           resultDiv.innerHTML = `
                <p><strong>Name:</strong> ${doc.doctorName}</p>
                <p><strong>Specialization:</strong> ${doc.doctorSpecialization}</p>
                <p><strong>Email:</strong> ${doc.doctorEmail}</p>
                <p><strong>Phone:</strong> ${doc.doctorPhone}</p>
            `;
            })()
            
        } catch (error) {
            console.error("Error "+error);
            
        }
    }
    doctorForm.addEventListener("submit",handleSubmit)

}

// Update Doctor
function updateDoctor() {
    const container = document.getElementById("doctor-form-container");
    container.innerHTML = `
        <h3>Update Doctor</h3>
        <form id="updateDoctorForm">
            <input type="number" name="doctorId" placeholder="Doctor ID" required>
            <input type="text" name="doctorName" placeholder="Name">
            <input type="text" name="doctorSpecialization" placeholder="Specialization">
            <input type="email" name="doctorEmail" placeholder="Email">
            <input type="text" name="doctorPhone" placeholder="Phone">
            <button type="submit">Update</button>
        </form>
    `;

    let form = document.querySelector("form")
    let inputs = document.querySelectorAll("input")
    let handleSubmit=(e)=>{
        e.preventDefault()
        let updatedDoctor = {}
        inputs.forEach((input)=>{
            updatedDoctor[input.name]=input.value
        })
        let oldDoctorId = updatedDoctor.doctorId;

        try {
            (async ()=>{
                const res = await fetch(`http://localhost:8080/api/doctors/updateDoctorById?oldDoctorId=${oldDoctorId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedDoctor),
                });
                const data = await res.json();
                alert("Doctor updated successfully");
            })()
        } catch (error) {
            console.error("Update failed", error);
        }

    }
    form.addEventListener("submit",handleSubmit)
}

// Delete Doctor
function deleteDoctor() {
    const container = document.getElementById("doctor-form-container");
    container.innerHTML = `
        <h3>Delete Doctor</h3>
        <form>
            <input type="number" id="deleteDoctorId" placeholder="Doctor ID" required>
            <button type="submit">Delete</button>
        </form>
    `;

    let form = document.querySelector("form")
    let handleSubmit=(e)=>{
        e.preventDefault();
        const doctorId = document.getElementById("deleteDoctorId").value;
        try {
            (async ()=>{

                const res = await fetch(`http://localhost:8080/api/doctors/deleteDoctorById?doctorId=${doctorId}`, {
                    method: "DELETE",
                });
                if (!res.ok) {
					throw new Error("Failed to delete doctor");
				}
				alert("doctor deleted successfully");
            })()
        } catch (error) {
            console.error("Delete failed", error);
        }
    }
    form.addEventListener("submit",handleSubmit)
    
}
