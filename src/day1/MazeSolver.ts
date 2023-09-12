const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function walk(
    maze: string[],
    wall: string,
    currentPoint: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    if (
        currentPoint.x < 0 ||
        currentPoint.x >= maze[0].length ||
        currentPoint.y < 0 ||
        currentPoint.y >= maze.length
    ) {
        return false;
    }

    if (maze[currentPoint.y][currentPoint.x] === wall) {
        return false;
    }

    if (currentPoint.x === end.x && currentPoint.y === end.y) {
        path.push(end);
        return true;
    }

    if (seen[currentPoint.y][currentPoint.x]) {
        return false;
    }

    seen[currentPoint.y][currentPoint.x] = true;
    path.push(currentPoint);

    for (let i = 0; i < dir.length; i++) {
        const [x, y] = dir[i];

        if (
            walk(
                maze,
                wall,
                {
                    x: currentPoint.x + x,
                    y: currentPoint.y + y,
                },
                end,
                seen,
                path,
            )
        ) {
            return true;
        }
    }

    path.pop();
    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
