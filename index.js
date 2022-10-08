import Color from "https://colorjs.io/dist/color.js";


const SIZE = 500;

const CIRCLE_X = SIZE / 2;
const CIRCLE_Y = SIZE / 2;
const CIRCLE_DEGREE = 360;

const CIRCLE_R = (SIZE / 2) * 0.99;


const getColor = (i) => {
    let c1 = new Color("rebeccapurple");
    let c2 = new Color("lch", [85, 85, 85 + 720]);
    const c3 = c1.range(c2, {space: "lch", hue: "raw"})(i);
    const c4 = c3.to("sRGB");
    return c4.toString();
}

window.onload = () => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(CIRCLE_X, CIRCLE_Y, CIRCLE_R, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();


    let points = parseFloat(document.getElementById("points").value);
    let multiple = parseFloat(document.getElementById("multiple").value);

    document.getElementById('points').onchange = () => {
        points = parseFloat(document.getElementById("points").value);
        render();
    };

    document.getElementById('multiple').onchange = () => {
        multiple = parseFloat(document.getElementById("multiple").value);
        render();
    };

    const toRadians = (degree) => {
        return degree * Math.PI / 180;
    };

    const render = () => {
        ctx.clearRect(0, 0, SIZE, SIZE);

        const step = CIRCLE_DEGREE / points;

        for(let i = 0; i < CIRCLE_DEGREE; i += step) {
            const x = CIRCLE_R * Math.cos(toRadians(i)) + CIRCLE_X;
            const y = CIRCLE_R * Math.sin(toRadians(i)) + CIRCLE_Y;

            ctx.beginPath();
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }

        const lines = [];

        for(let i = 0; i <= points; i++) {
            let res = (multiple * i) % points;

            const x1 = CIRCLE_R * Math.cos(toRadians(step * i)) + CIRCLE_X;
            const y1 = CIRCLE_R * Math.sin(toRadians(step * i)) + CIRCLE_Y;
            const x2 = CIRCLE_R * Math.cos(toRadians(res * step)) + CIRCLE_X;
            const y2 = CIRCLE_R * Math.sin(toRadians(res * step)) + CIRCLE_Y;

            lines.push({
                x1,
                x2,
                y1,
                y2,
                length: Math.hypot(x2 - x1, y2 - y1)
            })
        }

        const linesSortedByLength = lines.sort((a, b) => b.length - a.length)

        for(let i = 0; i < linesSortedByLength.length; i++) {
            const {x1, x2, y1, y2, length} = linesSortedByLength[i];

            const colorI = 1 - length / (CIRCLE_R * 2);
            const color = getColor(colorI)


            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.strokeStyle = color;
            ctx.closePath();}
    };

    render();
};
