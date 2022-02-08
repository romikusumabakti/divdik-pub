import {useContext, useEffect, useState} from "../modules/hooks.js";
import {html} from "../modules/standalone.js";
import {dayNames, formatTime, parseTime} from "../utils/date.js";
import {AuthContext} from "../App.js";

function EditDialog({open, setOpen, account, setAccount, setChanged}) {

    const {token} = useContext(AuthContext);

    return html`
        <dialog open=${open}>
            <form>
                <h2>${account?.id ? "Edit" : "Buat"} akun</h2>
                <input type="hidden" value=${account?.id}/>

                <main>
                    <label>NIM</label>
                    <input type="text" placeholder="NIM" value=${account?.nim} onInput=${(e) => {
                        setAccount({...account, nim: e.target.value});
                    }}/>
                    
                    <label>Nama pengguna</label>
                    <input type="text" placeholder="Nama pengguna" value=${account?.username} onInput=${(e) => {
                        setAccount({...account, username: e.target.value});
                    }}/>

                    <label>Email</label>
                    <input type="text" placeholder="Email" value=${account?.email} onInput=${(e) => {
                        setAccount({...account, email: e.target.value});
                    }}/>

                    <label>Nama</label>
                    <input type="text" placeholder="Nama" value=${account?.name} onInput=${(e) => {
                        setAccount({...account, name: e.target.value});
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
                                        `/api/accounts`,
                                        {
                                            method: account?.id ? "POST" : "PUT",
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${token}`,
                                            },
                                            body: JSON.stringify(account),
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

export default function Accounts() {
    const {token, account: loggedInAccount} = useContext(AuthContext);
    const [courseSchedules, setCourseSchedules] = useState([]);
    const [keywords, setKeywords] = useState();
    const [editOpen, setEditOpen] = useState(false);
    const [account, setAccount] = useState();
    const [changed, setChanged] = useState(false);

    useEffect(async () => {
        const response = await fetch("/api/accounts");
        setCourseSchedules(await response.json());
        setChanged(false);
    }, [changed]);

    return html`
        <div>
            <h1>Akun</h1>
            <div>
                <input type="text" placeholder="Cari" autofocus onInput=${(e) => {
                    setKeywords(e.target.value);
                }}/>
                <button className="button-outlined" onClick=${async () => {
                    setAccount({});
                    setEditOpen(true);
                }}>Buat
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>NIM</th>
                    <th>Nama pengguna</th>
                    <th>Email</th>
                    <th>Nama</th>
                    ${loggedInAccount && html`
                        <th></th>`}
                </tr>
                </thead>
                <tbody>
                ${courseSchedules.map((account) => (() => {
                    const data = [
                        account.nim,
                        account.username,
                        account.email,
                        account.name
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
                                ${loggedInAccount && html`
                                    <td>
                                        <div>
                                            <button className="button-outlined" onClick=${async () => {
                                                const response = await fetch(
                                                        `/api/accounts/${account.id}`,
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                );
                                                if (response.ok) {
                                                    setAccount(await response.json());
                                                    setEditOpen(true);
                                                }
                                            }}>Edit
                                            </button>
                                            <button className="button-outlined" onClick=${async (e) => {
                                                if (confirm("Apakah Anda yakin ingin menghapus?")) {
                                                    const response = await fetch(
                                                            `/api/accounts/${account?.id}`,
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
                account=${account}
                setAccount=${setAccount}
                setChanged=${setChanged}
        />
    `;
}
