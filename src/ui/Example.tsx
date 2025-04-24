import { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { result } from '../calculations/calculations';


export default class Example extends PureComponent {
    static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

    render() {
        const totalPoints = result.length - 1;
        const changeIndexPV = result.findIndex((item) => item.PVpostitve);
        const offsetPV = changeIndexPV !== -1 ? (changeIndexPV / totalPoints) * 100 : 0;

        const changeIndexUV = result.findIndex((item) => item.UVpostitve);
        const offsetUV = changeIndexUV !== -1 ? (changeIndexUV / totalPoints) * 100 : 0;

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
            <Legend />
            <defs>
                <linearGradient id="pvGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#008000" />
                <stop offset={`${offsetPV}%`} stopColor="#008000" />
                <stop offset={`${offsetPV}%`} stopColor="#ff0000" />
                <stop offset="100%" stopColor="#ff0000" />
                </linearGradient>
                <linearGradient id="uvGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0000ff" />
                <stop offset={`${offsetUV}%`} stopColor="#0000ff" />
                <stop offset={`${offsetUV}%`} stopColor="#ffa500" />
                <stop offset="100%" stopColor="#ffa500" />
                </linearGradient>
            </defs>
            <Line
                type="monotone"
                dataKey="pv"
                stroke="url(#pvGradient)"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                dot={({ cx, cy, index }) => {
                const item = result[index];
                const offset = (index / totalPoints) * 100;
                const color = offset <= offsetPV ? "#008000" : "#ff0000";
                return <circle cx={cx} cy={cy} r={6} fill={color} />;
                }}
            />
            <Line
                type="monotone"
                dataKey="uv"
                stroke="url(#uvGradient)"
                strokeWidth={3}
                activeDot={{ r: 8 }}
                dot={({ cx, cy, index }) => {
                    const item = result[index];
                    const offset = (index / totalPoints) * 100;
                    const color = offset <= offsetUV ? "#0000ff" : "#ffa500";
                    return <circle cx={cx} cy={cy} r={6} fill={color} />;
                }}
                />
        </LineChart>
    </ResponsiveContainer>
    );
}
}
