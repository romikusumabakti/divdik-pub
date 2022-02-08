import { html } from "../modules/standalone.js";

export default function Home() {

    return html`
        <div>
            <h1>Tentang</h1>
            <p>
                Ini adalah sistem informasi Divisi Pendidikan PUB.
                Dikembangkan secara fullstack oleh Romi Kusuma Bakti
                menggunakan back-end Spring Boot dan front-end React.
                Dihubungkan menggunakan REST API.
                UI dibuat 100% menggunakan CSS murni, tanpa library apapun.
            </p>
        </div>
    `;
}
