function getRandomColor() {
    const colors = ["green", "red", "blue"];
    return colors[Math.floor(Math.random() * colors.length)];
}

const ColorDirective = {
    beforeMount(el) {
        el.style.color = getRandomColor();
    },
};

export default ColorDirective;