export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-$$$$]{8,}$/
  return phoneRegex.test(phone)
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0
}
