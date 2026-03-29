export function getTimeForTZ(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    timeZone: timezone
  }).format(date);
}

export function getUTCOffset(date: Date, timezone: string): string {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'shortOffset'
    }).formatToParts(date);
    const offset = parts.find((p) => p.type === 'timeZoneName')?.value;
    return offset ? offset.replace('GMT', 'UTC') : 'UTC';
  } catch (e) {
    return 'UTC';
  }
}