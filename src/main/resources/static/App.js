import { html } from "./modules/standalone.js";
import { Suspense, lazy } from "/modules/compat.js";
import Router from "./modules/preact-router.js";
import { Link } from "./modules/match.js";
import { createContext } from "./modules/preact.js";
import { useEffect, useState } from "./modules/hooks.js";

export const AuthContext = createContext();

const Home = lazy(() => import("./pages/Home.js"));
const CourseSchedules = lazy(() => import("./pages/CourseSchedules.js"));
const Courses = lazy(() => import("./pages/Courses.js"));
const CourseGroups = lazy(() => import("./pages/CourseGroups.js"));
const Accounts = lazy(() => import("./pages/Accounts.js"));
const Rooms = lazy(() => import("./pages/Rooms.js"));
const About = lazy(() => import("./pages/About.js"));
const Login = lazy(() => import("./pages/Login.js"));

export default function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [account, setAccount] = useState(null);

    useEffect(async () => {
        if (token) {
            const response = await fetch("/api/auth/account", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const account = await response.json();
                setAccount(account);
            }
        } else {
            setAccount(null);
        }
    }, [token]);

    return html`
        <${AuthContext.Provider} value=${{ account, setAccount, token, setToken }}>
            <header>
                <${Link} id="logo" className="button" href="/"
                    >Divdik PUB<//
                >
                <nav>
                    <${Link}
                        className="button"
                        activeClassName="active"
                        href="/"
                        >Beranda<//
                    >
                    <${Link}
                        className="button"
                        activeClassName="active"
                        href="/schedules"
                        >Jadwal<//
                    >
                    <${Link}
                            className="button"
                            activeClassName="active"
                            href="/courses"
                    >Pelatihan<//
                    >
                    <${Link}
                            className="button"
                            activeClassName="active"
                            href="/groups"
                    >Kelompok<//
                    >
                    <${Link}
                            className="button"
                            activeClassName="active"
                            href="/accounts"
                    >Akun<//
                    >
                    <${Link}
                            className="button"
                            activeClassName="active"
                            href="/rooms"
                    >Ruang<//
                    >
                    <${Link}
                        className="button"
                        activeClassName="active"
                        href="/about"
                        >Tentang<//
                    >
                </nav>
                <span>
                    ${account
                        ? html` <span>${account.name}</span>
                              <button
                                  className="button-outlined"
                                  onClick=${async () => {
                                      const response = await fetch(
                                          "/api/auth/logout",
                                          {
                                              method: "POST",
                                              headers: {
                                                  Authorization: `Bearer ${token}`,
                                              },
                                          }
                                      );
                                      if (response.ok) {
                                          localStorage.removeItem("token");
                                          setToken(null);
                                      }
                                  }}
                              >
                                  Logout
                              </button>`
                        : html`
                              <${Link}
                                  className="button button-outlined"
                                  href="/login"
                                  >Login<//
                              >
                          `}
                </span>
            </header>
            <main>
                <${Suspense} fallback=${html`<div>Loading...</div>`}>
                    <${Router}>
                        ${account ? html`
                            <${Home} path="/" />
                        ` : html`
                            <div path="/">
                                <img src="images/divisi-pendidikan-logo-128px.svg" height="256"/>
                                <h1>Selamat datang di sistem informasi Divisi Pendidikan PUB</h1>
                                <h3>Anda harus login terlebih dahulu untuk mengakses informasi atau mengelola data.</h3>
                                <${Link}
                                        className="button button-outlined"
                                        href="/login"
                                        style=${{alignSelf: "center", width: 128}}
                                >Login<//>
                            </div>
                        `}
                        <${CourseSchedules} path="/schedules" />
                        <${Courses} path="/courses" />
                        <${CourseGroups} path="/groups" />
                        <${Accounts} path="/accounts" />
                        <${Rooms} path="/rooms" />
                        <${About} path="/about" />
                        <${Login} path="/login" />
                        <div default>Halaman tidak ditemukan.</div>
                    <//>
                <//>
            </main>
            <footer>© 2022 Romi Kusuma Bakti</footer>
        <//>
    `;
}
