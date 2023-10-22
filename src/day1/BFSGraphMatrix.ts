export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);

    seen[source] = true;
    const queue = [source];

    do {
        const curr = queue.shift() as number;
        if (curr === needle) {
            break;
        }

        const adjs = graph[curr];
        for (let i = 0; i < adjs.length; i++) {
            if (adjs[i] === 0) {
                continue;
            }

            if (seen[i]) {
                continue;
            }

            seen[i] = true;
            prev[i] = curr;
            queue.push(i);
        }
        seen[curr] = true;
    } while (queue.length);

    let curr = needle;
    const out = [];

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }
    console.log({ seen, prev, out });

    if (out.length) {
        return [source].concat(out.reverse());
    }

    return null;
}
