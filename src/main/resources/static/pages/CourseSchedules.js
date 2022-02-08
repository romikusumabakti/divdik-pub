import {useContext, useEffect, useState} from "../modules/hooks.js";
import {html} from "../modules/standalone.js";
import {dayNames, formatTime, parseTime} from "../utils/date.js";
import {AuthContext} from "../App.js";

function EditDialog({open, setOpen, courseSchedule, setCourseSchedule, setChanged}) {

    const {token} = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [courseGroups, setCourseGroups] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(async () => {
        setCourses(await (await fetch("/api/courses")).json());
        setCourseGroups(await (await fetch("/api/course_groups")).json());
        setAccounts(await (await fetch("/api/accounts")).json());
        setRooms(await (await fetch("/api/rooms")).json());
    }, []);

    return html`
        <dialog open=${open}>
            <form>
                <h2>${courseSchedule?.id ? "Edit" : "Buat"} jadwal</h2>
                <input type="hidden" value=${courseSchedule?.id}/>

                <main>
                    <label>Pelatihan</label>
                    <select value=${courseSchedule?.courseIid} onInput=${(e) => {
                        setCourseSchedule({...courseSchedule, courseId: e.target.value});
                    }}>
                        ${courses.map((course) => html`
                            <option value=${course.id}>${course.name}</option>
                        `)}
                    </select>
    
                    <label>Kelompok</label>
                    <select value=${courseSchedule?.courseGroupId} onInput=${(e) => {
                        setCourseSchedule({...courseSchedule, courseGroupId: e.target.value});
                    }}>
                        ${courseGroups.map((courseGroup) => html`
                            <option value=${courseGroup.id}>${courseGroup.number}</option>
                        `)}
                    </select>
    
                    <label>Instruktur</label>
                    <select value=${courseSchedule?.instructorId} onInput=${(e) => {
                        setCourseSchedule({...courseSchedule, instructorId: e.target.value});
                    }}>
                        ${accounts.map((account) => html`
                            <option value=${account.id}>${account.name} (${account.nim})</option>
                        `)}
                    </select>
    
                    <label>Hari</label>
                    <select value=${courseSchedule?.day} onInput=${(e) => {
                        setCourseSchedule({...courseSchedule, day: e.target.value});
                    }}>
                        ${dayNames.map((dayName, dayNumber) => html`
                            <option value=${dayNumber}>${dayName}</option>
                        `)}
                    </select>
    
                    <div>
                        <span>
                            <label>Waktu mulai</label>
                            <input type="time" value=${courseSchedule?.time} onInput=${(e) => {
                                setCourseSchedule({...courseSchedule, time: e.target.value});
                            }}/>
                        </span>
                        <span>
                            <label>Waktu selesai</label>
                            <input type="time" disabled value=${(() => {
                                const time = parseTime(courseSchedule?.time);
                                time.setHours(time.getHours() + courseSchedule?.courseDuration);
                                return time.toLocaleTimeString("en-US", {hour12: false});
                            })()}/>
                        </span>
                    </div>
    
                    <label>Ruang</label>
                    <select value=${courseSchedule?.roomId} onInput=${(e) => {
                        setCourseSchedule({...courseSchedule, roomId: e.target.value});
                    }}>
                        ${rooms.map((room) => html`
                            <option value=${room.id}>${room.name}</option>
                        `)}
                    </select>
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
                                        `/api/course_schedules`,
                                        {
                                            method: courseSchedule?.id ? "POST" : "PUT",
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${token}`,
                                            },
                                            body: JSON.stringify(courseSchedule),
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

export default function CourseSchedules() {
    const {token, account} = useContext(AuthContext);
    const [courseSchedules, setCourseSchedules] = useState([]);
    const [keywords, setKeywords] = useState();
    const [editOpen, setEditOpen] = useState(false);
    const [courseSchedule, setCourseSchedule] = useState();
    const [changed, setChanged] = useState(false);

    useEffect(async () => {
        const response = await fetch("/api/course_schedules");
        setCourseSchedules(await response.json());
        setChanged(false);
    }, [changed]);

    return html`
        <div>
            <h1>Jadwal</h1>
            <div>
                <input type="text" placeholder="Cari" autofocus onInput=${(e) => {
                    setKeywords(e.target.value);
                }}/>
                <button className="button-outlined" onClick=${async () => {
                    setCourseSchedule({});
                    setEditOpen(true);
                }}>Buat
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Pelatihan</th>
                    <th>Kelompok</th>
                    <th>Instruktur</th>
                    <th>Hari</th>
                    <th>Waktu mulai</th>
                    <th>Waktu selesai</th>
                    <th>Ruang</th>
                    ${account && html`
                        <th></th>`}
                </tr>
                </thead>
                <tbody>
                ${courseSchedules.map((courseSchedule) => (() => {
                    const data = [
                        courseSchedule.course.name,
                        courseSchedule.courseGroup.name || courseSchedule.courseGroup.number,
                        courseSchedule.instructor.name,
                        dayNames[courseSchedule.day],
                        formatTime(parseTime(courseSchedule.time)),
                        (() => {
                            const startTime = parseTime(courseSchedule.time);
                            const endTime = new Date(startTime);
                            endTime.setHours(startTime.getHours() + courseSchedule.course.duration);
                            return formatTime(endTime);
                        })(),
                        courseSchedule.room.name,
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
                                                        `/api/course_schedules/${courseSchedule.id}`,
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                );
                                                if (response.ok) {
                                                    setCourseSchedule(await response.json());
                                                    setEditOpen(true);
                                                }
                                            }}>Edit
                                            </button>
                                            <button className="button-outlined" onClick=${async (e) => {
                                                if (confirm("Apakah Anda yakin ingin menghapus?")) {
                                                    const response = await fetch(
                                                            `/api/course_schedules/${courseSchedule?.id}`,
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
                courseSchedule=${courseSchedule}
                setCourseSchedule=${setCourseSchedule}
                setChanged=${setChanged}
        />
    `;
}
