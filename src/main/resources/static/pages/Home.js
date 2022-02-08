import {useContext, useEffect, useState} from "../modules/hooks.js";
import {html} from "../modules/standalone.js";
import {dayNames, formatTime, parseTime} from "../utils/date.js";
import {AuthContext} from "../App.js";

export default function Home() {
    const { token, account } = useContext(AuthContext);
    const [courseSchedules, setCourseSchedules] = useState([]);

    useEffect(async () => {
        const response = await fetch("/api/course_schedules/i_teach", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setCourseSchedules(await response.json());
    }, []);

    if (account) {

    }
    return html`
        <div>
            <h2>Pelatihan yang akan datang</h2>
            ${(() => {
                const today = new Date();
                let upcomingCourseDate = new Date();
                upcomingCourseDate.setDate(today.getDate() + 7);
                let upcomingCourse;

                courseSchedules.forEach((courseSchedule) => {
                    const thisWeekFirstDay = new Date();
                    thisWeekFirstDay.setDate(today.getDate() - today.getDay());
                    const courseDate = new Date();
                    courseDate.setDate(thisWeekFirstDay.getDate() + courseSchedule.day);
                    const courseTime = parseTime(courseSchedule?.time);
                    courseDate.setHours(courseTime.getHours());
                    courseDate.setMinutes(courseTime.getMinutes());
                    courseDate.setSeconds(0);
                    if (courseDate < today) {
                        courseDate.setDate(courseDate.getDate() + 7);
                    }
                    
                    if (courseDate < upcomingCourseDate) {
                        upcomingCourse = courseSchedule;
                        upcomingCourseDate = courseDate;
                    }
                });

                return html`
                    <h1>${upcomingCourse?.course.name} (Kelompok ${upcomingCourse?.courseGroup.name || upcomingCourse?.courseGroup.number})</h1>
                    <h2>${dayNames[upcomingCourse?.day]} pukul ${formatTime(upcomingCourseDate)}</h2>
                    <h3>Instruktur: ${upcomingCourse?.instructor.name}</h3>
                `;
            })()}
        </div>
        <div>
            <h2>Pelatihan yang Anda ajar</h2>
            <table>
                <thead>
                <tr>
                    <th>Pelatihan</th>
                    <th>Kelompok</th>
                    <th>Hari</th>
                    <th>Waktu mulai</th>
                    <th>Waktu selesai</th>
                    <th>Ruang</th>
                </tr>
                </thead>
                <tbody>
                ${courseSchedules.map((courseSchedule) => html`
                    <tr>
                        <td>${courseSchedule.course.name}</td>
                        <td>${courseSchedule.courseGroup.name || courseSchedule.courseGroup.number}</td>
                        <td>${dayNames[courseSchedule.day]}</td>
                        <td>${formatTime(parseTime(courseSchedule.time))}</td>
                        <td>${(() => {
                            const startTime = parseTime(courseSchedule.time);
                            const endTime = new Date(startTime);
                            endTime.setHours(startTime.getHours() + courseSchedule.course.duration);
                            return formatTime(endTime);
                        })()}
                        </td>
                        <td>${courseSchedule.room.name}</td>
                    </tr>
                `)}
                </tbody>
            </table>
        </div>
    `;
}
