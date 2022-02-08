export const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export function parseTime(timeString) {
    return timeString ? new Date(`1970-01-01T${timeString}`) : new Date();
}

export function formatTime(time) {
    return `${time.toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})} WIB`;
}