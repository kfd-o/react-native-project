const hideName = (name) => {

    if (name.length === 1) {
        return name;
    } else if (name.length === 2) {
        return `${name[0]}*`
    } else if (name.length === 3) {
        return `${name.slice(0, 2)}*`
    } else {
        return `${name.slice(0, 2)}${'*'.repeat(name.length - 3)}${name.slice(-1)}`
    }




}


export default hideName