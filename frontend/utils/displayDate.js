const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

export function displayDate(date){
    const new_date = new Date(date)
    return months[new_date.getMonth()]+" "+new_date.getDate()+", "+new_date.getFullYear()+" "+new_date.getHours()+":"+new_date.getMinutes()
}
