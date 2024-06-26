class Automata {
    constructor(game) {
        Object.assign(this, { game });

        this.automata = [];
        this.height = 31;
        this.width = 178;

        this.tickCount = 0;
        this.ticks = 0;

        // Load empty grid for cells
        for (let i = 0; i < this.width * 2; i++) {
            this.automata.push([]);
            for (let j = 0; j < this.height; j++) {
                this.automata[i][j] = 0;
            }
        }

        this.loadTrianglePattern();
    };

    loadTrianglePattern() {
        // Define the triangle pattern
        const triangleHeight = Math.floor(this.height / 2);
        const triangleWidth = Math.floor(this.width / 2);
        const startX = Math.floor((this.width - triangleWidth) / 2);
        const startY = Math.floor((this.height - triangleHeight) / 2);

        // Load the triangle pattern into grid
        for (let i = 0; i < triangleHeight+20; i++) {
            for (let j = 0; j <= i; j++) {
                this.automata[startX + j][startY + i] = 1;
                this.automata[startX - j][startY + i] = 1;
            }
        }
    };

    countMyNeightCells(col, row) {
        let cell = 0;

        for (let i = 0; i <= 2; i++) {
            for (let j = 0; j <= 2; j++) {
                if (i !== 1 || j !== 1) {
                    const neighborCol = col + i - 1;
                    const neighborRow = row + j - 1;
                    if (neighborCol >= 0 && neighborCol < this.width && neighborRow >= 0 && neighborRow < this.height && this.automata[neighborCol][neighborRow]) {
                        cell++;
                    }
                }
            }
        }
        return cell;
    };

    update() {
        this.speed = parseInt(document.getElementById("slider").value, 10);
        this.tickCount++;
        if (this.tickCount >= this.speed && this.speed != 30) {

            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            let arr = [];
            for (let col = 0; col < this.width; col++) {
                arr.push([]);
                for (let row = 0; row < this.height; row++) {
                    arr[col].push(0);
                }
            }

            for (let col = 0; col < this.width; col++) {
                for (let row = 0; row < this.height; row++) {
                    // Cells condition live and die
                    if (this.automata[col][row] && (this.countMyNeightCells(col, row) === 2 || this.countMyNeightCells(col, row) === 3)) {
                        arr[col][row] = 1;
                    }
                    if (!this.automata[col][row] && this.countMyNeightCells(col, row) === 3) {
                        arr[col][row] = 1;
                    }
                    if (this.automata[col][row] && (this.countMyNeightCells(col, row) > 3 || this.countMyNeightCells(col, row) < 2)) {
                        arr[col][row] = 0;
                    }
                }
            }
            this.automata = [...arr];
            this.tickCount = 0;
            this.ticks++;
        }
    };

    draw(ctx) {
        let size = 20;
        let gap = 1;
        // Draw the image onto the canvas
        let image = document.getElementById('image');

        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.automata[col][row];
                if (cell) {
                    ctx.drawImage(image, gap + col * size, gap + row * size, size - 5 * gap, size - 5 * gap);
                }
            }
        }

    };
};
