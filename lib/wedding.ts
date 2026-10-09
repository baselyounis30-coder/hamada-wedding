export const WEDDING = {
  groom: "Mohamed",
  bride: "Nehal",
  // Local midnight on the wedding day (month is zero-based).
  date: new Date(2026, 10, 6),
  weekday: "Friday",
  dateLabel: "November 6, 2026",
  hall: "Palace Hall",
  venue: "Jewel Sports City Hotel",
} as const;

const title = `${WEDDING.groom} & ${WEDDING.bride}'s Wedding`;
const location = `${WEDDING.hall}, ${WEDDING.venue}`;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  WEDDING.venue,
)}`;

export const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(title)}` +
  "&dates=20261106/20261107" +
  `&location=${encodeURIComponent(location)}`;

const ics = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Mohamed and Nehal//Wedding//EN",
  "BEGIN:VEVENT",
  "UID:mohamed-nehal-wedding-20261106",
  "DTSTAMP:20261001T000000Z",
  "DTSTART;VALUE=DATE:20261106",
  "DTEND;VALUE=DATE:20261107",
  `SUMMARY:${title}`,
  `LOCATION:${location.replace(/,/g, "\\,")}`,
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

export const ICS_URL = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
