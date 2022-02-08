import { AuthContext } from "../App.js";
import { useContext, useState } from "../modules/hooks.js";
import { route } from "../modules/preact-router.js";
import { html } from "../modules/standalone.js";

export default function Login() {
    const [loginData, setLoginData] = useState({});
    const { account, setToken } = useContext(AuthContext);

    if (account) {
        route("/");
    } else {
        return html`
            <div style=${{ width: 512 }}>
                <h1>Login</h1>
                <form>
                    <input
                        type="text"
                        name="username"
                        placeholder="Nama pengguna"
                        autofocus
                        onChange=${(e) => {
                            setLoginData({
                                ...loginData,
                                username: e.target.value,
                            });
                        }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Kata sandi"
                        onChange=${(e) => {
                            setLoginData({
                                ...loginData,
                                password: e.target.value,
                            });
                        }}
                    />
                    <div>
                        <button
                            className="button-outlined"
                            onClick=${async (e) => {
                                e.preventDefault();
                                const response = await fetch(
                                    "/api/auth/login",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(loginData),
                                    }
                                );
                                if (response.ok) {
                                    const token = await response.text();
                                    localStorage.setItem("token", token);
                                    setToken(token);
                                    if (parseInt(account.admin)) {
                                        route("/admin");
                                    } else {
                                        route("/");
                                    }
                                    route("/");
                                } else {
                                    alert(
                                        "Nama pengguna atau kata sandi salah."
                                    );
                                }
                            }}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        `;
    }
}
