function login() {
    window.location.href = "dashboard.html";
}

async function addAnnouncement() {

    let title = document.getElementById("announcementInput").value;

    if (title.trim() === "") {
        alert("Please enter an announcement!");
        return;
    }

    await fetch("http://172.26.189.87:8000/announcement", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            content: "Added from Frontend"
        })
    });

    document.getElementById("announcementInput").value = "";

    getAnnouncements();
}
async function addLostItem() {

    let itemName = document.getElementById("itemName").value;
    let description = document.getElementById("description").value;
    let location = document.getElementById("location").value;
    let owner = document.getElementById("owner").value;

    if (itemName.trim() === "" || description.trim() === "" ||
        location.trim() === "" || owner.trim() === "") {
        alert("Please fill all fields!");
        return;
    }

    await fetch("http://172.26.189.87:8000/lostfound", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            item_name: itemName,
            description: description,
            location: location,
            owner: owner
        })
    });

    alert("Item Reported Successfully ✅");

    getLostItems();

    document.getElementById("itemName").value = "";
    document.getElementById("description").value = "";
    document.getElementById("location").value = "";
    document.getElementById("owner").value = "";
}
async function getLostItems() {

    let response = await fetch("http://172.26.189.87:8000/lostfound");
    let data = await response.json();

    let list = document.getElementById("lostItemList");
    list.innerHTML = "";

    data.forEach(item => {
        list.innerHTML += `
            <div class="lost-card">
                <h3>🎒 ${item.item_name}</h3>
                <p><b>Description:</b> ${item.description}</p>
                <p><b>Location:</b> ${item.location}</p>
                <p><b>Owner:</b> ${item.owner}</p>
            </div>
        `;
    });
}
async function addComplaint() {

    let student = document.getElementById("studentName").value;
    let department = document.getElementById("department").value;
    let complaint = document.getElementById("complaintInput").value;

    if(student=="" || department=="" || complaint==""){
        alert("Please fill all fields");
        return;
    }

    await fetch("http://172.26.189.87:8000/complaint",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            student_name:student,
            department:department,
            complaint:complaint
        })
    });

    alert("Complaint Submitted Successfully ✅");

    getComplaints();

    document.getElementById("studentName").value="";
    document.getElementById("department").value="";
    document.getElementById("complaintInput").value="";
}

async function getComplaints() {
    let response = await fetch("http://172.26.189.87:8000/complaints");
    let data = await response.json();

    let list = document.getElementById("complaintList");
    list.innerHTML = "";

    data.forEach(item => {
        list.innerHTML += `
<div class="complaint-card">
    <h3>📝 ${item.student_name}</h3>
    <p><strong>Department:</strong> ${item.department}</p>
    <p>${item.complaint}</p>
</div>
`;
    });
}

async function addHero() {

    let name = document.getElementById("heroName").value;
    let department = document.getElementById("heroDepartment").value;
    let achievement = document.getElementById("heroAchievement").value;

    if (name.trim() === "" || department.trim() === "" || achievement.trim() === "") {
        alert("Please fill all fields!");
        return;
    }

    await fetch("http://172.26.189.87:8000/hero", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            department: department,
            achievement: achievement
        })
    });

    alert("Campus Hero Added Successfully 🏆");

    getHeroes();

    document.getElementById("heroName").value = "";
    document.getElementById("heroDepartment").value = "";
    document.getElementById("heroAchievement").value = "";
}

async function getHeroes() {

    let response = await fetch("http://172.26.189.87:8000/heroes");
    let data = await response.json();

    let list = document.getElementById("heroList");
    list.innerHTML = "";

    data.forEach(item => {

        list.innerHTML += `
        <div class="hero-card">
            <h3>🏆 ${item.name}</h3>
            <p><b>Department:</b> ${item.department}</p>
            <p>🌟 ${item.achievement}</p>
        </div>
        `;

    });
}

async function addReminder() {

    let title = document.getElementById("reminderTitle").value;
    let date = document.getElementById("reminderDate").value;
    let time = document.getElementById("reminderTime").value;

    if (title.trim() === "" || date === "" || time === "") {
        alert("Please fill all fields!");
        return;
    }

    await fetch("http://172.26.189.87:8000/reminder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            date: date,
            time: time
        })
    });

    alert("Reminder Added Successfully 🔔");

    getReminders();

    document.getElementById("reminderTitle").value = "";
    document.getElementById("reminderDate").value = "";
    document.getElementById("reminderTime").value = "";
}

async function getReminders() {

    let response = await fetch("http://172.26.189.87:8000/reminders");
    let data = await response.json();

    let list = document.getElementById("reminderList");
    list.innerHTML = "";

    data.forEach(item => {
        list.innerHTML += `
        <div class="reminder-card">
            <h3>🔔 ${item.title}</h3>
            <p>📅 ${item.date}</p>
            <p>⏰ ${item.time}</p>
        </div>
        `;
    });
}

async function getAnnouncements() {
    let response = await fetch("http://172.26.189.87:8000/announcements");
    let data = await response.json();

    let list = document.getElementById("announcementList");
    list.innerHTML = "";

    data.forEach(item => {
        list.innerHTML += `
<div class="announcement-card">
    <h3>📢 ${item.title}</h3>
    <p>${item.content}</p>
</div>
`;
    });
}
window.onload = function () {

    if (document.getElementById("announcementList")) {
        getAnnouncements();
    }

    if (document.getElementById("complaintList")) {
        getComplaints();
    }

    if (document.getElementById("lostItemList")) {
        getLostItems();
    }

    if (document.getElementById("reminderList")) {
        getReminders();
    }
    if (document.getElementById("heroList")) {
    getHeroes();
}
};