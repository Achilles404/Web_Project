window.addEventListener('DOMContentLoaded', () => {
    var element = document.getElementById("page4");
    element.classList.add("now");
})
var index = localStorage.getItem('index')
var isDeleted = 0;
var currentId;
var prev = [];

function removeStudent() {
    var coursesArray = JSON.parse(localStorage.getItem("course"))
    for (var course of coursesArray) {
        if (prev.includes(course.Course_name)) {
            course.Number_of_students--;
        }
    }
  
    localStorage.setItem("course", JSON.stringify(coursesArray));
    
    var studentArray = JSON.parse(localStorage.getItem("student"))
    studentArray.splice(index, 1)
    localStorage.setItem("student", JSON.stringify(studentArray));
    isDeleted = 1;
}
function alertstudent() {
    var proceed = confirm("Are you sure you want delete this student ?");
    if (proceed) {
        removeStudent();
        location.href = "students.html";
    }
}
function initialize() {
    prev = [];
    isDeleted = 0;
    var studentArray = JSON.parse(localStorage.getItem("student"))
    const Name = document.getElementById('Name');
    Name.value = studentArray[index].name;
    const ID = document.getElementById('ID');
    ID.value = studentArray[index].id;
    currentId = ID.value;
    const Day = document.getElementById('Day');
    Day.value = studentArray[index].birthday.Day;
    const Month = document.getElementById('Month');
    Month.value = studentArray[index].birthday.Month;
    const Year = document.getElementById('Year');
    Year.value = studentArray[index].birthday.Year;
    const University = document.getElementById('University');
    University.value = studentArray[index].university;
    const Departament = document.getElementById('Departament');
    Departament.value = studentArray[index].department;
    const course_1 = document.getElementById('Course-1');
    course_1.value = studentArray[index].course_1;
    const course_2 = document.getElementById('Course-2');
    course_2.value = studentArray[index].course_2;
    const course_3 = document.getElementById('Course-3');
    course_3.value = studentArray[index].course_3;
    const radio_1 = document.getElementById('radio-1');
    const radio_2 = document.getElementById('radio-2');
    if (studentArray[index].Gender === 'Male') {
        radio_1.checked = true;
    } else {
        radio_2.checked = true;
    }
    const radio_3 = document.getElementById('radio-3');
    const radio_4 = document.getElementById('radio-4');
    if (studentArray[index].status === 'Active') {
        radio_3.checked = true;
    } else {
        radio_4.checked = true;
    }

    var coursesArray = JSON.parse(localStorage.getItem("course"))
    if (coursesArray == null) {
        coursesArray = []
    }

    for (var course of coursesArray) {
        if (course.Course_name == course_1.value || course.Course_name == course_2.value || course.Course_name == course_3.value) {
            prev.push(course.Course_name);
        }
    }

    localStorage.setItem("course", JSON.stringify(coursesArray));
}
window.addEventListener('DOMContentLoaded', () => {

    var coursesArray = JSON.parse(localStorage.getItem("course"))

    function buildSelect(data) {
        var sel = document.getElementById(`Course-${data}`)
        sel.innerHTML = `<option value="">Course ${data}</option>`
        for (var i = 0; i < coursesArray.length; i++) {
            var oop = `<option value="${coursesArray[i].Course_name}"> ${coursesArray[i].Course_name}</option>`
            sel.innerHTML += oop
        }
    }

    buildSelect(1);
    buildSelect(2);
    buildSelect(3);
    initialize();
    const form = document.getElementsByClassName('modal-content')[0];
    const Name = document.getElementById('Name');
    const ID = document.getElementById('ID');
    const Day = document.getElementById('Day');
    const Month = document.getElementById('Month');
    const Year = document.getElementById('Year');
    const University = document.getElementById('University');
    const Departament = document.getElementById('Departament');
    const course_1 = document.getElementById('Course-1');
    const course_2 = document.getElementById('Course-2');
    const course_3 = document.getElementById('Course-3');
    const radio_1 = document.getElementById('radio-1');
    const radio_2 = document.getElementById('radio-2');
    const radio_3 = document.getElementById('radio-3');
    const radio_4 = document.getElementById('radio-4');
    const radios = document.getElementsByClassName('select-field');
    form.addEventListener('submit', e => {
        e.preventDefault();
        if (validation() === true && !isDeleted) {
            var current_student = {
                'name': Name.value,
                'id': ID.value,
                'birthday': {
                    'Day': Day.value,
                    'Month': Month.value,
                    'Year': Year.value,
                },
                'course_1': course_1.value,
                'course_2': course_2.value,
                'course_3': course_3.value,
                'Gender': (radio_1.checked ? "Male" : "Female"),
                'status': (radio_3.checked ? "Active" : "Inactive"),
                'university': University.value,
                'department': Departament.value
            }


            var coursesArray = JSON.parse(localStorage.getItem("course"))
            if (coursesArray == null) {
                coursesArray = []
            }

            for (var course of coursesArray) {
                if (prev.includes(course.Course_name)) {
                    course.Number_of_students--;
                }
            }

            for (var course of coursesArray) {
                if (course.Course_name == course_1.value || course.Course_name == course_2.value || course.Course_name == course_3.value) {
                    course.Number_of_students++;
                }
            }

            localStorage.setItem("course", JSON.stringify(coursesArray));

            var studentArray = JSON.parse(localStorage.getItem("student"))
            studentArray[index] = current_student;
            localStorage.setItem("student", JSON.stringify(studentArray));

            location.href = 'students.html';
        }
    });


    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success')
    }

    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const validation = () => {

        let flag = true;
        if (Name.value === '') {
            setError(Name, 'Student Name is required');
            flag = false;
        } else {
            setSuccess(Name);
        }

        if (ID.value === '') {
            setError(ID, 'Student ID is required');
            flag = false;
        }
        else {
            var studentArray = JSON.parse(localStorage.getItem("student"))
            for (var student of studentArray) {
                if (ID.value == student.id && ID.value != currentId) {
                    setError(ID, 'Student ID already exist');
                    flag = false;
                    break
                }
            }
            if (flag === true)
                setSuccess(ID);
        }

        if (Day.value === '') {
            setError(Day, 'Day is required');
            flag = false;
        } else if (Month.value === '') {
            setError(Month, 'Month is required');
            flag = false;
        } else if (Year.value === '') {
            setError(Year, 'Year is required');
            flag = false;
        } else {
            setSuccess(Day);
        }

        if (University.value === '') {
            setError(University, 'University is required');
            flag = false;
        } else {
            setSuccess(University);
        }

        if (Departament.value === '') {
            setError(Departament, 'Department is required');
            flag = false;
        } else {
            setSuccess(Departament);
        }

        if (course_1.value === '') {
            setError(course_1, 'Course 1 is required');
            flag = false;
        } else if (course_2.value === '') {
            setError(course_2, 'Course 2 is required');
            flag = false;
        } else if (course_3.value === '') {
            setError(course_3, 'Course 3 is required');
            flag = false;
        } else if (course_1.value == course_2.value || course_1.value == course_3.value || course_2.value == course_3.value) {
            setError(course_1, 'The 3 Courses should be different');
            alert('You must choose 3 different courses!!')
            flag = false;
        } else {
            setSuccess(course_1);
        }

        if (radio_1.checked === false && radio_2.checked === false) {
            setError(radios[0], 'Gender is required');
            flag = false;
        } else {
            setSuccess(radios[0]);
        }

        if (radio_3.checked === false && radio_4.checked === false) {
            setError(radios[1], 'Stauts is required');
            flag = false;
        } else {
            setSuccess(radios[1]);
        }


        return flag;

    };


})