import { Card } from 'antd'
import { useSelector } from 'react-redux'

const { Meta } = Card

function CoinCard(props) {
    const Symbol = useSelector(state => state.coin?.Symbol)
    const Price = useSelector(state => state.coin?.Price)

    return <Card style={{ width: "min-content" }}>
            <Meta
            title={Symbol || "Default Name"}
            description={Price || "undefined"}
            />
        </Card>
}

export default CoinCard