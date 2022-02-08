import {useContext, useEffect, useState} from "../modules/hooks.js";
import {html} from "../modules/standalone.js";
import {dayNames, formatTime, parseTime} from "../utils/date.js";
import {AuthContext} from "../App.js";

function EditDialog({open, setOpen, course, setCourse, setChanged}) {

    const {token} = useContext(AuthContext)

    return html`
        <dialog open=${open}>
            <form>
                <h2>${course?.id ? "Edit" : "Buat"} pelatihan</h2>
                <input type="hidden" value=${course?.id}/>

                <main>
                    <label>Nama</label>
                    <input type="text" placeholder="Nama" value=${course?.name} onInput=${(e) => {
                        setCourse({...course, name: e.target.value});
                    }}/>

                    <label>Durasi (jam)</label>
                    <input type="number" placeholder="Durasi (jam)" value=${course?.duration} onInput=${(e) => {
                        setCourse({...course, duration: e.target.value});
                    }}/>
                </main>
                
                <div>
                    <button
                            type="reset"
                            className="button-outlined"
                            onClick=${() => {
                                setOpen(false);
                            }}
                    >
                        Batal
                    </button>
                    <button
                            className="button-outlined"
                            onClick=${async (e) => {
                                e.preventDefault();
                                const response = await fetch(
                                        `/api/courses`,
                                        {
                                            method: course?.id ? "POST" : "PUT",
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${token}`,
                                            },
                                            body: JSON.stringify(course),
                                        }
                                );
                                if (response.ok) {
                                    setOpen(false);
                                    setChanged(true);
                                }
                            }}
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </dialog>
    `;
}

export default function Courses() {
    const {token, account} = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [keywords, setKeywords] = useState();
    const [editOpen, setEditOpen] = useState(false);
    const [course, setCourse] = useState();
    const [changed, setChanged] = useState(false);

    useEffect(async () => {
        const response = await fetch("/api/courses");
        setCourses(await response.json());
        setChanged(false);
    }, [changed]);

    return html`
        <div>
            <h1>Pelatihan</h1>
            <div>
                <input type="text" placeholder="Cari" autofocus onInput=${(e) => {
                    setKeywords(e.target.value);
                }}/>
                <button className="button-outlined" onClick=${async () => {
                    setCourse({});
                    setEditOpen(true);
                }}>Buat
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Nama</th>
                    <th>Durasi</th>
                    ${account && html`
                        <th></th>`}
                </tr>
                </thead>
                <tbody>
                ${courses.map((course) => (() => {
                    const data = [
                        course.name,
                        `${course.duration} jam`,
                    ];

                    let match = !keywords;
                    for (let d of data) {
                        if (match) {
                            break;
                        }
                        if (d.toString().toLowerCase().includes(keywords?.toLowerCase())) {
                            match = true;
                        }
                    }

                    if (match) {
                        return html`
                            <tr>
                                ${data.map((data) => html`
                                    <td>${data}</td>
                                `)}
                                ${account && html`
                                    <td>
                                        <div>
                                            <button className="button-outlined" onClick=${async () => {
                                                const response = await fetch(
                                                        `/api/courses/${course.id}`,
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                );
                                                if (response.ok) {
                                                    setCourse(await response.json());
                                                    setEditOpen(true);
                                                }
                                            }}>Edit
                                            </button>
                                            <button className="button-outlined" onClick=${async (e) => {
                                                if (confirm("Apakah Anda yakin ingin menghapus?")) {
                                                    const response = await fetch(
                                                            `/api/courses/${course?.id}`,
                                                            {
                                                                method: "DELETE",
                                                                headers: {
                                                                    Authorization: `Bearer ${token}`,
                                                                },
                                                            }
                                                    );
                                                    if (response.ok) {
                                                        setChanged(true);
                                                    }
                                                }
                                            }}>Hapus
                                            </button>
                                        </div>
                                    </td>`}
                            </tr>
                        `
                    }
                })())}
                </tbody>
            </table>
        </div>
        <${EditDialog}
                open=${editOpen}
                setOpen=${setEditOpen}
                course=${course}
                setCourse=${setCourse}
                setChanged=${setChanged}
        />
    `;
}
