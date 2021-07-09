import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
// TODO: swap to D3 library?
// TODO: make it as singleton
import { useSelector } from 'react-redux'

function RenderLineChart(props) {
    const arr = useSelector(state => state.dots?.array)

    return <div style={{ margin: 50}}>
        <LineChart width={600} height={300} data={arr}>
            <Line type="monotone" dataKey="price" stroke="#8884d8" isAnimationActive={false} animationDuration={1000}
                dot={{ fill: 'red', stroke: 'red', strokeWidth: 1, r: 3 }}
            />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="xAxis" scale='auto' />
            <YAxis type="number" domain={[dataMin => (dataMin), dataMax => (dataMax)]}/>
            <Tooltip />
            <Legend />
        </LineChart>
    </div>}

export default RenderLineChart