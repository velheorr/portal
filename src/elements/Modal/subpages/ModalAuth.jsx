import React, {useEffect, useState} from 'react';
import {Box, Button, IconButton, InputAdornment, Typography} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import axios from "axios";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../../../pages/login/verify";
import {useAuth} from "../../../hook/useAuth";
import {useNavigate} from "react-router-dom";
import {useModal} from "../../../hook/useModal";
import '../modal.scss'
import {GTextField} from "../../CustomMui/customMui";
import {useAuthUpdate} from "../../../hook/useAuthUpdate";

const ModalAuth = () => {
    const navigate = useNavigate();
    const {signIn} = useAuth()
    const {exitModal} = useModal()

    /*const [auth, setAuth] = useState(false)*/
    const {auth, setAuth} = useAuthUpdate()
    const [authMsg, setAuthMsg] = useState('')

    /*проверить что п-ль авторизован не более 1 дня*/
    const checkLogin = ()=>{
        const date = localStorage.getItem('login')
        const today = new Date();
        const currentDay = today.toISOString().slice(0,10);

        if(date !== currentDay){
            localStorage.setItem('auth', false)
        }
        return currentDay
    }

    useEffect(() => {
        checkLogin()
        const authed = JSON.parse(localStorage.getItem('auth'))
        if (authed) {
            setAuth(true);
            signIn('user', ()=> navigate('main', {replace: true}));
            exitModal()
        }
    }, [auth]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        setAuthMsg('Проверка данных')
        const loginDateCheck = checkLogin()
/*дописать ф-ю авторизаии через портал*/
        try {
            let sendData = {...data, from: 'iboard'}
            const response = await axios.post('https://backend.s3grdn.ru/api/login', sendData)
            setAuthMsg(response.data.message)
            if (response.status === 200) {
                setAuthMsg('')
                localStorage.setItem('auth', true);
                localStorage.setItem('name', response.data.name);
                setAuth(true)
                localStorage.setItem('login', loginDateCheck)
                /*signIn(response.data.name, )*/
            }
        } catch (e) {
            if (e.response.status === 401) {
                setAuthMsg(e.response.data.message)
            } else {
                setAuthMsg('Неверные данные, ошибка логина или пароля')
            }
            console.log(e)
        }
    }

    const [show, setShow] = useState(false)
    const showPass = () =>{
        setShow(!show)
    }

    return (
        <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{'& > :not(style)': {m: 1, width: '100'},}}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h5" gutterBottom className='modalAuthTitle'>Авторизация в панеле управления</Typography>
            <GTextField fullWidth id="login" label="E-mail" variant="standard" type='email' size='small'
                       {...register("login")}
                       error={errors.login && true}
                       helperText={
                           errors.login ? <span style={{color: 'red'}}>{errors.login.message}</span>
                               : <span style={{height: '20px'}}> </span>
                       }
            />
            <GTextField fullWidth id="password" label="Пароль" variant="standard" type={ show ? 'text' : 'password'}
                       size='small'
                       {...register("password")}
                       error={errors.password && true}
                       helperText={
                           errors.password
                               ? <span style={{color: 'red'}}>{errors.password.message}</span>
                               : <span style={{height: '40px'}}> </span>
                       }
                       InputProps={{
                           endAdornment:(<InputAdornment position="end" onClick={showPass}><IconButton sx={{padding: 0}}>
                               { show ?   <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                           </IconButton></InputAdornment>)
                       }}
            />
            <div >
                <Button  variant="contained" type='submit' size='small' color="success">Войти</Button>
                <span style={{float: 'right', color: "red"}}>{authMsg}</span>
            </div>
        </Box>
    );
};

export default ModalAuth;