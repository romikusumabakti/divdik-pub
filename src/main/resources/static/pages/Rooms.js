import {useContext, useEffect, useState} from "../modules/hooks.js";
import {html} from "../modules/standalone.js";
import {dayNames, formatTime, parseTime} from "../utils/date.js";
import {AuthContext} from "../App.js";

function EditDialog({open, setOpen, room, setRoom, setChanged}) {

    const {token} = useContext(AuthContext)

    return html`
        <dialog open=${open}>
            <form>
                <h2>${room?.id ? "Edit" : "Buat"} ruang</h2>
                <input type="hidden" value=${room?.id}/>

                <main>
                    <label>Nama</label>
                    <input type="text" placeholder="Nama" value=${room?.name} onInput=${(e) => {
                        setRoom({...room, name: e.target.value});
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
                                        `/api/rooms`,
                                        {
                                            method: room?.id ? "POST" : "PUT",
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${token}`,
                                            },
                                            body: JSON.stringify(room),
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

export default function Rooms() {
    const {token, account} = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [keywords, setKeywords] = useState();
    const [editOpen, setEditOpen] = useState(false);
    const [room, setRoom] = useState();
    const [changed, setChanged] = useState(false);

    useEffect(async () => {
        const response = await fetch("/api/rooms");
        setRooms(await response.json());
        setChanged(false);
    }, [changed]);

    return html`
        <div>
            <h1>Ruang</h1>
            <div>
                <input type="text" placeholder="Cari" autofocus onInput=${(e) => {
                    setKeywords(e.target.value);
                }}/>
                <button className="button-outlined" onClick=${async () => {
                    setRoom({});
                    setEditOpen(true);
                }}>Buat
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Nama</th>
                    ${account && html`
                        <th></th>`}
                </tr>
                </thead>
                <tbody>
                ${rooms.map((room) => (() => {
                    const data = [
                        room.name
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
                                                        `/api/rooms/${room.id}`,
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                );
                                                if (response.ok) {
                                                    setRoom(await response.json());
                                                    setEditOpen(true);
                                                }
                                            }}>Edit
                                            </button>
                                            <button className="button-outlined" onClick=${async (e) => {
                                                if (confirm("Apakah Anda yakin ingin menghapus?")) {
                                                    const response = await fetch(
                                                            `/api/rooms/${room?.id}`,
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
                room=${room}
                setRoom=${setRoom}
                setChanged=${setChanged}
        />
    `;
}
