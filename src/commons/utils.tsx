function formatDate(formatDate: Date) {
    const date = new Date(formatDate)
    return date.getFullYear() + '/' + (date.getMonth() +1) + '/' + date.getDate()
}

export {formatDate}