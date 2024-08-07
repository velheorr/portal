import './versionLog.scss'
import Scroll from "../../elements/Scroll";
import VersionItem from "./subpages/VersionItem";

const VersionLog = () => {
    const data = [
        {
            date: '08.08.2024',
            ver: '1.0.0',
            list: [
                {
                    name: 'Версии',
                    li: ['Добавлена страница с иторией версий и изменений в приложении']
                },
                {
                    name: 'Ресурсы',
                    li: ['Добавлены вкладки для разделения информации','Добавлен раздел с информацией по группам рассылок']
                },
                {
                    name: 'Учет [администрирование]',
                    li: ['Добавлена страница учета лицензий']
                },
            ]
        }
    ]

    return (
        <div className='versionPage'>
            <Scroll>
                {data.map((i, index) => {
                    return (<VersionItem data={i} key={index} />)
                        }
                    )
                }
            </Scroll>
        </div>
    )
};

export default VersionLog;

