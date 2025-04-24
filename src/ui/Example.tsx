import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { result } from '../calculations/calculations';

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

    // Определим типы для данных
type Item = {
    name: string;
    uv: number;
    pv: number;
    amt: number;
    zScorePV: number;
    zScoreUV: number;
    PVpostitve: boolean;
    UVpostitve: boolean;
};

// Функция для разделения данных по флагам PV и UV
const splitDataAtPositive = (dataValue: Item[]) => {
    let firstPartPV: Item[] = [];
    let secondPartPV: Item[] = [];
    let firstPartUV: Item[] = [];
    let secondPartUV: Item[] = [];

    for (let i = 0; i < dataValue.length; i++) {
        if (dataValue[i].PVpostitve && firstPartPV.length === 0) {
            firstPartPV = dataValue.slice(0, i);
            secondPartPV = dataValue.slice(i);
        }

        if (dataValue[i].UVpostitve && firstPartUV.length === 0) {
            firstPartUV = dataValue.slice(0, i);
            secondPartUV = dataValue.slice(i);
        }
    }

    return {
        PV: { firstPartPV, secondPartPV },
        UV: { firstPartUV, secondPartUV }
    };
};


    export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

    render() {
        const {PV, UV} = splitDataAtPositive(result)

        return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            width={500}
            height={300}
            data={result}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" fill='' activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="red" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
        );
    }
}
