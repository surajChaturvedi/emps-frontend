import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState, MouseEvent, useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { DayPicker, DateRange, SelectRangeEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { produce } from 'immer';
import { useLocation } from 'react-router-dom';
import Logout from '../Logout';
import { AppContext } from '../../App';
import Date_Details from './Date_Details';
import Submit from '../Submit';
import Display_Table from './Display_Table';

export default function User() {
    const appContext = useContext(AppContext);
    const location = useLocation();
    const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);
    const dateOpen = Boolean(dateAnchorEl);
    const [selectedRange, setSelectedRange] = useState<DateRange>();
    const [showLogout, setShowLogout] = useState('logout');
    function dateHandleClick(event: MouseEvent<HTMLButtonElement>) {
        setDateAnchorEl(event.currentTarget);
    }
    function dateHandleClose() {
        setDateAnchorEl(null);
    }
    const handleRangeSelect: SelectRangeEventHandler = (
        range: DateRange | undefined
    ) => {
        setSelectedRange(range);
        if (range?.from) appContext?.setAppData(produce((draft) => { draft.selectedTime.date.from = format(range.from as Date, 'y-MM-dd') }))
        if (range?.to) appContext?.setAppData(produce((draft) => { draft.selectedTime.date.to = format(range.to as Date, 'y-MM-dd') }))
    };

    useEffect(() => {
        if (!appContext?.appData.selectedTime.date.from && !appContext?.appData.selectedTime.date.to)
            setSelectedRange({ from: undefined, to: undefined })
    }, [appContext?.appData.selectedTime.date])
    useEffect(() => {
        if ((appContext?.appData.selectedTime.date.from?.length === 0 || appContext?.appData.selectedTime.date.from === undefined) && (appContext?.appData.selectedTime.date.to?.length === 0 || appContext?.appData.selectedTime.date.to === undefined) && (appContext?.appData.fileUpload_State.file === undefined)) {
            setShowLogout('logout')
        }
        else if (appContext?.appData.selectedTime.date.from || appContext?.appData.selectedTime.date.to) {
            setShowLogout('submitData')
        }
    }, [appContext?.appData])

    return (
        <>
            <div className={location.pathname === '/user' ? 'user_block' : ''}>
                <div className="animate"> 
                    <Button variant='outlined' sx={{ marginRight: 1 }} onClick={dateHandleClick}>Date Picker</Button>
                </div>
                <Menu
                    anchorEl={dateAnchorEl}
                    open={dateOpen}
                    onClose={dateHandleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <DayPicker
                        mode="range"
                        selected={selectedRange}
                        onSelect={handleRangeSelect}
                    />
                </Menu>
                {location.pathname === '/user' ?
                    <div className="animate">
                        {showLogout === 'logout' ? <Logout /> : <></>}
                        {showLogout === 'submitData' ? <Submit /> : <></>}
                    </div>
                    : <></>}
            </div>
            {location.pathname === '/user' ? <Date_Details /> : <></>}
            {location.pathname === '/user' ? <Display_Table /> : <></>}
        </>
    )
}