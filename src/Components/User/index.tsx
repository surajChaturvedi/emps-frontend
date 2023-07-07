import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, MouseEvent } from 'react';

export default function User() {
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
    const [startDate, setStartDate] = useState<string | Date>(new Date());
    const [endDate, setEndDate] = useState<string | null>(null);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const monthHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setMonthAnchorEl(event.currentTarget);
    }
    const monthHandleClose = () => {
        setMonthAnchorEl(null);
    }
    const weeklyHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setWeeklyAnchorEl(event.currentTarget);
    }
    const weeklyHandleClose = () => {
        setWeeklyAnchorEl(null);
    }
    const dateHandleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setDateAnchorEl(event.currentTarget);
    }
    const dateHandleClose = () => {
        setDateAnchorEl(null);
    }
    const onDateChange = (dates: Array<string>) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    return (
        <div>
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant='outlined'
            >
                Show Employee Details
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
                        onClose={monthHandleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            months.map(month => (
                                <MenuItem onClick={monthHandleClose}>{month}</MenuItem>
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
                        onClose={weeklyHandleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            weeks.map(week => (
                                <MenuItem onClick={weeklyHandleClose}>{week}</MenuItem>
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
                        <input title='from' type='date' />
                        <input title='to' type='date' />
                    </Menu>
                    : <></>
            }
        </div>
    )
}