// import { Layout } from 'antd'
import { Typography, Link} from '@material-ui/core'
// const { Footer } = Layout

// function MyFooter()  {
//     return(<Footer style={{ textAlign: 'center', backgroundColor: '#ffffff'}}>EBISU FOOTER</Footer>)
// }

function MyFooter(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github./com/sarmirim/ebisu">
          EBISU
        </Link>
        {/* {' '}
        {new Date().getFullYear()}
        {'.'} */}
      </Typography>
    );
  }


export default MyFooter