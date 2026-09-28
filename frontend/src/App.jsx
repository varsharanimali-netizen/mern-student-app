import { useEffect, useState } from "react";

function App() {

    const [students, setStudents] = useState([]);

    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [email, setEmail] = useState("");

    //const API_URL = "http://localhost:5000";
    const API_URL = import.meta.env.VITE_API_URL;

    // Get all students
    const fetchStudents = async () => {

        try {

            const response = await fetch(
                `${API_URL}/api/students`
            );

            const data = await response.json();

            setStudents(data);

        } catch (error) {

            console.log("Error fetching students:", error);

        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Add student
    const addStudent = async (e) => {

        e.preventDefault();

        try {

            await fetch(`${API_URL}/api/students`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    course,
                    email
                })

            });

            setName("");
            setCourse("");
            setEmail("");

            fetchStudents();

        } catch (error) {

            console.log("Error adding student:", error);

        }
    };

    // Delete student
    const deleteStudent = async (id) => {

        try {

            await fetch(
                `${API_URL}/api/students/${id}`,
                {
                    method: "DELETE"
                }
            );

            fetchStudents();

        } catch (error) {

            console.log("Error deleting student:", error);

        }
    };

    return (

        <div>

            <h1>Student Management System</h1>

            <h2>Add Student</h2>

            <form onSubmit={addStudent}>

                <input
                    type="text"
                    placeholder="Student Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(e) =>
                        setCourse(e.target.value)
                    }
                    required
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <br /><br />

                <button type="submit">
                    Add Student
                </button>

            </form>

            <h2>Student List</h2>

            {students.length === 0 ? (

                <p>No students found.</p>

            ) : (

                students.map((student) => (

                    <div key={student._id}>

                        <h3>{student.name}</h3>

                        <p>
                            Course: {student.course}
                        </p>

                        <p>
                            Email: {student.email}
                        </p>

                        <button
                            onClick={() =>
                                deleteStudent(student._id)
                            }
                        >
                            Delete
                        </button>

                        <hr />

                    </div>

                ))

            )}

        </div>
    );
}

export default App;