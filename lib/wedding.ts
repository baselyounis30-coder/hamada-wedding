export const WEDDING = {
  groom: "Mohamed",
  bride: "Nehal",
  // 6:30 PM local time on the wedding day (month is zero-based).
  date: new Date(2026, 10, 6, 18, 30),
  weekday: "Friday",
  dateLabel: "November 6, 2026",
  timeLabel: "6:30 PM",
  hall: "Palace Hall",
  venue: "Jewel Sports City Hotel",
} as const;

const title = `${WEDDING.groom} & ${WEDDING.bride}'s Wedding`;
const location = `${WEDDING.hall}, ${WEDDING.venue}`;

// Calendar entries need an end time; the invitation doesn't give one, so the
// event is blocked out for four hours. Times carry no zone on purpose, so each
// calendar reads them as 6:30 PM in its own time zone.
const CALENDAR_START = "20261106T183000";
const CALENDAR_END = "20261106T223000";

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  WEDDING.venue,
)}`;

export const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(title)}` +
  `&dates=${CALENDAR_START}/${CALENDAR_END}` +
  `&location=${encodeURIComponent(location)}`;

const ics = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Mohamed and Nehal//Wedding//EN",
  "BEGIN:VEVENT",
  "UID:mohamed-nehal-wedding-20261106",
  "DTSTAMP:20261001T000000Z",
  `DTSTART:${CALENDAR_START}`,
  `DTEND:${CALENDAR_END}`,
  `SUMMARY:${title}`,
  `LOCATION:${location.replace(/,/g, "\\,")}`,
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

export const ICS_URL = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
