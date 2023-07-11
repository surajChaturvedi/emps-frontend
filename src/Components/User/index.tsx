import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, MouseEvent } from 'react';
import { selectedDataType } from '../../Types';
import { format } from 'date-fns';
import { DayPicker, DateRange, SelectRangeEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { produce } from 'immer';
import { useLocation } from 'react-router-dom';
import Logout from '../Logout';

export default function User() {
    const location = useLocation();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weeks = ['1st', '2nd', '3rd', '4th', '5th'];
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [monthAnchorEl, setMonthAnchorEl] = useState<null | HTMLElement>(null);
    const monthOpen = Boolean(monthAnchorEl);
    const [weeklyAnchorEl, setWeeklyAnchorEl] = useState<null | HTMLElement>(null);
    const weeklyOpen = Boolean(weeklyAnchorEl);
    const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);
    const dateOpen = Boolean(dateAnchorEl);
    const [selectedData, setSelectedData] = useState<selectedDataType>({ week: undefined, month: undefined, date: { from: '', to: '' } });
    const [selectedRange, setSelectedRange] = useState<DateRange>();
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const monthHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setMonthAnchorEl(event.currentTarget);
    }
    const monthHandleSelect = (index: number) => {
        setSelectedData(produce((draft) => { draft.month = months[index] }))
        setMonthAnchorEl(null);
        setMonthAnchorEl(null);
    }
    const weeklyHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setWeeklyAnchorEl(event.currentTarget);
    }
    const weeklyHandleSelect = (index: number) => {
        setSelectedData(produce((draft) => { draft.week = weeks[index] }))
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
        if (range?.from) setSelectedData(produce((draft) => { draft.date.from = format(range.from as Date, 'y-MM-dd') }))
        else setSelectedData(produce((draft) => { draft.date.from = '' }))
        if (range?.to) setSelectedData(produce((draft) => { draft.date.to = format(range.to as Date, 'y-MM-dd') }))
        else setSelectedData(produce((draft) => { draft.date.to = '' }))
    };


    return (
        <div className={location.pathname === '/user' ? 'user_block' : ''}>
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant='outlined'
            >
                Show {location.pathname === '/user' ? "" : "Employee"} Details
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Button onClick={monthHandleClick}>Month</Button>
                <Button onClick={weeklyHandleClick}>Weekly</Button>
                <Button onClick={dateHandleClick}>Date Picker</Button>
            </Menu>
            {
                open ?
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
                    : <></>
            }
            {
                open ?
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
                    : <></>
            }
            {
                open ?
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
                    : <></>
            }
            <Logout />
        </div>
    )
}