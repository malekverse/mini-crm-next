export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const localNumber = cleaned.startsWith("216") ? cleaned.slice(3) : cleaned;
  const match = localNumber.match(/^(\d{2})(\d{3})(\d{3})$/);
  if (match) {
    return `+216 ${match[1]} ${match[2]} ${match[3]}`;
  }
  return phone;
}

