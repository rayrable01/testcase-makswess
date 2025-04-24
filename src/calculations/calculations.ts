const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

// z = (x - μ) / σ
// x — текущее значение (например, pv);
// μ — среднее значение по всему массиву;
// σ — стандартное отклонение по массиву.

const calculateData = (values: typeof data) => {
    // среднее арифметическое для pv and UV
    const meanPV =  values.reduce((acc, item) => acc + item.pv, 0) / data.length
    const meanUV = values.reduce((acc, item) => acc + item.uv, 0) / data.length

    // Стандартное отклонение σ
    const stdDevPV = Math.sqrt(
        values.reduce((acc, item) => acc + Math.pow(item.pv - meanPV, 2), 0) / (data.length - 1)
    );
    const stdDevUV = Math.sqrt(
        values.reduce((acc, item) => acc + Math.pow(item.uv - meanUV, 2), 0) / (data.length - 1)
    );
    
    return {
        pvStats: {
            meanPV,
            stdDevPV
        },
        uvStats: {
            meanUV,
            stdDevUV
        }
    }
}

const {pvStats, uvStats} = calculateData(data);

export const result = data.map((item) => {
    const zPV = (item.pv - pvStats.meanPV) / pvStats.stdDevPV; 
    const zUV = (item.uv - uvStats.meanUV) / uvStats.stdDevUV;

    return {
        ...item,
        zScorePV: zPV,
        zScoreUV: zUV,
        PVpostitve: zPV > 1,
        UVpostitve: zUV > 1
    }
})

export const onlyPositiveArray = result.filter((item) => item.PVpostitve || item.UVpostitve)
