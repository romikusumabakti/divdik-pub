import {useContext, useEffect, useState} from "../modules/hooks.js";
import {html} from "../modules/standalone.js";
import {dayNames, formatTime, parseTime} from "../utils/date.js";
import {AuthContext} from "../App.js";

function EditDialog({open, setOpen, courseGroup, setCourseGroup, setChanged}) {

    const {token} = useContext(AuthContext)

    return html`
        <dialog open=${open}>
            <form>
                <h2>${courseGroup?.id ? "Edit" : "Buat"} kelompok</h2>
                <input type="hidden" value=${courseGroup?.id}/>

                <main>
                    <label>Nomor</label>
                    <input type="text" placeholder="Nomor" value=${courseGroup?.number} onInput=${(e) => {
                        setCourseGroup({...courseGroup, number: e.target.value});
                    }}/>
                    
                    <label>Nama</label>
                    <input type="text" placeholder="Nama" value=${courseGroup?.name} onInput=${(e) => {
                        setCourseGroup({...courseGroup, name: e.target.value});
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
                                        `/api/course_groups`,
                                        {
                                            method: courseGroup?.id ? "POST" : "PUT",
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${token}`,
                                            },
                                            body: JSON.stringify(courseGroup),
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

export default function CourseGroups() {
    const {token, account} = useContext(AuthContext);
    const [courseGroups, setCourseGroups] = useState([]);
    const [keywords, setKeywords] = useState();
    const [editOpen, setEditOpen] = useState(false);
    const [courseGroup, setCourseGroup] = useState();
    const [changed, setChanged] = useState(false);

    useEffect(async () => {
        const response = await fetch("/api/course_groups");
        setCourseGroups(await response.json());
        setChanged(false);
    }, [changed]);

    return html`
        <div>
            <h1>Kelompok</h1>
            <div>
                <input type="text" placeholder="Cari" autofocus onInput=${(e) => {
                    setKeywords(e.target.value);
                }}/>
                <button className="button-outlined" onClick=${async () => {
                    setCourseGroup({});
                    setEditOpen(true);
                }}>Buat
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Nomor</th>
                    <th>Nama</th>
                    ${account && html`
                        <th></th>`}
                </tr>
                </thead>
                <tbody>
                ${courseGroups.map((courseGroup) => (() => {
                    const data = [
                        courseGroup.number,
                        courseGroup.name
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
                                                        `/api/course_groups/${courseGroup.id}`,
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                );
                                                if (response.ok) {
                                                    setCourseGroup(await response.json());
                                                    setEditOpen(true);
                                                }
                                            }}>Edit
                                            </button>
                                            <button className="button-outlined" onClick=${async (e) => {
                                                if (confirm("Apakah Anda yakin ingin menghapus?")) {
                                                    const response = await fetch(
                                                            `/api/course_groups/${courseGroup?.id}`,
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
                courseGroup=${courseGroup}
                setCourseGroup=${setCourseGroup}
                setChanged=${setChanged}
        />
    `;
}
