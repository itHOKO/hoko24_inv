export default function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    // Custom formatting options
    const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: '2-digit' };
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

    return `${date.toLocaleDateString(undefined, dateOptions)} ${date.toLocaleTimeString(undefined, timeOptions)}`;
  }

