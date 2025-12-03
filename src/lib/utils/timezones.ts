export function getTimeForTZ(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    timeZone: timezone
  }).format(date);
}