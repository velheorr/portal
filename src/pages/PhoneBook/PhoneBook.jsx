import BlockShadow from "../../elements/BlockShadow";
import './phoneBook.scss'
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LanIcon from '@mui/icons-material/Lan';
import PhoneBookFilters from "./subpages/PhoneBookFilters";
import PhoneBookList from "./subpages/PhoneBookList";
import {useModal} from "../../hook/useModal";
import {useDispatch, useSelector} from "react-redux";
import {setPhoneBookList} from "./PhoneBookSlice";
import {useGetPhoneBook} from "../../hook/useGetPhoneBook";
import Skelet from "../../elements/Skelet";
import {useEffect} from "react";
import {resetDataForModal, setDataForModal} from "../../elements/Modal/ModalSlice";
import TableHead from "../../elements/Table/TableHead";
import Scroll from "../../elements/Scroll";


const PhoneBook = () => {
    const {data: phonebook, isLoading, isError} = useGetPhoneBook()
    const dispatch = useDispatch()
    const {setModal} = useModal()
    const phonebookList = useSelector(state => state.phonebook.phonebookList);

    const updateItem = (item = false) =>{
        dispatch(resetDataForModal())
        if (item._id) {
            dispatch(setDataForModal(item))
        }
         setModal('phoneBook')
    }

    useEffect(()=>{
        dispatch(setPhoneBookList(phonebook))
        // eslint-disable-next-line no-use-before-define
    },[phonebook])



    if (isLoading) {return <Skelet/>}
    if (isError) {return <h3>Нет подключения к серверу</h3>}
    if (!phonebook) {return <h3>Нет данных с сервера</h3>}

    return (
        <div>
            <PhoneBookFilters updateItem={updateItem}/>
            <BlockShadow >
                <TableHead>
                    <div style={{flexBasis: '25%'}} className='listIcon'><BadgeIcon/> <span> Ф.И.О.</span></div>
                    <div style={{flexBasis: '25%'}} className='listIcon'><HomeRepairServiceIcon/> <span> ДОЛЖНОСТЬ</span></div>
                    <div style={{flexBasis: '20%'}} className='listIcon'><LanIcon/> <span> ОТДЕЛ</span></div>
                    <div style={{flexBasis: '20%'}} className='listIcon'><LanIcon/> <span> ОРГАНИЗАЦИЯ</span></div>
                    <div style={{flexBasis: '10%'}} className='listIcon'><PhoneIcon/> <span> ТЕЛЕФОН</span></div>
                </TableHead>
            </BlockShadow>
            <Scroll>
                { phonebookList?.map((item) => <PhoneBookList key={item._id} item={item} updateItem={updateItem}/>)}
            </Scroll>
        </div>
    )
};

export default PhoneBook;

