const CIRCLE_X = 500;
const CIRCLE_Y = 500;
const CIRCLE_R = 450;

const CIRCLE_DEGREE = 360;

window.onload = () => {
    const svgElement = document.getElementById("svg");

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

        while (svgElement.firstChild) {
            svgElement.removeChild(svgElement.firstChild);
        }

        const step = CIRCLE_DEGREE / points;

        const circleElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        circleElement.setAttribute("cx", CIRCLE_X);
        circleElement.setAttribute("cy", CIRCLE_Y);
        circleElement.setAttribute("r", CIRCLE_R);
        circleElement.setAttribute("stroke", "black");
        circleElement.setAttribute("fill", "transparent");
        circleElement.setAttribute("stroke-width", "5");
        svgElement.appendChild(circleElement);

        for(let i = 0; i < CIRCLE_DEGREE; i += step) {
            const x = CIRCLE_R * Math.cos(toRadians(i)) + CIRCLE_X;
            const y = CIRCLE_R * Math.sin(toRadians(i)) + CIRCLE_Y;

            const pointElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            pointElement.setAttribute("cx", x);
            pointElement.setAttribute("cy", y);
            pointElement.setAttribute("r", "5");
            pointElement.setAttribute("fill", "red");
            svgElement.appendChild(pointElement);
        }

        for(let i = 0; i <= points; i++) {
            let res = multiple * i;

            const x1 = CIRCLE_R * Math.cos(toRadians(step * i)) + CIRCLE_X;
            const y1 = CIRCLE_R * Math.sin(toRadians(step * i)) + CIRCLE_Y;
            const x2 = CIRCLE_R * Math.cos(toRadians(res * step)) + CIRCLE_X;
            const y2 = CIRCLE_R * Math.sin(toRadians(res * step)) + CIRCLE_Y;

            const lineElement = document.createElementNS("http://www.w3.org/2000/svg", 'line');
            lineElement.setAttribute("x1", x1);
            lineElement.setAttribute("y1", y1);
            lineElement.setAttribute("x2", x2);
            lineElement.setAttribute("y2", y2);
            lineElement.setAttribute("stroke", "red");
            lineElement.setAttribute("stroke-width", "2");
            svgElement.appendChild(lineElement)
        }
    };

    render();
};