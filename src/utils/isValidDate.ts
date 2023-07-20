const isValidDate = (value: any) => {
  return String(new Date(value)) !== 'Invalid Date'
}

export default isValidDate
