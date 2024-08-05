const randomColor = () => {
    // Generate random RGB values
    const r = Math.floor(Math.random() * 256); // Red component
    const g = Math.floor(Math.random() * 256); // Green component
    const b = Math.floor(Math.random() * 256); // Blue component

    // Convert RGB to hexadecimal color
    const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    return color;
};

export default randomColor