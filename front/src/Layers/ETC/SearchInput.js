import { Input } from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const { Search } = Input

function SearchInput(props) {
    const dispatch = useDispatch()

    function onSearch(inputValue, event) {
        getRequest(inputValue).then((payload) => {
            dispatch({type: "coin/onSearch", payload: payload})
            dispatch({type: "dots/newData", payload: [{xAxis: new Date().toLocaleTimeString('ru-RU'), price: payload?.Price, name: payload?.Symbol}]})
            console.log(payload)
        })
    }

    const getRequest = (value) => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8765/api/trade?symbol=' + String(value).toUpperCase())
            .then(response =>{
                resolve(response.data)
            })
            .catch(error => console.log(error))
        })
    }

    return <>
        <Search
        placeholder="input coin pair"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        />
    </>
}

export default SearchInput