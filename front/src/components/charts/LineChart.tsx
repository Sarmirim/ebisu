import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts'
import Typography from '@material-ui/core/Typography'
import { Fragment } from 'react'
import { useTheme } from '@material-ui/core/styles'
// TODO: swap to D3 library?
// TODO: make it as singleton
import { useSelector } from 'react-redux'
// import { Title } from '../typography'

export default function RenderLineChart() {
    // const data = useSelector(state: any => state.dots?.array)
    const theme = useTheme()

    return (
        <Fragment>
            {/* <Title>Chart</Title> */}
            <ResponsiveContainer>
                <LineChart width={600} height={300} // data={data}
                    margin={{ top: 16, right: 16, bottom: 16, left: 16 }}
                >
                    <Line type="monotone" dataKey="price" stroke={theme.palette.primary.main} isAnimationActive={false} animationDuration={1000}
                        dot={{ fill: 'red', stroke: 'red', strokeWidth: 1, r: 3 }}
                    />
                    {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
                    <XAxis dataKey="XAxis" scale='auto' 
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}/>

                    <YAxis type="number" domain={[(dataMin: any) => (dataMin), (dataMax: any) => (dataMax)]}
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}/>
                    <Label
                        angle={270}
                        position="left"
                        style={{
                            textAnchor: 'middle',
                            fill: theme.palette.text.primary,
                            ...theme.typography.body1,
                        }}
                    >
                        blabla
                    </Label>    
                    <Tooltip />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </Fragment>
    )
}