import { Input } from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import { Fragment } from 'react'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import { useEffect, useState } from 'react'

const { Search } = Input

function SearchInput(props) {
    const dispatch = useDispatch()

    function onSearch(inputValue, event) {
        getRequest(inputValue).then(
            payload => {
                payload.Price = parseFloat(payload.Price)
                if (payload.Symbol === "") {
                    handleClick("Nothing found, try btcusdt or dogeusdt")
                } else {
                    dispatch({type: "coin/onSearch", payload: payload})
                    dispatch({type: "dots/newData", payload: [{XAxis: new Date().toLocaleTimeString('ru-RU'), price: payload?.Price, name: payload?.Symbol}]})
                    console.log(payload)
                }
            },
            error => {
                console.log(error)
                handleClick(error)
            }
        )
    }

    const getRequest = (value) => {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8765/api/trade?symbol=' + String(value).toUpperCase())
            .then(response =>{
                resolve(response.data)
            })
            .catch(error => {
                let message = 'error'
                if (error.response) {
                    const [data, status, headers] = [error.response]
                    message = data + status + headers
                } else if (error.request) {
                    message = "Problem with request"
                } else {
                    message = error.message ? error.message : "something went wrong"
                }
                reject(message)
                console.log(error.config)
            })
        })
    }

    const [snackPack, setSnackPack] = useState([])
    const [open, setOpen] = useState(false)
    const [messageInfo, setMessageInfo] = useState(undefined)
  
    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] })
            setSnackPack((prev) => prev.slice(1))
            setOpen(true)
        } else if (snackPack.length && messageInfo && open) {
            // Close an active snack when a new one is added
            setOpen(false)
        }
    }, [snackPack, messageInfo, open])
  
    const handleClick = (message) => {
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }])
    }
  
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
  
    const handleExited = () => {
        setMessageInfo(undefined)
    }

    return <>
        <Search
            placeholder="input coin pair"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
        />
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            TransitionProps={{ onExited: handleExited }}
            message={messageInfo ? messageInfo.message : undefined}
            action={
            <Fragment>
                <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
                </Button>
                <IconButton
                aria-label="close"
                color="inherit"
                sx={{ p: 0.5 }}
                onClick={handleClose}
                >
                <CloseIcon />
                </IconButton>
            </Fragment>
            }
        />

    </>
}

export default SearchInput