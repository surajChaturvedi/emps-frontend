import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weeks = ['1st', '2nd', '3rd', '4th', '5th'];
    const [monthAnchorEl, setMonthAnchorEl] = useState<null | HTMLElement>(null);
    const monthOpen = Boolean(monthAnchorEl);
    const [weeklyAnchorEl, setWeeklyAnchorEl] = useState<null | HTMLElement>(null);
    const weeklyOpen = Boolean(weeklyAnchorEl);
    const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);
    const dateOpen = Boolean(dateAnchorEl);
    const [selectedRange, setSelectedRange] = useState<DateRange>();
    const [showLogout, setShowLogout] = useState('logout');
    const monthHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setMonthAnchorEl(event.currentTarget);
    }
    const monthHandleSelect = (index: number) => {
        appContext?.setAppData(produce((draft) => { draft.selectedTime.month = months[index] }))
        appContext?.setAppData(produce((draft) => { draft.selectedTime.week = '' }))
        appContext?.setAppData(produce((draft) => { draft.selectedTime.date.from = ''; draft.selectedTime.date.to = '' }))
        setMonthAnchorEl(null);
    }
    const weeklyHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setWeeklyAnchorEl(event.currentTarget);
    }
    const weeklyHandleSelect = (index: number) => {
        appContext?.setAppData(produce((draft) => { draft.selectedTime.week = weeks[index] }))
        appContext?.setAppData(produce((draft) => { draft.selectedTime.month = '' }))
        appContext?.setAppData(produce((draft) => { draft.selectedTime.date.from = ''; draft.selectedTime.date.to = '' }))
        setWeeklyAnchorEl(null);
    }
    const dateHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setDateAnchorEl(event.currentTarget);
    }
    const dateHandleClose = () => {
        setDateAnchorEl(null);
    }
    const handleRangeSelect: SelectRangeEventHandler = (
        range: DateRange | undefined
    ) => {
        setSelectedRange(range);
        if (range?.from) appContext?.setAppData(produce((draft) => { draft.selectedTime.date.from = format(range.from as Date, 'dd-MM-y') }))
        if (range?.to) appContext?.setAppData(produce((draft) => { draft.selectedTime.date.to = format(range.to as Date, 'dd-MM-y') }))
        appContext?.setAppData(produce((draft) => { draft.selectedTime.month = '' }))
        appContext?.setAppData(produce((draft) => { draft.selectedTime.week = '' }))
    };

    useEffect(() => {
        if (!appContext?.appData.selectedTime.date.from && !appContext?.appData.selectedTime.date.to)
            setSelectedRange({ from: undefined, to: undefined })
    }, [appContext?.appData.selectedTime.date])
    useEffect(() => {
        if ((appContext?.appData.selectedTime.week?.length === 0 || appContext?.appData.selectedTime.week === undefined) && (appContext?.appData.selectedTime.month?.length === 0 || appContext?.appData.selectedTime.month === undefined) && (appContext?.appData.selectedTime.date.from?.length === 0 || appContext?.appData.selectedTime.date.from === undefined) && (appContext?.appData.selectedTime.date.to?.length === 0 || appContext?.appData.selectedTime.date.to === undefined) && (appContext?.appData.fileUpload_State.file === undefined)) {
            setShowLogout('logout')
        }
        else if (appContext?.appData.selectedTime.date.from || appContext?.appData.selectedTime.date.to || appContext?.appData.selectedTime.month || appContext?.appData.selectedTime.week) {
            setShowLogout('submitData')
        }
    }, [appContext?.appData])

    return (
        <>
            <div className={location.pathname === '/user' ? 'user_block' : ''}>
                <div className="animate">
                    <Button variant='outlined' sx={{ marginRight: 1 }} onClick={monthHandleClick}>Month</Button>
                    <Button variant='outlined' sx={{ marginRight: 1 }} onClick={weeklyHandleClick}>Weekly</Button>
                    <Button variant='outlined' sx={{ marginRight: 1 }} onClick={dateHandleClick}>Date Picker</Button>
                </div>
                <Menu
                    anchorEl={monthAnchorEl}
                    open={monthOpen}
                    onClose={monthHandleSelect}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        months.map((month, index) => (
                            <MenuItem key={month} onClick={() => monthHandleSelect(index)}>{month}</MenuItem>
                        ))
                    }
                </Menu>
                <Menu
                    anchorEl={weeklyAnchorEl}
                    open={weeklyOpen}
                    onClose={weeklyHandleSelect}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        weeks.map((week, index) => (
                            <MenuItem key={week} onClick={() => weeklyHandleSelect(index)}>{week}</MenuItem>
                        ))
                    }
                </Menu>
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