import '../phoneBook.scss';
import {ButtonGroup, IconButton, InputAdornment, Tooltip, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {GTextField} from "../../../elements/CustomMui/customMui";
import {useState} from "react";
import Button from "@mui/material/Button";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useDispatch} from "react-redux";
import {setPhoneBookList} from "../PhoneBookSlice";
import {useGetPhoneBook} from "../../../hook/useGetPhoneBook";
import {useTheme} from "../../../hook/useTheme";
import {useAuth} from "../../../hook/useAuth";
import {searchInArray} from "../../../utils/searchInArray";


const PhoneBookFilters = ({updateItem}) => {
    const dispatch = useDispatch()
    const {data: phonebook} = useGetPhoneBook()
    const {user} = useAuth()
    /*Поиск*/
    const [search, setSearch] = useState('')
    /*Очистка поля поиска*/
    const resetSearch = ()=> {
        setSearch('')
        dispatch(setPhoneBookList(phonebook))
    }
    /*Обновление поля поиска*/
    const handleSearch = (e) =>{
        e.preventDefault()
        setSearch(e.target.value)
    }
    /*ф-я поиска*/
    const handleKeyDown = (e)=>{
        if (e.key === 'Backspace' || e.key === 'Delete'){
            dispatch(setPhoneBookList(phonebook))
        }
        if (e.key === 'Enter' && search.length > 2) {
            const keysToSearch = ["name", "phone", 'dep', 'position', 'org'];
            const searchedData = searchInArray(phonebook, search, keysToSearch);
            dispatch(setPhoneBookList(searchedData))
        }
    }


    return (
        <div className='filters'>

            <ButtonGroup variant="outlined" size='small' sx={{verticalAlign: 'bottom'}}>
                {
                    user && <Tooltip title={<Typography variant="body2"  gutterBottom>Добавить номер пользователя</Typography>}>
                        <Button onClick={updateItem} color={'success'}><PersonAddIcon/> Добавить</Button>
                    </Tooltip>
                }
            </ButtonGroup>
            <div className='searchFilter'>
                <GTextField id="realiz_search" sx={{pt: '15px', width: '300px', pr: '15px', color: useTheme('text')}}  variant="standard" placeholder='Поиск' value={search}
                            onKeyDown={handleKeyDown}  onChange={handleSearch} InputProps={{
                    startAdornment: (<InputAdornment position="start"><SearchIcon sx={{color: useTheme('text')}} /></InputAdornment>),
                    endAdornment:(<InputAdornment position="end"><IconButton onClick={resetSearch}><CloseIcon sx={{color: useTheme('text')}} /></IconButton ></InputAdornment>)
                }}/>
            </div>
        </div>
    );
};

export default PhoneBookFilters;