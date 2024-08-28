export default class utils {
    static formatTimeMusic(ms) {
        const minuteMs = 60 * 1000;
        const hourMs = 60 * minuteMs;

        const padZero = (num) => num.toString().padStart(2, '0');

        if (ms < minuteMs) {
            return `00:${padZero(Math.floor(ms / 1000))}`;
        } else if (ms < hourMs) {
            const minutes = Math.floor(ms / minuteMs);
            const seconds = Math.floor((ms % minuteMs) / 1000);
            return `${padZero(minutes)}:${padZero(seconds)}`;
        } else {
            const hours = Math.floor(ms / hourMs);
            const minutes = Math.floor((ms % hourMs) / minuteMs);
            return `${padZero(hours)}:${padZero(minutes)}`;
        }
    }

    static formatTimeBot(time) {
        const days = Math.floor(time / 86400);
        const hours = Math.floor(time / 3600) % 24;
        const minutes = Math.floor(time / 60) % 60;
        const seconds = Math.floor(time % 60);
        if (minutes == 0) {
            return `${seconds}s`;
        } else if (hours == 0) {
            return `${minutes}m ${seconds}s`;
        } else if (days == 0) {
            return `${hours}h ${minutes}m ${seconds}s`;
        } else {
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
    static formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    static parseTime(string) {
        const timeParts = string.split(':').reverse();
        if (timeParts.length > 3) return 0;
        let ms = 0;
        const seconds = Number(timeParts[0]);
        const minutes = Number(timeParts[1] || 0);
        const hours = Number(timeParts[2] || 0);
        if (isNaN(seconds) || isNaN(minutes) || isNaN(hours)) return 0;
        ms += hours * 60 * 60 * 1000;
        ms += minutes * 60 * 1000;
        ms += seconds * 1000;
        return ms;
    }

    static capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    static truncate(text, number) {
        return text.length > number ? text.slice(0, number) + '...' : text;
    }
}
