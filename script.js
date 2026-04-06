let records = JSON.parse(localStorage.getItem("gradeRecords")) || [];

function validateGrade(value){
    if(value < 0 || value > 100){
        alert("Grades must be between 0 and 100 only!");
        return false;
    }
    return true;
}

function calculate(){
    const name = document.getElementById("name").value.trim() || "Unnamed";

    const quiz = Number(document.getElementById("g1").value) || 0;
    const lab = Number(document.getElementById("g2").value) || 0;
    const assign = Number(document.getElementById("g3").value) || 0;
    const att = Number(document.getElementById("g4").value) || 0;
    const exam = Number(document.getElementById("g5").value) || 0;

    if(![quiz, lab, assign, att, exam].every(validateGrade)) return;

    const final =
        (quiz * 0.20) +
        (lab * 0.30) +
        (assign * 0.10) +
        (att * 0.10) +
        (exam * 0.30);

    document.getElementById("result").innerHTML =
        `🎯 ${name}'s Final Grade: ${final.toFixed(2)}`;

    const record = {
        name, quiz, lab, assign, att, exam,
        final: final.toFixed(2)
    };

    const index = records.findIndex(r => r.name.toLowerCase() === name.toLowerCase());
    if(index >= 0) records[index] = record;
    else records.push(record);

    localStorage.setItem("gradeRecords", JSON.stringify(records));
    renderRecords();
}

function deleteRecord(i){
    if(confirm("Delete this record?")){
        records.splice(i,1);
        localStorage.setItem("gradeRecords", JSON.stringify(records));
        renderRecords();
    }
}

function editRecord(i){
    const r = records[i];

    document.getElementById("name").value = r.name;
    document.getElementById("g1").value = r.quiz;
    document.getElementById("g2").value = r.lab;
    document.getElementById("g3").value = r.assign;
    document.getElementById("g4").value = r.att;
    document.getElementById("g5").value = r.exam;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderRecords(){
    const tbody = document.getElementById("recordBody");
    tbody.innerHTML = "";

    records.forEach((r, i)=>{
        tbody.innerHTML += `
            <tr>
                <td>${r.name}</td>
                <td>${r.quiz}</td>
                <td>${r.lab}</td>
                <td>${r.assign}</td>
                <td>${r.att}</td>
                <td>${r.exam}</td>
                <td><b>${r.final}</b></td>
                <td>
                    <button onclick="editRecord(${i})">✏ Edit</button>
                    <button onclick="deleteRecord(${i})">🗑 Delete</button>
                </td>
            </tr>
        `;
    });
}

renderRecords();