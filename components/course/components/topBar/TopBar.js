
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TemporaryDrawer from '../sidebar/SideBar';

function TopBar(props){
    return(
        <div className='top-bar'>
            <TemporaryDrawer/>
            <h3 className='heading'>{props.heading}</h3>
            <AccountCircleIcon  className='avatar'></AccountCircleIcon>

        </div>
    )
}

export default TopBar;